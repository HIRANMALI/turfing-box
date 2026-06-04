import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { profileUpload } from '../config/cloudinary.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/me', verifyToken, (req, res) => {
    res.json({ message: "User profile" })
})

router.post('/upload-profile-picture', verifyToken, profileUpload.single('profilePicture'), userController.uploadProfilePicture)

export default router