import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../app';

describe('========== [ AUTH / REGISTER ] ==========', () => {
  describe('POST /auth/register', () => {
    it('returns 200 for valid credientials', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'theneerajgupta@gmail.com',
        password: 'StrongPassword!123',
      });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
    it('returns 401 for invalid credentials', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'wrong@example.com',
        password: 'badpass',
      });
      expect(response.status).toBe(401);
    });
  });
});
