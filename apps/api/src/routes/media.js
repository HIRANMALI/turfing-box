import express from "express";
import mediaController from "../controllers/mediaController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route to get a secure signature for direct frontend-to-cloudinary uploads
router.get("/sign-upload", verifyToken, mediaController.getUploadSignature);

export default router;
