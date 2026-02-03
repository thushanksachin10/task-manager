import express from 'express';
import taskController from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validation.middleware.js';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/stats', taskController.getTaskStats);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validate(createTaskSchema), taskController.createTask);
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;