import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, // e.g., "Main Pitch", "Net 1"

    turf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turf',
        required: true
    },

    sport: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',
        required: true
    }],

    surfaceType: {
        type: String,
        trim: true
    }, // e.g., "Artificial Grass", "Clay", "Mat"

    // Pricing & Dimensions
    pricePerHour: {
        type: Number,
        required: true,
        min: 0
    },

    dimensions: {
        type: String,
        trim: true
    }, // e.g., "50x30m"

    isActive: {
        type: Boolean,
        default: true
    },

    images: [{ type: String }]

}, { timestamps: true });


const Court = mongoose.model("Court", courtSchema);

export default Court;
