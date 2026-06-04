import clubService from "../services/clubService.js";

const clubController = {
    async createClub(req, res) {
        try {
            const { name, description, sports } = req.body;
            const { userId } = req.user;
            const logoUrl = req.file ? req.file.path : null;

            if (!name) {
                return res.status(400).json({
                    code: 400,
                    message: "Club name is required",
                    data: []
                });
            }

            const club = await clubService.createClub({
                name,
                description,
                sports: sports ? JSON.parse(sports) : [],
                owner: userId,
                logoUrl
            });

            return res.status(201).json({
                code: 201,
                message: "Club created successfully",
                data: club
            });
        } catch (error) {
            console.error("Error in createClub:", error);
            return res.status(500).json({
                code: 500,
                message: "Internal Server Error during club creation",
                data: []
            });
        }
    }
};

export default clubController;
