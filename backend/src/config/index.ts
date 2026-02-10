import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const config = {
  server: {
    port: Number(process.env.PORT) || 8000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: requireEnv('DB_NAME'),
    user: requireEnv('DB_USER'),
    password: requireEnv('DB_PASSWORD'),
  },

  jwt_access: {
    secret: requireEnv('JWT_ACCESS_SECRET') as string,
    expires_in: requireEnv('JWT_ACCESS_EXPIRES_IN') as SignOptions['expiresIn'],
  },

  jwt_refresh: {
    secret: requireEnv('JWT_REFRESH_SECRET') as string,
    expires_in: requireEnv(
      'JWT_REFRESH_EXPIRES_IN',
    ) as SignOptions['expiresIn'],
  },
};

export default config;
