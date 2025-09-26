import { Router } from 'express';
import { TasksController } from '../controllers/tasksController';
import { validateTaskId, validateUpdateTask } from '../middleware/validation';

const router = Router();
const tasksController = new TasksController();

router.put('/tasks/:id', validateTaskId, validateUpdateTask, tasksController.updateTask);

export const putRoutes = router;