export type LogMessage = (message: string) => void;
export interface LogInit {
  levels: Map<string,string>;
  basePath: string;
}

