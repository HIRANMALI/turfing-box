import mongoose from "mongoose"
import bcrypt from "bcrypt"

const sportProfileSchema = new mongoose.Schema({
    sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true },
    skillLevel: {
        type: String,
        enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "PRO"],
        default: "BEGINNER"
    },
    primaryRole: { type: String, trim: true }, // e.g. "Batsman", "Goalkeeper"
    secondaryRole: { type: String, trim: true }, // e.g. "Wicketkeeper", "Winger"
    // Flexible attributes for specific sports (e.g. { battingStyle: "RIGHT" })
    attributes: {
        type: Map,
        of: String
    }
});

const playerProfileSchema = new mongoose.Schema({
    joinedClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],

    // Global Profile Fields
    playStyle: { type: String, trim: true, maxlength: 500 }, // this is bio
    city: { type: String, trim: true },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER", "PREFER_NOT-TO-SAY"]
    },
    availability: [{
        type: String,
        enum: ["WEEKDAYS", "WEEKENDS", "MORNINGS", "EVENINGS"]
    }],
    cardImgUrl: { type: String, trim: true },

    sportProfiles: [sportProfileSchema]
});

const turfOwnerProfileSchema = new mongoose.Schema({
    turfs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turf' }],
    ownerName: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
    isVerified: { type: Boolean, default: false },
    pfpUrl: { type: String, trim: true },
    city: { type: String, trim: true },
});

const adminProfileSchema = new mongoose.Schema({
    roleLevel: {
        type: String,
        enum: ["SUPER_ADMIN", "SUB_ADMIN", "SUPPORT"],
        default: "SUPPORT"
    },
    permissions: [{ type: String }], // e.g., ["MANAGE_USERS", "APPROVE_TURFS"]
    assignedCities: [{ type: String }]
});


const userSchema = new mongoose.Schema({
    loginType: { type: String, enum: ["N", "G", "M"], default: "N" },
    name: String,
    email: { type: String, lowercase: true, unique: true, trim: true },
    password: String,
    dob: Date,
    pfpUrl: { type: String, trim: true },

    role: {
        type: String,
        enum: ["PLAYER", "TURF_OWNER", "ADMIN"],
        default: "PLAYER",
    },

    isEmailVerified: {
        type: Boolean,
        default: false,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

    playerProfile: playerProfileSchema,
    turfOwnerProfile: turfOwnerProfileSchema,
    adminProfile: adminProfileSchema,

    oauth: {
        provider: {
            type: String,
            enum: ["GOOGLE", "FACEBOOK"],
        },
        providerId: String,
    }

}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    if (this.loginType !== "N") return;

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model("User", userSchema)

export default User