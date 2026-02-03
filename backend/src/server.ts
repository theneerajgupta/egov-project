import app from './app';
import config from './config/config';

const server = app.listen(config.port, () => {
  console.log(`[ server ] running on port http://localhost:${config.port}`);
});

process.on('SIGTERM', () => {
  console.log('[ interrupt ] SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('[ server ] HTTP server closed');
  });
});
