import userService from "../services/userService.js";

const userController = {
    async uploadProfilePicture(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    code: 400,
                    message: "No file uploaded",
                    data: []
                });
            }

            const { userId } = req.user;
            const pfpUrl = req.file.path; // Cloudinary URL

            const updatedUser = await userService.updateProfilePicture(userId, pfpUrl);

            return res.status(200).json({
                code: 200,
                message: "Profile picture updated successfully",
                data: updatedUser
            });
        } catch (error) {
            console.error("Error in uploadProfilePicture:", error);
            return res.status(500).json({
                code: 500,
                message: "Internal Server Error during profile picture upload",
                data: []
            });
        }
    }
};

export default userController;
