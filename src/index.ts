import { filter } from './imp/filter';
import { log, severities, Severity } from './imp/log';

type LogMessage = (message: string) => void;

let basePath = './';
const levels = new Map<string,Severity>();

const loggers = new Map<string,Record<Severity,LogMessage>>();

const createLogger = (category='error')=>severities.reduce((a,b:Severity)=>{
  a[b] = (message)=>filter(b,levels.get(category),()=>log(basePath, b,category,message));
  return a;
},{} as Record<Severity,LogMessage>);

export const getLogger = (category = 'error'): Record<Severity, LogMessage> => {
  const result = loggers.get(category);
  if(typeof result !== 'undefined'){
    return result;
  }
  const created = createLogger(category);
  loggers.set(category,created);
  return created;
};

export interface LogInit{
  levels:Record<string,Severity>;
  basePath: string;
}

export const init = (settings?:Partial<LogInit>|undefined) =>{
  if(typeof settings === 'undefined'){
    return;
  }
  const {basePath:initBasePath,levels:initLevels} = settings;
  if(typeof initBasePath !== 'undefined'){
    basePath = initBasePath;
  }
  if(typeof initLevels !== 'undefined'){
    Object.keys(initLevels).forEach((category)=>levels.set(category, initLevels[category]));
  }
};
