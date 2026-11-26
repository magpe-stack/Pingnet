// Intervalos entre observações são estimativas, nunca evidência de continuidade absoluta.
export const MAX_GAP=90000;
export function needsSession(previous,at){return !previous||at<previous.at||at-previous.at>MAX_GAP;}
export function newSession(id,at){return {id,profileId:'default',startedAt:at,endedAt:null,lastObservedAt:null,rounds:0,version:9};}
export function recordObservation(session,row){return {...session,lastObservedAt:row.completedAt,rounds:session.rounds+1};}
export function closeSession(session,reason){return {...session,endedAt:session.lastObservedAt??session.startedAt,reason};}
