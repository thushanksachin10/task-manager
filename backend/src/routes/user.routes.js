import express from 'express';
import userController from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validation.middleware.js';
import { updateProfileSchema, changePasswordSchema } from '../validators/user.validator.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/profile', userController.getProfile);
router.put('/profile', validate(updateProfileSchema), userController.updateProfile);
router.put('/change-password', validate(changePasswordSchema), userController.changePassword);
router.delete('/account', userController.deleteAccount);

export default router;