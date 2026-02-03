import { databasePool } from './pool';

let shuttingDown = false;

export async function shutdownDatabase(): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log('[ server ] closing database pool...');
  await databasePool.end();
  console.log('[ server ] database pool closed.');
}
