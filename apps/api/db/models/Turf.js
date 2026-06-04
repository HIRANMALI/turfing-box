import mongoose from "mongoose";
import { encrypt, decrypt } from "../src/utils/security.js";

const turfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    logoUrl: { type: String, trim: true },

    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },

    address: {
        line1: { type: String, trim: true },
        line2: { type: String, trim: true },
        city: { type: String, trim: true, required: true },
        state: { type: String, trim: true },
        pincode: { type: String, trim: true },
        mapLink: { type: String, trim: true }
    },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    sports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sport' }],

    gstin: { type: String, trim: true, select: false },
    panOwner: { type: String, trim: true, required: true, select: false },

    verificationStatus: { 
        type: String, 
        enum: ['pending', 'verified', 'rejected'], 
        default: 'pending' 
    },

    images: [{ type: String }],
    documents: [{ type: String }], // Cloudinary URLs for registration docs

    description: { type: String, trim: true },

    amenities: [{ type: String }], // e.g., ["Parking", "Water", "Changing Room"]

    courts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Court' }],

    isActive: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false },

}, { timestamps: true });

// Compound Index for unique name per city
turfSchema.index({ name: 1, 'address.city': 1 }, { unique: true });

// Index for "Find near me"
turfSchema.index({ location: '2dsphere' });

// Encryption Middleware
turfSchema.pre('save', function(next) {
    if (this.isModified('gstin') && this.gstin) {
        this.gstin = encrypt(this.gstin);
    }
    if (this.isModified('panOwner') && this.panOwner) {
        this.panOwner = encrypt(this.panOwner);
    }
    next();
});

// Decryption Middleware
turfSchema.post('init', function(doc) {
    if (doc.gstin) {
        doc.gstin = decrypt(doc.gstin);
    }
    if (doc.panOwner) {
        doc.panOwner = decrypt(doc.panOwner);
    }
});

const Turf = mongoose.model("Turf", turfSchema, "turfs");

export default Turf;
