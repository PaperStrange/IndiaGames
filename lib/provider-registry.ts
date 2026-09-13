import {uid} from './notebook';
import type {ProviderConnection} from './companion-types';
// Registry seam adapted from PaperReadingAgent's provider_config, pinned in ROUTER_SOURCE.
// Keys never fall back across providers. Capability/price profiles belong to each connection.
export const PROVIDER_PRESETS:Record<string,{name:string;protocol:ProviderConnection['protocol'];baseUrl:string;model:string}>={
 openai:{name:'OpenAI',protocol:'responses',baseUrl:'https://api.openai.com/v1',model:'gpt-4.1-mini'},
 anthropic:{name:'Anthropic',protocol:'anthropic',baseUrl:'https://api.anthropic.com/v1',model:'claude-sonnet-4-6'},
 deepseek:{name:'DeepSeek',protocol:'chat',baseUrl:'https://api.deepseek.com',model:'deepseek-chat'},
 dashscope:{name:'DashScope',protocol:'chat',baseUrl:'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',model:'qwen-plus'},
 openrouter:{name:'OpenRouter',protocol:'chat',baseUrl:'https://openrouter.ai/api/v1',model:'openai/gpt-4.1-mini'},
 custom:{name:'Custom provider',protocol:'chat',baseUrl:'https://api.your-provider.com/v1',model:''}
};
export function providerPreset(id:string):ProviderConnection{const p=PROVIDER_PRESETS[id]||PROVIDER_PRESETS.custom;return {...p,id:uid(),enabled:true,reasoningModel:'',visionModel:['openai','anthropic','openrouter'].includes(id)?p.model:'',models:p.model?[{id:p.model,label:p.model,vision:['openai','anthropic','openrouter'].includes(id),tools:true,inputPrice:id==='openai'?.4:id==='anthropic'?3:-1,outputPrice:id==='openai'?1.6:id==='anthropic'?15:-1,context:128000}]:[]};}
