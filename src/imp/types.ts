import { Category, Severity } from './log';

export type LogMessage = (message: string) => void;
export interface LogInit {
  levels: Record<Category, Severity>;
  basePath: string;
}
