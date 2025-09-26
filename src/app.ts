import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Task Manager API! 🎉',
    description: 'A simple API to manage your tasks with all features',
    features: [
      '✅ Create, read, update, and delete tasks',
      '✅ Organize tasks by categories',
      '✅ Search through tasks',
      '✅ Pagination for large lists',
      '✅ View task statistics',
      '✅ Soft delete (tasks can be recovered)'
    ],
    endpoints: {
      'GET /tasks': 'Get all tasks (supports filtering, search, pagination)',
      'GET /tasks/completed': 'Get only completed tasks',
      'GET /tasks/stats': 'Get task statistics',
      'GET /tasks/:id': 'Get a specific task by ID',
      'POST /tasks': 'Create a new task',
      'PUT /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task (soft delete)'
    },
    examples: {
      createTask: {
        method: 'POST',
        url: '/tasks',
        body: {
          "title": "Learn TypeScript",
          "description": "Study basic TypeScript concepts",
          "category": "learning",
          "status": "in progress"
        }
      },
      searchTasks: {
        method: 'GET',
        url: '/tasks?search=typescript&category=learning&page=1&limit=5'
      },
      getStats: {
        method: 'GET',
        url: '/tasks/stats'
      }
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found!',
    suggestion: 'Visit http://localhost:3000 for available endpoints' 
  });
});

export default app;