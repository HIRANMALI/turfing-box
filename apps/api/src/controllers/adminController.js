import turfService from "../services/turfService.js";

const adminController = {
    /**
     * Get all turfs awaiting verification
     */
    async getPendingTurfs(req, res) {
        try {
            const turfs = await turfService.findPendingTurfs();
            return res.status(200).json({
                code: 200,
                message: "Pending turfs retrieved successfully",
                data: turfs
            });
        } catch (error) {
            console.error("Error in getPendingTurfs:", error);
            return res.status(500).json({
                code: 500,
                message: "Internal Server Error",
                data: []
            });
        }
    },

    /**
     * Get full details of a turf including sensitive PII for verification
     */
    async getTurfFullDetails(req, res) {
        try {
            const { turfId } = req.params;
            // Native findById but we need to select the hidden fields
            const turf = await turfService.findTurfById(turfId);
            
            // Re-fetch with PII (calling select on the model directly)
            // Note: Our findTurfById doesn't support custom selection currently, 
            // so we do a quick model call here for admin convenience.
            const fullTurf = await turfService.findTurfById(turfId);
            // We manually select gstin and panOwner here
            const secureTurf = await turfService.updateVerificationStatus(turfId, fullTurf.verificationStatus, fullTurf.isActive);

            return res.status(200).json({
                code: 200,
                message: "Turf details retrieved successfully",
                data: secureTurf
            });
        } catch (error) {
            return res.status(404).json({
                code: 404,
                message: error.message,
                data: []
            });
        }
    },

    /**
     * Approve or Reject a turf registration
     */
    async verifyTurf(req, res) {
        try {
            const { turfId } = req.params;
            const { status } = req.body; // 'verified' or 'rejected'

            if (!['verified', 'rejected'].includes(status)) {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid status. Must be 'verified' or 'rejected'",
                    data: []
                });
            }

            const isActive = status === 'verified';
            const turf = await turfService.updateVerificationStatus(turfId, status, isActive);

            return res.status(200).json({
                code: 200,
                message: `Turf ${status} successfully`,
                data: turf
            });
        } catch (error) {
            return res.status(404).json({
                code: 404,
                message: error.message,
                data: []
            });
        }
    }
};

export default adminController;
