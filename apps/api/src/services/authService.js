import User from "../../db/models/User.js"

import { z } from "zod";
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import redis from "./redisService.js";
import emailService from "./emailService.js";
import crypto from "crypto";

const isProduction = process.env.NODE_ENV === "production";

const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address");

const passwordSchema = z.string().min(8, "Password must be at least 8 characters")

const dobSchema = z
    .string()
    .regex(
        /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
        "Date must be in DD-MM-YYYY format"
    )
    .transform((val) => {
        const [dd, mm, yyyy] = val.split("-");
        return new Date(`${yyyy}-${mm}-${dd}`);
    })
    .nullable()
    .optional();

// Profile Schemas matching User.js structure logically for input
const sportProfileInputSchema = z.object({
    sport: z.string().min(1, "Sport ID is required"),
    skillLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "PRO"]).default("BEGINNER"),
    primaryRole: z.string().trim().optional(),
    secondaryRole: z.string().trim().optional(),
    attributes: z.record(z.string()).optional()
});

const playerProfileInputSchema = z.object({
    joinedClubs: z.array(z.string()).optional(),
    playStyle: z.string().trim().max(500).optional(),
    city: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT-TO-SAY"]).optional(),
    availability: z.array(z.enum(["WEEKDAYS", "WEEKENDS", "MORNINGS", "EVENINGS"])).optional(),
    cardImgUrl: z.string().trim().optional(),
    sportProfiles: z.array(sportProfileInputSchema).optional()
});

const turfOwnerProfileInputSchema = z.object({
    ownerName: z.string().trim().optional(),
    contactPhone: z.string().trim().optional(),
    city: z.string().optional(),
    pfpUrl: z.string().trim().optional(),
    isVerified: z.boolean().optional()
});

const adminProfileInputSchema = z.object({
    roleLevel: z.enum(["SUPER_ADMIN", "SUB_ADMIN", "SUPPORT"]).optional().default("SUPPORT"),
    permissions: z.array(z.string()).optional(),
    assignedCities: z.array(z.string()).optional()
}).optional();

// Base Register Schema
const RegisterObjectSchema = z.object({
    mode: z.literal("register"),
    loginType: z.enum(["N", "G", "M"]).default("N"),

    email: emailSchema,
    password: passwordSchema,

    name: z.string().trim().max(50).optional(),

    role: z.enum([
        "PLAYER",
        "TURF_OWNER",
        "ADMIN",
    ]).default("PLAYER"),

    dob: dobSchema,

    // Nested profile data
    playerProfile: playerProfileInputSchema.optional(),
    turfOwnerProfile: turfOwnerProfileInputSchema.optional(),
    adminProfile: adminProfileInputSchema.optional(),
});

export const AuthSchema = z.discriminatedUnion("mode", [
    // LOGIN
    z.object({
        mode: z.literal("login"),
        email: emailSchema,
        password: passwordSchema,
    }),

    // REGISTER
    RegisterObjectSchema,
]);

// Validation helper for role-specific profile requirements
export function validateRegisterData(data) {
    const errors = [];
    // All profiles are optional during registration
    // Users can complete their profiles later
    return errors;
}

