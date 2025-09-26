import { Router } from 'express';
import { TasksController } from '../controllers/tasksController';
import { validateTaskId } from '../middleware/validation';

const router = Router();
const tasksController = new TasksController();

router.get('/tasks', tasksController.getAllTasks);

router.get('/tasks/completed', tasksController.getCompletedTasks);

router.get('/tasks/stats', tasksController.getStats);

router.get('/tasks/:id', validateTaskId, tasksController.getTaskById);

export const getRoutes = router;