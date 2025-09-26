export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in progress' | 'completed';
  category: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt?: string;
}

export interface TaskStats {
  totalTasks: number;
  pending: number;
  inProgress: number;
  completed: number;
  byCategory: { [key: string]: number };
}

export interface PaginationResult {
  tasks: Task[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalTasks: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}