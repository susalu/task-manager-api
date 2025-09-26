import { Request, Response, NextFunction } from 'express';

export const validateCreateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description } = req.body;
  
  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  
  if (title.trim() === '') {
    res.status(400).json({ error: 'Title cannot be empty' });
    return;
  }
  
  if (!description) {
    res.status(400).json({ error: 'Description is required' });
    return;
  }
  
  if (description.trim() === '') {
    res.status(400).json({ error: 'Description cannot be empty' });
    return;
  }
  
  if (req.body.status && !['pending', 'in progress', 'completed'].includes(req.body.status)) {
    res.status(400).json({ error: 'Status must be: pending, in progress, or completed' });
    return;
  }
  
  if (req.body.category && req.body.category.trim() === '') {
    res.status(400).json({ error: 'Category cannot be empty' });
    return;
  }
  
  next();
};

export const validateUpdateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, status, category } = req.body;
  
  if (title !== undefined && title.trim() === '') {
    res.status(400).json({ error: 'Title cannot be empty' });
    return;
  }
  
  if (description !== undefined && description.trim() === '') {
    res.status(400).json({ error: 'Description cannot be empty' });
    return;
  }
  
  if (status !== undefined && !['pending', 'in progress', 'completed'].includes(status)) {
    res.status(400).json({ error: 'Status must be: pending, in progress, or completed' });
    return;
  }
  
  if (category !== undefined && category.trim() === '') {
    res.status(400).json({ error: 'Category cannot be empty' });
    return;
  }
  
  next();
};

export const validateTaskId = (req: Request, res: Response, next: NextFunction): void => {
  const taskId = parseInt(req.params.id);
  
  if (isNaN(taskId)) {
    res.status(400).json({ error: 'Invalid task ID' });
    return;
  }
  
  if (taskId <= 0) {
    res.status(400).json({ error: 'Task ID must be positive' });
    return;
  }
  
  next();
};