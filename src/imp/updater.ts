import { Category, Severity } from './log';

export const withLevels = (levels:Map<Category,Severity>)=>(initLevels:Record<Category,Severity>)=> (category:Category) => levels.set(category, initLevels[category]);
