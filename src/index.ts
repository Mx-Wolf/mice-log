import { RequestHandler } from 'express';
import { HttpStatusCode } from './imp/constants';
import { getInitLevels } from './imp/init-levels';
import { Severity, Category, readLog, clearLog, isSeverity } from './imp/log';
import { createLogger } from './imp/logger-factory';
import { getCategory } from './imp/parse-category';
import { LogInit, LogMessage } from './imp/types';
export { LogInit } from './imp/types';
export { Category, Severity } from './imp/log';

let basePath = './';

const levels = new Map<Category, Severity>();
const loggers = new Map<Category, Record<Severity, LogMessage>>();

const getKnown = (qs: qs.ParsedQs) => getCategory([...loggers.keys(), ...levels.keys()], qs);

export const getLogger = (category: Category = 'error'): Record<Severity, LogMessage> => {
  const result = loggers.get(category);
  if (typeof result !== 'undefined') {
    return result;
  }
  const created = createLogger(levels, () => basePath, category);
  loggers.set(category, created);
  return created;
};

export const init = (onConfigure: ((props: LogInit) => void | undefined)) => {
  const logInit = getInitLevels();
  if (typeof onConfigure === 'function') {
    onConfigure(logInit);
  }

  if (logInit.basePath.length > 0) {
    basePath = logInit.basePath;
  }

  logInit.levels.forEach((value, key) => {
    if (isSeverity(value)) {
      levels.set(key, value);
    }
  });
};

export const handleGetLog: RequestHandler = async (req, res, next) => {
  try {
    res.send(
      await readLog(
        basePath,
        getKnown(req.query),
      ),
    );
  }
  catch (err) {
    next(err);
  }
};

export const handleClearLog: RequestHandler = async (req, res, next) => {
  try {
    const category = getKnown(req.query);
    await clearLog(basePath, category);
    res.status(HttpStatusCode.NoContent).end();
  }
  catch (err) {
    next(err);
  }
};
