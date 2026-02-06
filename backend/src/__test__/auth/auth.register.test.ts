import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../app';

describe('========== [ AUTH / REGISTER ] ==========', () => {
  describe('POST /auth/register', () => {
    it('return 201 - valid registration', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'newuser@example.com',
        password: 'StrongPassword@!123',
        display_name: 'New User',
        phone: '9999999999',
      });

      expect(response.status).toBe(201);
    });
  });

  describe('POST /auth/register', () => {
    it('return 400 - missing required fields', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'missingfields@example.com',
        // password missing
      });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /auth/register', () => {
    it('return 422 - invalid email format', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'not-an-email',
        password: 'StrongPassword@!123',
        display_name: 'Invalid Email',
        phone: '9999999999',
      });

      expect(response.status).toBe(422);
    });
  });

  describe('POST /auth/register', () => {
    it('return 422 - weak password', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'weakpassword@example.com',
        password: '123',
        display_name: 'Weak Password',
        phone: '9999999999',
      });

      expect(response.status).toBe(422);
    });
  });

  describe('POST /auth/register', () => {
    it('return 409 - email already exists', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'theneerajgupta@gmail.com',
        password: 'StrongPassword@!123',
        display_name: 'Duplicate User',
        phone: '9999999999',
      });

      expect(response.status).toBe(409);
    });
  });

  describe('POST /auth/register', () => {
    it('return 500 - internal server error', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'trigger500@example.com',
        password: 'StrongPassword@!123',
        display_name: 'Trigger Error',
        phone: '9999999999',
      });

      expect(response.status).toBe(500);
    });
  });
});
