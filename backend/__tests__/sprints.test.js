import request from 'supertest';
import app from '../src/server.js';

describe('Sprints API', () => {
  describe('GET /api/sprints', () => {
    it('should return all sprints', async () => {
      const res = await request(app).get('/api/sprints');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('sprints');
      expect(res.body).toHaveProperty('total');
      expect(Array.isArray(res.body.sprints)).toBe(true);
    });
    
    it('should filter sprints by status', async () => {
      const res = await request(app).get('/api/sprints?status=active');
      
      expect(res.status).toBe(200);
      res.body.sprints.forEach(sprint => {
        expect(sprint.status).toBe('active');
      });
    });
  });
  
  describe('GET /api/sprints/:id', () => {
    it('should return a sprint by ID', async () => {
      const res = await request(app).get('/api/sprints/sprint-1');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 'sprint-1');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('status');
    });
    
    it('should return 404 for non-existent sprint', async () => {
      const res = await request(app).get('/api/sprints/non-existent');
      
      expect(res.status).toBe(404);
    });
  });
  
  describe('GET /api/sprints/:id/tasks', () => {
    it('should return tasks for a sprint with statistics', async () => {
      const res = await request(app).get('/api/sprints/sprint-1/tasks');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('sprint');
      expect(res.body).toHaveProperty('tasks');
      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('completed');
      expect(res.body).toHaveProperty('inProgress');
      expect(res.body).toHaveProperty('todo');
      expect(Array.isArray(res.body.tasks)).toBe(true);
    });
  });
  
  describe('POST /api/sprints', () => {
    it('should create a new sprint', async () => {
      const newSprint = {
        name: 'Sprint Test',
        description: 'Test sprint',
        startDate: '2025-12-01T00:00:00Z',
        endDate: '2025-12-14T23:59:59Z',
        goal: 'Complete testing features'
      };
      
      const res = await request(app)
        .post('/api/sprints')
        .send(newSprint);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(newSprint.name);
      expect(res.body.status).toBe('planned');
    });
    
    it('should return 400 for invalid sprint data', async () => {
      const invalidSprint = {
        description: 'Missing required fields'
      };
      
      const res = await request(app)
        .post('/api/sprints')
        .send(invalidSprint);
      
      expect(res.status).toBe(400);
    });
  });
});
