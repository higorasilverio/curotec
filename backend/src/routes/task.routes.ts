import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// @ts-ignore
router.use(authenticateToken);

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
