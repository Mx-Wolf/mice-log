import fs from 'fs/promises';
import path from 'path';

const LOG_ENCODING = 'utf8';

export const severities = ['verbose', 'info', 'warning', 'error'] as const;
export const categories = ['error', 'app'] as const;

export type Severity = typeof severities[number];
export type Category = typeof categories[number];

export const formatFileName = (basePath: string, category: Category) => path.format({ dir: basePath, name: category, ext: '.log' });
const timeStamp = () => new Date();

const formatRecord = (severity: Severity, message: string) => JSON.stringify([timeStamp(), severity, message]);

const withNewLine = (value: string) => `${value}\n`;

export const writeLog = async (
  basePath: string,
  severity: Severity,
  category: Category,
  message: string
): Promise<void> =>
  fs.appendFile(
    formatFileName(
      basePath,
      category),
    withNewLine(formatRecord(
      severity,
      message,
    )),
  );

export const readLog = async (basePath: string, category: Category): Promise<string> =>
  fs.readFile(
    formatFileName(
      basePath,
      category,
    ),
    {
      encoding: LOG_ENCODING,
    },
  );

export const clearLog = (basePath: string, category: Category): Promise<void> =>
  fs.truncate(
    formatFileName(
      basePath,
      category,
    ),
  );
