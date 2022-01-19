import { RequestHandler } from 'express';
import { HttpStatusCode } from './imp/constants';
import { Severity, Category, readLog, clearLog } from './imp/log';
import { createLogger } from './imp/logger-factory';
import { getCategory } from './imp/parse-category';
import { LogInit, LogMessage } from './imp/types';
import { withLevels } from './imp/updater';

let basePath = './';

const levels = new Map<Category, Severity>();
const updaterWith = withLevels(levels);

const loggers = new Map<Category, Record<Severity, LogMessage>>();

export const getLogger = (category: Category = 'error'): Record<Severity, LogMessage> => {
  const result = loggers.get(category);
  if (typeof result !== 'undefined') {
    return result;
  }
  const created = createLogger(levels,()=>basePath,category);
  loggers.set(category, created);
  return created;
};


export const init = (settings?: Partial<LogInit> | undefined) => {
  if (typeof settings === 'undefined') {
    return;
  }
  const { basePath: initBasePath, levels: initLevels } = settings;
  if (typeof initBasePath !== 'undefined') {
    basePath = initBasePath;
  }
  if (typeof initLevels !== 'undefined') {
    (Object.keys(initLevels) as Category[]).forEach(updaterWith(initLevels));
  }
};

export const handleGetLog: RequestHandler = async (req, res, next) => {
  try {
    res.send(
      await readLog(
        basePath,
        getCategory(req.query),
      ),
    );
  }
  catch (err) {
    next(err);
  }
};

export const handleClearLog: RequestHandler = async (req, res, next) => {
  try {
    const category = getCategory(req.query);
    await clearLog(basePath,category);
    res.status(HttpStatusCode.NoContent).end();
  }
  catch(err){
    next(err);
  }
};
