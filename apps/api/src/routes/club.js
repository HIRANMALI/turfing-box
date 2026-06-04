import express from "express";
import clubController from "../controllers/clubController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { clubUpload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/", verifyToken, clubUpload.single('logo'), clubController.createClub);

export default router;
