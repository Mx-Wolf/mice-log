import { categories, Category } from './log';

export const parseCategory = <T>(value:T):Category =>{
  if(typeof value !== 'string' || categories.indexOf(value as Category)<0){
    throw new TypeError('category not found');
  }
  return value as Category;
};

export const getCategory = (qs:qs.ParsedQs)=>parseCategory(qs['category']);
