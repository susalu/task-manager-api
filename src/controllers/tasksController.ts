import { Request, Response } from 'express';
import { Task } from '../types/task';
import { readTasksFromFile, writeTasksToFile, generateId } from '../utils/fileUtils';
import { filterTasks } from '../functions/taskFilters';
import { paginateTasks } from '../functions/pagination';
import { calculateStatistics } from '../functions/statistics';

export class TasksController {
  
  getAllTasks = (req: Request, res: Response): void => {
    const tasks = readTasksFromFile();
    
    const status = req.query.status as string;
    const category = req.query.category as string;
    const search = req.query.search as string;
    const includeDeleted = req.query.includeDeleted === 'true';
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const filteredTasks = filterTasks(tasks, {
      status,
      category,
      search,
      includeDeleted
    });
    
    const result = paginateTasks(filteredTasks, page, limit);
    
    res.json(result);
  };
  
  getCompletedTasks = (req: Request, res: Response): void => {
    const tasks = readTasksFromFile();
    const completedTasks = tasks.filter(task => 
      task.status === 'completed' && !task.deleted
    );
    res.json(completedTasks);
  };
  
  getTaskById = (req: Request, res: Response): void => {
    const taskId = parseInt(req.params.id);
    const tasks = readTasksFromFile();
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(task);
    }
  };
  
  getStats = (req: Request, res: Response): void => {
    const tasks = readTasksFromFile();
    const stats = calculateStatistics(tasks);
    res.json(stats);
  };
  
  createTask = (req: Request, res: Response): void => {
    const { title, description, status, category } = req.body;
    const tasks = readTasksFromFile();
    
    const newTask: Task = {
      id: generateId(tasks),
      title: title.trim(),
      description: description.trim(),
      status: status || 'pending',
      category: category || 'general',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deleted: false
    };
    
    tasks.push(newTask);
    writeTasksToFile(tasks);
    
    res.status(201).json(newTask);
  };
  
  updateTask = (req: Request, res: Response): void => {
    const taskId = parseInt(req.params.id);
    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      const { title, description, status, category } = req.body;
      const updatedTask = { ...tasks[taskIndex] };
      
      if (title !== undefined) updatedTask.title = title.trim();
      if (description !== undefined) updatedTask.description = description.trim();
      if (status !== undefined) updatedTask.status = status;
      if (category !== undefined) updatedTask.category = category.trim();
      
      updatedTask.updatedAt = new Date().toISOString();
      tasks[taskIndex] = updatedTask;
      writeTasksToFile(tasks);
      
      res.json(updatedTask);
    }
  };
  
  deleteTask = (req: Request, res: Response): void => {
    const taskId = parseInt(req.params.id);
    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      tasks[taskIndex].deleted = true;
      tasks[taskIndex].deletedAt = new Date().toISOString();
      tasks[taskIndex].updatedAt = new Date().toISOString();
      
      writeTasksToFile(tasks);
      res.status(204).send(); 
    }
  };
}