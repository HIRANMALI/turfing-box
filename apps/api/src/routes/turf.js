import express from "express";
import turfController from "../controllers/turfController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { turfUpload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/", verifyToken, turfUpload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'documents', maxCount: 5 },
    { name: 'court_0_images', maxCount: 5 },
    { name: 'court_1_images', maxCount: 5 },
    { name: 'court_2_images', maxCount: 5 },
    { name: 'court_3_images', maxCount: 5 },
    { name: 'court_4_images', maxCount: 5 }
]), turfController.createTurf)


router.get("/owner", verifyToken, turfController.findTurfByOwner)
router.get("/:turfId", verifyToken, turfController.findTurfById)
router.put("/:turfId", verifyToken, turfUpload.array('images', 10), turfController.updateTurf)
router.delete("/:turfId", verifyToken, turfController.deleteTurf)


export default router