const authService = {
    // Shared Internal Helper for OTP delivery
    async _generateAndSendOTP(email, type) {
        const otp = crypto.randomInt(100000, 999999).toString();

        const isReset = type === "RESET";
        const redisKey = isReset ? `auth:reset_password:${email}` : `auth:verify_email:${email}`;
        const emailType = isReset ? "PASSWORD_RESET" : "EMAIL_VERIFICATION";

        // Store OTP in Redis with 10 minutes expiry
        await redis.set(redisKey, otp, 'EX', 600);

        // Send Email
        await emailService.sendOTP(email, otp, emailType);
        return otp;
    },

    async registerUser(req, res) {
        try {
            const parsed = AuthSchema.safeParse({
                ...req.body,
                mode: "register"
            });

            if (!parsed.success) {
                return res.status(400).json(parsed.error.format());
            }

            const registerData = parsed.data;

            // Additional validation for role-specific profiles
            const profileErrors = validateRegisterData(registerData);
            if (profileErrors.length > 0) {
                return res.status(400).json({
                    code: 400,
                    message: profileErrors[0].message,
                    errors: profileErrors
                });
            }

            const existingUser = await User.findOne({
                email: registerData.email
            });

            if (existingUser) return res.status(409).json({
                code: 409,
                message: "User already exists with this email.",
                data: []
            });

            // Age Verification
            // Assuming string/date conversion handled by Zod or passed as Date
            let dobDate;
            if (registerData.dob) {
                dobDate = new Date(registerData.dob);
                const today = new Date();
                let age = today.getFullYear() - dobDate.getFullYear();
                const m = today.getMonth() - dobDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
                    age--;
                }

                if (registerData.role === 'PLAYER' && age < 13) {
                    return res.status(400).json({
                        code: 400,
                        message: "Players must be at least 13 years old to register.",
                        data: []
                    });
                }
            }


            // Construct User Object
            const userData = {
                loginType: registerData.loginType,
                name: registerData.name,
                email: registerData.email,
                password: registerData.password, // Pre-save hook will hash this
                role: registerData.role,
                dob: dobDate, // Save DOB as Date
                playerProfile: registerData.playerProfile,
                turfOwnerProfile: registerData.turfOwnerProfile,
                adminProfile: registerData.adminProfile,
            };

            const newUser = new User(userData);
            await newUser.save();

            // Automate OTP delivery using shared helper
            await this._generateAndSendOTP(registerData.email, "VERIFICATION");

            const userResponse = newUser.toObject();
            delete userResponse.password;

            return res.status(201).json({
                code: 201,
                message: "User created successfully. A verification OTP has been sent to your email.",
                data: [userResponse]
            });


        } catch (error) {
            console.error("Error in registerUser:", error);
            return res.status(500).json({
                status: 500,
                message: "Error in registerUser"
            });
        }
    },

    async loginUser(req, res) {
        try {
            const parsed = AuthSchema.safeParse({
                mode: "login",
                ...req.body
            })

            if (!parsed.success) return res.status(400).json(parsed.error.format())

            const { email, password } = parsed.data

            const user = await User.findOne({ email, isDeleted: false })

            if (!user) return res.status(404).json({ code: 404, message: "No user found linked to this email", data: [] })

            if (!user.isEmailVerified) return res.status(400).json({ code: 400, message: "Verify E-mail first to login.", data: [] })

            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) return res.status(400).json({ code: 400, message: "Password did not match.", data: [] })

            // Generate Token
            const accessToken = generateAccessToken({
                user_id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                expires_at: new Date(Date.now() + 15 * 60 * 1000)
            })

            const refreshToken = generateRefreshToken({
                user_id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "strict" : "lax",
                path: "/",
            })

            const sessionData = {
                user: user._id.toString(),
                refresh_token: refreshToken,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            }

            // Store in Redis (Fast Access)
            try {
                // MAX 2 SESSIONS ENFORCEMENT
                const activeSessionKey = `user_session:${user._id}`;

                // MIGRATION: Check if key is a legacy String (from old system)
                const keyType = await redis.type(activeSessionKey);
                if (keyType === 'string') {
                    const oldToken = await redis.get(activeSessionKey);
                    await redis.del(activeSessionKey); // Remove string key
                    if (oldToken) {
                        await redis.sadd(activeSessionKey, oldToken); // Create Set with old token
                        console.log(`⚠️ [Redis] Migrated user ${user.email} from String to Set session storage.`);
                    }
                }

                // 1. Fetch all existing session tokens for this user
                // smembers returns an array of strings (tokens)
                let currentSessionTokens = await redis.smembers(activeSessionKey);

                // 2. PRUNE: Remove any tokens that are invalid/expired
                // We check if the actual session data exists for each token
                const validTokens = [];
                for (const token of currentSessionTokens) {
                    const sessionExists = await redis.exists(`session:${token}`);
                    if (sessionExists) {
                        validTokens.push(token);
                    } else {
                        // If session data is gone, remove this stale token from the user's set
                        await redis.srem(activeSessionKey, token);
                    }
                }

                // 3. CHECK LIMIT
                if (validTokens.length >= 2) {
                    return res.status(409).json({
                        code: 409,
                        message: "You have reached the maximum of 2 active sessions. Please logout from another device first.",
                        data: []
                    });
                }

                // 4. ADD NEW SESSION
                // Add the new refresh token to the set
                await redis.sadd(activeSessionKey, refreshToken);
                // Set expiry for the user_session set itself (refresh it) to match max session life (7 days)
                await redis.expire(activeSessionKey, 7 * 24 * 60 * 60);

                // Store actual session data
                await redis.set(`session:${refreshToken}`, JSON.stringify(sessionData), 'EX', 7 * 24 * 60 * 60)
                console.log(`✅ [Redis] New session cached for user ${user.email}. Total active: ${validTokens.length + 1}`);
            } catch (redisError) {
                console.error("Redis set error (Non-fatal):", redisError.message)
            }

            res.status(200).json({ code: 200, message: "User logged-In successfully.", data: { user, accessToken, session: sessionData } })

        } catch (error) {
            console.error("Error in loginUser:", error)
            res.status(500).json({ code: 500, message: "Error in loginUser", error })
        }
    },

    async logoutUser(req, res) {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ code: 401, message: "No authorization header found" })

            const refresh_token = authHeader.split(" ")[1]

            res.clearCookie("refresh_token", {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "strict" : "lax",
                path: "/"
            })

            // Delete from Redis
            try {
                // Fetch session data to get user ID
                const sessionDataStr = await redis.get(`session:${refresh_token}`);

                // If session doesn't exist, they are already logged out
                if (!sessionDataStr) {
                    return res.status(404).json({ code: 404, message: "User already logged out or token expired.", data: [] });
                }

                if (sessionDataStr) {
                    const sessionData = JSON.parse(sessionDataStr);
                    const userId = sessionData.user;

                    // Remove this specific token from the user's list of active sessions
                    // We use SREM (Set Remove) instead of DEL
                    await redis.srem(`user_session:${userId}`, refresh_token);
                }

                await redis.del(`session:${refresh_token}`)
                console.log(`✅ [Redis] Session removed for token ending in ...${refresh_token ? refresh_token.slice(-6) : ''}`);
            } catch (redisError) {
                console.error("Redis del error (Non-fatal):", redisError.message)
            }

            res.status(200).json({ code: 200, message: "User logged-out successfully.", data: [] })

        } catch (error) {
            console.error("Error in logoutUser:", error)
            res.status(500).json({ code: 500, message: "Error in logoutUser", error })
        }
    },

    async refreshUser(req, res) {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ code: 401, message: "No authorization header found" })

            const refresh_token = authHeader.split(" ")[1]

            if (!refresh_token) return res.status(401).json({ code: 401, message: "No refresh token found.", data: [] })

            let sessionRaw
            try {
                sessionRaw = await redis.get(`session:${refresh_token}`)
            } catch (redisError) {
                console.error("Redis get error:", redisError.message)
            }
            let session

            if (sessionRaw) {
                // CACHE HIT
                console.log(`⚡ [Redis] Cache HIT for refresh token`);
                session = JSON.parse(sessionRaw)
            } else {
                // CACHE MISS - Without DB fallback, we assume invalid.
                return res.status(401).json({ code: 401, message: "Invalid or expired refresh token.", data: [] })
            }

            const user = await User.findById(session.user)

            if (!user || user.isDeleted) return res.status(401).json({ code: 401, message: "User not found.", data: [] })

            const accessToken = generateAccessToken({
                user_id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                expires_at: new Date(Date.now() + 15 * 60 * 1000)
            })

            res.status(200).json({ code: 200, message: "User logged-in successfully.", data: { user, accessToken, session } })

        } catch (error) {
            console.error("Error in refreshUser:", error)
            res.status(500).json({ code: 500, message: "Error in refreshUser", error })
        }
    },

    async forgotPassword(req, res) {
        try {
            let { email } = req.body;

            if (email && typeof email === 'string') {
                email = email.trim().toLowerCase();
            }

            const parsedEmail = emailSchema.safeParse(email);

            if (!parsedEmail.success) {
                return res.status(400).json({ code: 400, message: "Invalid email address." });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(200).json({ code: 200, message: "If an account with that email exists, we sent a password reset OTP.", data: [] });
            }

            // Send OTP using shared helper
            await this._generateAndSendOTP(email, "RESET");

            return res.status(200).json({ code: 200, message: "Password reset OTP sent to your email.", data: [] });

        } catch (error) {
            console.error("Error in forgotPassword:", error);
            return res.status(500).json({ code: 500, message: "Error processing forgot password request.", data: [] });
        }
    },

    async resetPassword(req, res) {
        try {
            const { email, otp, newPassword } = req.body;

            if (!email || !otp || !newPassword) {
                return res.status(400).json({ code: 400, message: "Email, OTP, and new password are required." });
            }

            const redisKey = `auth:reset_password:${email}`;
            const storedOtp = await redis.get(redisKey);

            if (!storedOtp || storedOtp !== otp) {
                return res.status(400).json({ code: 400, message: "Invalid or expired OTP.", data: [] });
            }

            try {
                passwordSchema.parse(newPassword);
            } catch (err) {
                return res.status(400).json({ code: 400, message: err.errors[0].message });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);

            const user = await User.findOne({ email });
            if (!user || user.isDeleted) {
                return res.status(400).json({ code: 400, message: "User not found.", data: [] });
            }

            await User.findOneAndUpdate({ email }, { password: hashedPassword });

            await redis.del(redisKey);

            return res.status(200).json({ code: 200, message: "Password reset successfully. You can now login." });

        } catch (error) {
            console.error("Error in resetPassword:", error);
            return res.status(500).json({ code: 500, message: "Error resetting password." });
        }
    },

    async sendVerificationEmail(req, res) {
        try {
            const email = req.body.email;

            if (!email) {
                return res.status(400).json({ code: 400, message: "Email is required." });
            }

            const userRecord = await User.findOne({ email });
            if (!userRecord) {
                return res.status(404).json({ code: 404, message: "User not found." });
            }

            // Correct field: isEmailVerified
            if (userRecord.isEmailVerified) {
                return res.status(400).json({ code: 400, message: "Email is already verified." });
            }

            await this._generateAndSendOTP(email, "VERIFICATION");

            return res.status(200).json({ code: 200, message: "Verification OTP sent to your email." });

        } catch (error) {
            console.error("Error in sendVerificationEmail:", error);
            return res.status(500).json({ code: 500, message: "Error sending verification email." });
        }
    },

    async verifyEmail(req, res) {
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(400).json({ code: 400, message: "Email and OTP are required." });
            }

            const redisKey = `auth:verify_email:${email}`;
            const storedOtp = await redis.get(redisKey);

            if (!storedOtp || storedOtp !== otp) {
                return res.status(400).json({ code: 400, message: "Invalid or expired OTP." });
            }

            const user = await User.findOne({ email });
            if (!user || user.isDeleted) {
                return res.status(400).json({ code: 400, message: "User not found.", data: [] });
            }

            // Correct field: isEmailVerified
            await User.findOneAndUpdate({ email }, { isEmailVerified: true });

            await redis.del(redisKey);

            return res.status(200).json({ code: 200, message: "Email verified successfully." });

        } catch (error) {
            console.error("Error in verifyEmail:", error);
            return res.status(500).json({ code: 500, message: "Error verifying email." });
        }
    }
}

export default authService