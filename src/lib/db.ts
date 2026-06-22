import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function query<T>(sql: string, retries = 5): Promise<T[]> {
  for (let i = 0; i < retries; i++) {
    try {
      // Escaping single quotes in SQL for bash
      const escapedSql = sql.replace(/'/g, "'\\''");
      const { stdout, stderr } = await execPromise(`team-db "${escapedSql}"`);
      
      if (stderr && !stdout) {
        if (stderr.includes('Locking error') && i < retries - 1) {
          console.warn(`Database locked, retrying... (${i + 1}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
          continue;
        }
        throw new Error(stderr);
      }
      
      return JSON.parse(stdout) as T[];
    } catch (error: any) {
      if (error.message?.includes('Locking error') && i < retries - 1) {
        console.warn(`Database locked (catch), retrying... (${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
        continue;
      }
      console.error('Database Error:', error);
      throw error;
    }
  }
  throw new Error('Database locked after multiple retries');
}

export async function execute(sql: string): Promise<void> {
  await query(sql);
}
