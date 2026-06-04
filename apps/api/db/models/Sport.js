import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["TEAM", "INDIVIDUAL"],
        required: true
    },

    iconUrl: String,
    imageUrl: String,

}, { timestamps: true });

const Sport = mongoose.model("Sport", sportSchema);

export default Sport;
