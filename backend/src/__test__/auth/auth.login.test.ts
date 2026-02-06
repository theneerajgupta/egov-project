import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../app';

describe('========== [ AUTH / LOGIN ] ==========', () => {
  describe('POST /auth/login', () => {
    it('return 200 - valid credentials', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'theneerajgupta@gmail.com',
        password: 'StrongPassword@!123',
      });

      expect(response.status).toBe(200);
    });

    it('return 401 - invalid credentials', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'theneerajgupta@gmail.com',
        password: 'WrongPassword@!123',
      });

      expect(response.status).toBe(401);
    });

    it('return 400 - missing credentials', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'theneerajgupta@gmail.com',
        // password missing
      });

      expect(response.status).toBe(400);
    });

    it('return 403 - account disabled', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'disabled.user@example.com',
        password: 'StrongPassword@!123',
      });

      expect(response.status).toBe(403);
    });
  });
});
