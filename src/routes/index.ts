import { Router } from 'express';
import { getRoutes } from './get.routes';
import { postRoutes } from './post.routes';
import { putRoutes } from './put.routes';
import { TasksController } from '../controllers/tasksController';
import { validateTaskId } from '../middleware/validation';

const router = Router();
const tasksController = new TasksController();

router.use(getRoutes);
router.use(postRoutes);
router.use(putRoutes);

router.delete('/tasks/:id', validateTaskId, tasksController.deleteTask);

export default router;