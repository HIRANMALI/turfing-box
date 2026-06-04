import nodemailer from 'nodemailer';

const isProduction = process.env.NODE_ENV === 'production';

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', // Default to Gmail if not specified
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = async (to, subject, html) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("⚠️ SMTP credentials not found. Email sending skipped.");
        console.log(`[Mock Email] To: ${to}, Subject: ${subject}`);
        console.log(`[Mock Email Body]: ${html}`);
        return;
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Turfing Box" <no-reply@turfingbox.com>',
            to,
            subject,
            html,
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email.");
    }
};

const emailService = {
    async sendOTP(email, otp, type) {
        let subject = "";
        let html = "";

        if (type === "PASSWORD_RESET") {
            subject = "Password Reset Request";
            html = `
                <h1>Password Reset Request</h1>
                <p>You requested a password reset. Please use the following OTP to reset your password:</p>
                <h2>${otp}</h2>
                <p>This OTP is valid for 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
            `;
        } else if (type === "EMAIL_VERIFICATION") {
            subject = "Verify Your Email";
            html = `
                <h1>Email Verification</h1>
                <p>Please use the following OTP to verify your email address:</p>
                <h2>${otp}</h2>
                <p>This OTP is valid for 10 minutes.</p>
            `;
        } else {
            throw new Error("Invalid email type");
        }

        return sendEmail(email, subject, html);
    }
};

export default emailService;
