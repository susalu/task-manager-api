import { Task, PaginationResult } from '../types/task';

export const paginateTasks = (tasks: Task[], page: number, limit: number): PaginationResult => {
  const totalTasks = tasks.length;
  const totalPages = Math.ceil(totalTasks / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalTasks);
  
  const paginatedTasks = tasks.slice(startIndex, endIndex);
  
  return {
    tasks: paginatedTasks,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalTasks: totalTasks,
      hasNext: endIndex < totalTasks,
      hasPrev: startIndex > 0
    }
  };
};