import Turf from "../../db/models/Turf.js"
import Court from "../../db/models/Court.js"

const turfService = {
    async createTurf(turfData, session = null) {
        const options = session ? { session } : {};
        const [turf] = await Turf.create([turfData], options);
        return turf;
    },

    async findTurfByOwner(ownerId) {
        return await Turf.find({ owner: ownerId })
    },

    async findTurfByNameAndCity(name, city) {
        return await Turf.findOne({ name, 'address.city': city });
    },

    async findPendingTurfs() {
        return await Turf.find({ verificationStatus: 'pending' }).sort({ createdAt: -1 });
    },

    async updateVerificationStatus(turfId, status, isActive) {
        const turf = await Turf.findByIdAndUpdate(
            turfId,
            { verificationStatus: status, isActive },
            { new: true }
        ).select("+gstin +panOwner"); // Return with PII for confirmation

        if (!turf) {
            throw new Error("Turf not found")
        }

        return turf
    },

    async findTurfById(turfId) {
        const turf = await Turf.findById(turfId)
        if (!turf) {
            throw new Error("Turf not found")
        }
        return turf
    },

    async updateTurf(turfId, turfData) {
        const turf = await Turf.findByIdAndUpdate(turfId, turfData, { new: true })
        if (!turf) {
            throw new Error("Turf not found")
        }
        return turf
    },

    async deleteTurf(turfId, session = null) {
        const options = session ? { session } : {};
        const turf = await Turf.findByIdAndDelete(turfId, options);
        if (!turf) {
            throw new Error("Turf not found")
        }
        return turf
    }
}

export default turfService
