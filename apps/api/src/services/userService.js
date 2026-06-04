import User from "../../db/models/User.js";

const userService = {
    async updateProfilePicture(userId, pfpUrl) {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        user.pfpUrl = pfpUrl;

        // Also update role-specific profile if it exists
        if (user.role === 'TURF_OWNER' && user.turfOwnerProfile) {
            user.turfOwnerProfile.pfpUrl = pfpUrl;
        }

        await user.save();
        return user;
    }
};

export default userService;
