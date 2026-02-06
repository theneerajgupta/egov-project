// import { databasePool } from './pool';

// export async function checkDatabaseHealth(): Promise<void> {
//   const connection = await databasePool.getConnection();
//   try {
//     await connection.query('SELECT 1');
//     console.log('[ database ] database connected...');
//   } catch (err) {
//     console.error('[ database ] ERROR - ', err);
//   } finally {
//     connection.release();
//     console.log('[ database ] database closed.');
//   }
// }

import { databasePool } from './pool';

export async function assertDatabaseConnection(): Promise<void> {
  const connection = await databasePool.getConnection();
  try {
    await connection.query('SELECT 1');
    console.log('[ database ] connection verified!');
  } catch (err) {
    console.error('[ database ] failed to connect');
  } finally {
    connection.release();
  }
}
