export const severities = [ 'verbose', 'info', 'warning', 'error'] as const;
export type Severity = typeof severities[number];
export const log = (basePath:string, severity: Severity, category: string, message: string): void => {
  throw new Error(`'not implemented yet'${severity} ${category}: ${message}`);
};
