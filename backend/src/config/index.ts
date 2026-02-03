import dotenv from 'dotenv';
dotenv.config();

const config = {
  // App
  server: {
    port: Number(process.env.PORT) || 8000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
  },
};

export default config;
