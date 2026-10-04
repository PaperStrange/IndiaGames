import type {CompanionConfig,ProviderConnection,ModelTask,ModelProfile} from './companion-types';
export function publicEndpoint(value:string) {
 const u=new URL(value), h=u.hostname.toLowerCase();
 if(u.protocol!=='https:'||u.username||u.password||u.hash||u.search||(u.port&&u.port!=='443')||!h.includes('.')||/^[\d.]+$/.test(h)||h.includes(':')||/(^|\.)(localhost|local|internal|lan|home|test|invalid|example)$/.test(h)||/(^|\.)(nip\.io|sslip\.io|localtest\.me)$/.test(h)) throw Error('Use a public HTTPS service address without credentials, a query or a custom port.');
 return u.href.replace(/\/$/,'');
}
export function wireModel(id:string,baseUrl=''){if(baseUrl.includes('openrouter.ai'))return id.startsWith('openrouter/')&&id!=='openrouter/auto'?id.slice(11):id;if(id.startsWith('openai/'))return id.slice(7);if(id.startsWith('openrouter/')&&id!=='openrouter/auto')return id.slice(11);return id;}
export function taskFor(text:string,vision=false):ModelTask{return vision?'vision':/\b(prove|derive|debug|compare|research|analy[sz]e|step.by.step)\b|证明|推导|研究|分析|比较/i.test(text)?'reasoning':'reply';}
export function chooseModel(c:CompanionConfig,p:ProviderConnection,task:ModelTask,needsTools=false){
 const id=wireModel(c.locked?c.selectedModel||p.model:task==='vision'?p.visionModel:task==='reasoning'?p.reasoningModel||p.model:p.model,p.baseUrl);
 if(!id)throw Error('Choose a model for this task in Companion settings.');
 if(id==='openrouter/auto')throw Error('Choose an explicit model. An upstream auto-router cannot enforce this model lock or budget.');
 const m=p.models.find(m=>wireModel(m.id,p.baseUrl)===id);if(!m)throw Error(`Add capabilities and pricing for ${id}.`);
 if(task==='vision'&&!m.vision)throw Error(c.locked?'Your locked model cannot read images. Select an image-capable model or unlock routing.':'Choose a vision model for handwriting.');
 if(needsTools&&!m.tools)throw Error('Use a tool-capable model or disable connected tools.');
 if(m.inputPrice<0||m.outputPrice<0)throw Error('Set model prices before using the daily spending limit.');
 return {model:{...m,id},reason:c.locked?'Selected model locked':task==='vision'?'Handwriting → vision model':task==='reasoning'&&p.reasoningModel?'Reasoning task → reasoning model':'Conversation → reply model'};
}
export function estimatedCost(m:ModelProfile,input:string,maxOutput:number,image=false){const tokens=new TextEncoder().encode(input).byteLength+(image?8192:0)+512;if(tokens+maxOutput>m.context)throw Error('This turn exceeds the selected model’s context budget. Shorten the passage or choose a larger-context model.');return(tokens*m.inputPrice+maxOutput*m.outputPrice)/1e6;}
export function validateArguments(v:unknown,s:Record<string,any>,depth=0):boolean {
 if(depth>10)return false;if(s.enum&&!s.enum.some((x:unknown)=>JSON.stringify(x)===JSON.stringify(v)))return false;
 if(s.type==='object'){if(!v||typeof v!=='object'||Array.isArray(v))return false;const r=v as Record<string,unknown>,p=s.properties||{};return !(s.required||[]).some((k:string)=>!(k in r))&&Object.entries(r).every(([k,x])=>k in p?validateArguments(x,p[k],depth+1):s.additionalProperties!==false);}
 if(s.type==='array')return Array.isArray(v)&&v.length<=Math.min(s.maxItems||100,100)&&v.every(x=>validateArguments(x,s.items||{},depth+1));
 if(s.type==='string')return typeof v==='string'&&v.length<=Math.min(s.maxLength||16000,16000);
 if(s.type==='number'||s.type==='integer')return typeof v==='number'&&Number.isFinite(v)&&(s.type!=='integer'||Number.isInteger(v))&&(s.minimum===undefined||v>=s.minimum)&&(s.maximum===undefined||v<=s.maximum);
 if(s.type==='boolean')return typeof v==='boolean';if(s.type==='null')return v===null;return true;
}
