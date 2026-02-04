import http, { type Server } from 'http';
import app from './app';
import config from './config';
import { shutdownDatabase } from './db/shutdown';
import { assertDatabaseConnection } from './db/health';

const server: Server = http.createServer(app);

async function start() {
  try {
    await assertDatabaseConnection();
    server.listen(config.server.port, () => {
      console.log(`[ server ] running on ${config.server.port}`);
    });
  } catch (err) {
    console.error('[ server ] startup failed, yeeeet!');
    process.exit(1);
  }
}

async function shutdown(signal: string) {
  console.log(`[ server ] received ${signal}. Shutting down...`);

  server.close(async () => {
    await shutdownDatabase();
    process.exit(0);
  });

  setTimeout(() => process.exit(1), 10_000);
}

start();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
