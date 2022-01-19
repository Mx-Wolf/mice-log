import { filter } from './filter';
import { Category, severities, Severity, writeLog } from './log';
import { LogMessage } from './types';

export const createLogger = (levels:Map<string, Severity>,basePath:()=>string, category: Category = 'error') => severities.reduce((a, b) => {
  a[b] = (message) => filter(b, levels.get(category), () => writeLog(basePath(), b, category, message));
  return a;
}, {} as Record<Severity, LogMessage>);
