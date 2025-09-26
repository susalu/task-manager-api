import { Task, TaskStats } from '../types/task';

export const calculateStatistics = (tasks: Task[]): TaskStats => {
  const activeTasks = tasks.filter(task => !task.deleted);
  
  const stats: TaskStats = {
    totalTasks: activeTasks.length,
    pending: activeTasks.filter(task => task.status === 'pending').length,
    inProgress: activeTasks.filter(task => task.status === 'in progress').length,
    completed: activeTasks.filter(task => task.status === 'completed').length,
    byCategory: {}
  };
  
  activeTasks.forEach(task => {
    if (task.category) {
      if (stats.byCategory[task.category]) {
        stats.byCategory[task.category] += 1;
      } else {
        stats.byCategory[task.category] = 1;
      }
    }
  });
  
  return stats;
};