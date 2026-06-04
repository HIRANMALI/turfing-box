import Court from "../../db/models/Court.js";

const courtService = {
    async createCourt(courtData, session = null) {
        const options = session ? { session } : {};
        const [court] = await Court.create([courtData], options);
        return court;
    },

    async createManyCourts(courtsData, session = null) {
        const options = session ? { session } : {};
        const courts = await Court.insertMany(courtsData, options);
        return courts;
    },


    async findCourtsByTurf(turfId) {
        return await Court.find({ turf: turfId });
    },

    async findCourtById(courtId) {
        return await Court.findById(courtId);
    },

    async updateCourt(courtId, courtData) {
        return await Court.findByIdAndUpdate(courtId, courtData, { new: true });
    },

    async deleteCourt(courtId) {
        return await Court.findByIdAndDelete(courtId);
    },

    async deleteCourtsByTurf(turfId) {
        return await Court.deleteMany({ turf: turfId });
    }
};

export default courtService;
