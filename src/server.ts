import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log('✨ Task Manager API Started Successfully!');
  console.log('📍 Server running at: http://localhost:' + PORT);
  console.log('');
  console.log('📋 Available Features:');
  console.log('   • Task CRUD operations');
  console.log('   • Category organization');
  console.log('   • Search functionality');
  console.log('   • Pagination');
  console.log('   • Statistics dashboard');
  console.log('   • Soft delete system');
  console.log('');
  console.log('🚀 Try these endpoints:');
  console.log('   GET  /tasks           - Get all tasks');
  console.log('   POST /tasks           - Create a task');
  console.log('   GET  /tasks/stats     - View statistics');
  console.log('');
  console.log('💡 Visit http://localhost:3000 for full documentation');
});