import Club from "../../db/models/Club.js";

const clubService = {
    async createClub(clubData) {
        return await Club.create(clubData);
    },

    async findClubsByOwner(ownerId) {
        return await Club.find({ owner: ownerId });
    },

    async updateClub(clubId, clubData) {
        return await Club.findByIdAndUpdate(clubId, clubData, { new: true });
    }
};

export default clubService;
