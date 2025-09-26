import { Router } from 'express';
import { TasksController } from '../controllers/tasksController';
import { validateCreateTask } from '../middleware/validation';

const router = Router();
const tasksController = new TasksController();

router.post('/tasks', validateCreateTask, tasksController.createTask);

export const postRoutes = router;