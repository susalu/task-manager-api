import fs from 'fs';
import path from 'path';
import { Task } from '../types/task';

const dataFile = path.join(__dirname, '../data/tasks.json');

// Read tasks from file
export const readTasksFromFile = (): Task[] => {
  if (fs.existsSync(dataFile)) {
    const fileContent = fs.readFileSync(dataFile, 'utf-8');
    if (fileContent.trim() === '') {
      return [];
    } else {
      return JSON.parse(fileContent);
    }
  } else {
    return [];
  }
};

// Save tasks to file
export const writeTasksToFile = (tasks: Task[]): void => {
  const data = JSON.stringify(tasks, null, 2);
  
  // Create data folder if it doesn't exist
  const dataDir = path.dirname(dataFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(dataFile, data, 'utf-8');
};

// Create a new ID for tasks
export const generateId = (tasks: Task[]): number => {
  if (tasks.length === 0) {
    return 1;
  } else {
    const maxId = Math.max(...tasks.map(task => task.id));
    return maxId + 1;
  }
};