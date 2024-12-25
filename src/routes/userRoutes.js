import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import cache from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/profile', cache(3600), userController.getProfile);
router.put('/profile', userController.updateProfile);

export default router; 