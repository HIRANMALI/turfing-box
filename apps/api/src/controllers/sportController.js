import sportService from '../services/sportService.js';

const sportController = {
    async getAllSports(req, res) {
        const result = await sportService.getAllSports();
        return res.status(result.code).json(result);
    },

    async createSport(req, res) {
        const result = await sportService.createSport(req.body);
        return res.status(result.code).json(result);
    },

    async getSingleSport(req, res) {
        const result = await sportService.getSingleSport(req.params.id);
        return res.status(result.code).json(result);
    },

    async updateSport(req, res) {
        const result = await sportService.updateSport(req.params.id, req.body);
        return res.status(result.code).json(result);
    },

    async deleteSport(req, res) {
        const result = await sportService.deleteSport(req.params.id);
        return res.status(result.code).json(result);
    }
}

export default sportController;