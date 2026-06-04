import Sport from "../../db/models/Sport.js";

const sportService = {
    async getAllSports() {
        try {
            const response = await Sport.find({});
            return { code: 200, message: 'Sport data fetched successfully', data: response };
        } catch (error) {
            console.error('Error fetching sports at getAllSports:', error);
            return { code: 500, message: 'Internal Server Error at getAllSports', data: [] };
        }
    },

    async createSport(data) {
        try {
            const newSport = new Sport(data);
            await newSport.save();
            return { code: 201, message: 'Sport created successfully', data: newSport };
        } catch (error) {
            console.error('Error creating sport:', error);
            return { code: 500, message: 'Internal Server Error at createSport', data: [] };
        }
    },

    async getSingleSport(id) {
        try {
            const sport = await Sport.findById(id);
            if (!sport) return { code: 404, message: 'Sport not found', data: [] };
            return { code: 200, message: 'Sport fetched successfully', data: sport };
        } catch (error) {
            console.error('Error fetching sport:', error);
            return { code: 500, message: 'Internal Server Error at getSingleSport', data: [] };
        }
    },

    async updateSport(id, data) {
        try {
            const updatedSport = await Sport.findByIdAndUpdate(id, data, { new: true });
            if (!updatedSport) return { code: 404, message: 'Sport not found', data: [] };
            return { code: 200, message: 'Sport updated successfully', data: updatedSport };
        } catch (error) {
            console.error('Error updating sport:', error);
            return { code: 500, message: 'Internal Server Error at updateSport', data: [] };
        }
    },

    async deleteSport(id) {
        try {
            const deletedSport = await Sport.findByIdAndDelete(id);
            if (!deletedSport) return { code: 404, message: 'Sport not found', data: [] };
            return { code: 200, message: 'Sport deleted successfully', data: [] };
        } catch (error) {
            console.error('Error deleting sport:', error);
            return { code: 500, message: 'Internal Server Error at deleteSport', data: [] };
        }
    }
}

export default sportService;
