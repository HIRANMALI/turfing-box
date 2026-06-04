import express from "express";
import adminController from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

// All admin routes require token verification AND admin role verification
router.use(verifyToken, verifyAdmin);

// Get list of all turfs awaiting verification
router.get("/turfs/pending", adminController.getPendingTurfs);

// Get full details (including PII) of a specific turf
router.get("/turfs/:turfId/details", adminController.getTurfFullDetails);

// Approve or reject a turf registration
router.patch("/turfs/:turfId/verify", adminController.verifyTurf);

export default router;
