import express from 'express';
import sportController from '../controllers/sportController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, sportController.getAllSports);
router.post('/', verifyToken, verifyAdmin, sportController.createSport);
router.put('/:id', verifyToken, verifyAdmin, sportController.updateSport);
router.delete('/:id', verifyToken, verifyAdmin, sportController.deleteSport);
router.get('/:id', verifyToken, verifyAdmin, sportController.getSingleSport);

export default router;
