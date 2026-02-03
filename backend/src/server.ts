import http, { type Server } from 'http';
import app from './app';
import config from './config';
import { shutdownDatabase } from './db/shutdown';

const server: Server = http.createServer(app);

server.listen(config.server.port, () => {
  console.log(`[ server ] running on ${config.server.port}`);
});

async function shutdown(signal: string) {
  console.log(`[ server ] received ${signal}. Shutting down...`);

  server.close(async () => {
    await shutdownDatabase();
    process.exit(0);
  });

  setTimeout(() => process.exit(1), 10_000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
