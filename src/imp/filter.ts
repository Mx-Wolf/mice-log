import { severities, Severity } from './log';

type Action = ()=>void;
const noop = ()=>undefined;

export const filter =(want:Severity, allowed:Severity = 'error', action:Action = noop)=>{
  const wantIx = severities.indexOf(want);
  const allowedIx = severities.indexOf(allowed);
  if(allowedIx<=wantIx){
    action();
  }
};
