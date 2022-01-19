import { Category } from './log';

export const parseCategory = <T>(loggers:string[], value:T):Category =>{
  if(typeof value !== 'string' || loggers.indexOf(value)<0){
    throw new TypeError('category not found');
  }
  return value as Category;
};

export const getCategory = (loggers: string[],qs:qs.ParsedQs)=>parseCategory(loggers, qs['category']);
