import { existsSync } from 'fs';
import { resolve } from 'path';

/**
 *
 * @param dest This will return the env file path based on the current envirnoment( test, dev, prod ...)
 * @returns
 */
export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `.env.${env}` : '.env.dev';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
