import mysql from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: mysql.Pool | undefined;
}

export const db =
  global.mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

if (process.env.NODE_ENV !== 'production') {
  global.mysqlPool = db;
}

/* ---------- Graceful shutdown (production only) ---------- */
if (process.env.NODE_ENV === 'production') {
  const shutdown = async (signal: string) => {
    console.log(`[ database ] Shutting down pool (${signal})`);
    try {
      await db.end();
      console.log('[ database ] Pool closed');
    } catch (err) {
      console.error('[ database ] Error closing pool', err);
    }
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
