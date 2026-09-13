import {uid} from './notebook';
export const FADE_MS=5000,INPUT_END_MS=380;
export type InkCycle={id:string;pageId:string;startedAt:number;inputRevision:number;fading:boolean;blocks:string[];strokes:string[];ready:boolean;sent:boolean};
export function beginInkCycle(pageId:string,inputRevision:number,blocks:string[],strokes:string[],now=Date.now()):InkCycle{return{id:uid(),pageId,inputRevision,startedAt:now,blocks,strokes,fading:true,ready:!strokes.length,sent:false};}
export function cycleMayReply(c:InkCycle,revision:number,now:number){return c.fading&&c.ready&&!c.sent&&c.inputRevision===revision&&now>=c.startedAt+FADE_MS;}
export function restoreForEdit(c?:InkCycle){if(c)c.fading=false;}
export function recognitionKey(strokes:{id:string;revision?:number}[]){return strokes.map(s=>`${s.id}:${s.revision||0}`).sort().join('|');}
