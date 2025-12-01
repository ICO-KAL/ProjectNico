import request from 'supertest';
import app from '../src/server.js';

describe('Tasks API', () => {
  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const res = await request(app).get('/api/tasks');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('tasks');
      expect(res.body).toHaveProperty('total');
      expect(Array.isArray(res.body.tasks)).toBe(true);
    });
    
    it('should filter tasks by status', async () => {
      const res = await request(app).get('/api/tasks?status=todo');
      
      expect(res.status).toBe(200);
      res.body.tasks.forEach(task => {
        expect(task.status).toBe('todo');
      });
    });
    
    it('should filter tasks by priority', async () => {
      const res = await request(app).get('/api/tasks?priority=high');
      
      expect(res.status).toBe(200);
      res.body.tasks.forEach(task => {
        expect(task.priority).toBe('high');
      });
    });
  });
  
  describe('GET /api/tasks/:id', () => {
    it('should return a task by ID', async () => {
      const res = await request(app).get('/api/tasks/task-1');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 'task-1');
      expect(res.body).toHaveProperty('title');
    });
    
    it('should return 404 for non-existent task', async () => {
      const res = await request(app).get('/api/tasks/non-existent');
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
  
  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        priority: 'medium',
        estimatedHours: 5
      };
      
      const res = await request(app)
        .post('/api/tasks')
        .send(newTask);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(newTask.title);
      expect(res.body).toHaveProperty('createdAt');
    });
    
    it('should return 400 for invalid task data', async () => {
      const invalidTask = {
        description: 'Missing title',
        status: 'invalid-status'
      };
      
      const res = await request(app)
        .post('/api/tasks')
        .send(invalidTask);
      
      expect(res.status).toBe(400);
    });
  });
  
  describe('GET /api/tasks/stats/overview', () => {
    it('should return task statistics', async () => {
      const res = await request(app).get('/api/tasks/stats/overview');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('byStatus');
      expect(res.body).toHaveProperty('byPriority');
      expect(res.body.byStatus).toHaveProperty('todo');
      expect(res.body.byStatus).toHaveProperty('in-progress');
      expect(res.body.byStatus).toHaveProperty('completed');
    });
  });
});
