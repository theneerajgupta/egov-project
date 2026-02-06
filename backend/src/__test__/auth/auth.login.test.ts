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
  });
  describe('POST /auth/login', () => {
    it('return 401 - invalid credentials', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'theneerajgupta@gmail.com',
        password: 'StrongPassword@!124',
      });
      expect(response.status).toBe(401);
    });
  });
  describe('POST /auth/login', () => {
    it('return 400 - missing credentials', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'theneerajgupta@gmail.com',
        password: 'StrongPassword@!124',
      });
      expect(response.status).toBe(400);
    });
  });
  describe('POST /auth/login', () => {
    it('return 403 - account disabled', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'theneerajgupta@gmail.com',
        password: 'StrongPassword@!123',
      });
      expect(response.status).toBe(403);
    });
  });
});
