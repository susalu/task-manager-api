import { Task } from '../types/task';

export const filterTasks = (tasks: Task[], filters: {
  status?: string;
  category?: string;
  search?: string;
  includeDeleted?: boolean;
}): Task[] => {
  
  let filteredTasks = [...tasks];
  
  if (!filters.includeDeleted) {
    filteredTasks = filteredTasks.filter(task => !task.deleted);
  }
  
  if (filters.status) {
    filteredTasks = filteredTasks.filter(task => task.status === filters.status);
  }
  
  if (filters.category) {
    filteredTasks = filteredTasks.filter(task => task.category === filters.category);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(searchLower) || 
      task.description.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredTasks;
};