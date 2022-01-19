import { LogInit } from './types';
import { categories, severities } from './log';

export const getInitLevels = ():LogInit=>({
  basePath:'./',
  levels: new Map([
    [categories[0],severities[3]],
    [categories[1],severities[3]],
  ])
});
