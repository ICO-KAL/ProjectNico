import request from 'supertest';
import app from '../src/server.js';

describe('API Health', () => {
  describe('GET /api/health', () => {
    it('should return server health status', async () => {
      const res = await request(app).get('/api/health');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });
  
  describe('404 handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/api/non-existent-route');
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
