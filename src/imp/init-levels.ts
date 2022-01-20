import { LogInit } from './types';

const MICE_LOG_KNOWN_PREFIX = 'mice_log_';

const withSettings = (settings:NodeJS.ProcessEnv)=>(a:Map<string,string>, b:string)=>{
  if(b.toLocaleLowerCase().startsWith(MICE_LOG_KNOWN_PREFIX) ){
    const value = settings[b];
    if(typeof value === 'string')
    {
      a.set(b.substring(MICE_LOG_KNOWN_PREFIX.length).toLocaleLowerCase(), value);
    }
  }
  return a;
};

const loadFrom = (settings:NodeJS.ProcessEnv)=>Object
  .keys(settings)
  .reduce(withSettings(settings), new Map<string,string>());

export const getInitLevels = ():LogInit=>({
  basePath:'./',
  levels: loadFrom(process.env),
});
