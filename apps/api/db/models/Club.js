import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    logoUrl: { type: String, trim: true },

    sports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sport"
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

const Club = mongoose.model("Club", clubSchema);

export default Club;
