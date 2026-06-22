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
      // Gracefully handle team-db not being available (e.g. on Vercel production)
      if (error?.code === 127 || error?.message?.includes('command not found') || error?.message?.includes('team-db')) {
        console.warn('team-db not available, returning empty result set');
        return [] as T[];
      }
      if (error.message?.includes('Locking error') && i < retries - 1) {
        console.warn(`Database locked (catch), retrying... (${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
        continue;
      }
      console.error('Database Error:', error);
      return [] as T[];
    }
  }
  return [] as T[];
}

export async function execute(sql: string): Promise<void> {
  await query(sql);
}
