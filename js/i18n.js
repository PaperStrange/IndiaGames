/* Presentation-only localization. Game identity and rules never depend on this catalog. */
(function(root){
  'use strict';
  var locales=['en','ja','zh-Hans'],locale='en',required=new Set(),translations={},bindings=[],attributes=[];
  function normalize(value){
    if(typeof value!=='string')return null;
    if(/^en(?:-|$)/i.test(value))return 'en';
    if(/^ja(?:-|$)/i.test(value))return 'ja';
    if(/^zh-(?:Hans(?:-|$)|CN(?:-|$)|SG(?:-|$))/i.test(value))return 'zh-Hans';
    return null;
  }
  function choose(explicit,saved,preferred){return normalize(explicit)||normalize(saved)||(preferred||[]).map(normalize).find(Boolean)||'en'}
  function placeholders(text){return (text.match(/\{[a-zA-Z][a-zA-Z0-9_]*\}/g)||[]).sort().join('|')}
  function markup(text){return (text.match(/<[^>]*>/g)||[]).join('')}
  function collect(value,key){
    if(key==='icons'||key==='id'||key==='effect')return;
    if(typeof value==='string'){required.add(value);return}
    if(Array.isArray(value)){value.forEach(function(v){collect(v)});return}
    if(value&&typeof value==='object')Object.keys(value).forEach(function(k){collect(value[k],k)});
  }
  function validate(data){
    required=new Set(root.TTB_UI_MESSAGES);collect(data);
    locales.slice(1).forEach(function(lang){
      var story=root.TTB_STORY_LOCALES[lang],ui=root.TTB_UI_LOCALES[lang];
      if(!story||!ui)throw Error('Missing locale '+lang);
      translations[lang]=Object.assign({},story,ui);
      required.forEach(function(key){
        var value=translations[lang][key];
        if(typeof value!=='string'||!value.trim())throw Error('Missing '+lang+' message: '+key);
        if(placeholders(key)!==placeholders(value))throw Error('Placeholder mismatch '+lang+': '+key);
        if(markup(key)!==markup(value))throw Error('Markup mismatch '+lang+': '+key);
      });
    });
    return {locales:locales.slice(),messages:required.size};
  }
  function t(key,values){
    if(typeof key!=='string')throw Error('Message must be a string');
    var text=locale==='en'?key:translations[locale][key];
    // A nested, already rendered message is permitted; missing English never falls back.
    if(!required.has(key)){
      if(locale!=='en'&&Object.values(translations[locale]).indexOf(key)>=0)return key;
      throw Error('Unknown message: '+key);
    }
    if(typeof text!=='string')throw Error('Missing '+locale+' message: '+key);
    return text.replace(/\{([a-zA-Z][a-zA-Z0-9_]*)\}/g,function(_,name){
      if(!values||!Object.prototype.hasOwnProperty.call(values,name))throw Error('Missing placeholder '+name+' in '+key);
      var value=String(values[name]);
      return locale!=='en'&&Object.prototype.hasOwnProperty.call(translations[locale],value)?translations[locale][value]:value;
    });
  }
  function bindStatic(){
    var walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT),node;
    while((node=walker.nextNode())){
      if(node.parentElement.closest('script,style,svg,[data-no-i18n]'))continue;
      var key=node.textContent.trim();
      if(/[A-Za-z]/.test(key)){if(!required.has(key))throw Error('Uncatalogued static message: '+key);bindings.push({node:node,key:key})}
    }
    document.querySelectorAll('[aria-label],[alt],[title]').forEach(function(el){
      ['aria-label','alt','title'].forEach(function(name){var key=el.getAttribute(name);if(key){if(!required.has(key))throw Error('Uncatalogued '+name+': '+key);attributes.push({node:el,name:name,key:key})}});
    });
  }
  function applyStatic(){
    document.documentElement.lang=locale;
    bindings.forEach(function(b){if(b.node.isConnected)b.node.textContent=t(b.key)});
    attributes.forEach(function(b){if(b.node.isConnected)b.node.setAttribute(b.name,t(b.key))});
    document.querySelectorAll('.locale-choice').forEach(function(el){el.value=locale});
  }
  function setLocale(next){
    next=normalize(next);if(!next)return false;locale=next;
    try{localStorage.setItem('thirteenth-bell.locale',locale)}catch(ignore){}
    applyStatic();return true;
  }
  function configure(data){
    validate(data);var saved=null;
    try{saved=localStorage.getItem('thirteenth-bell.locale')}catch(ignore){}
    locale=choose(new URL(location.href).searchParams.get('lang'),saved,navigator.languages||[navigator.language]);
    bindStatic();applyStatic();
  }
  root.TTB_I18N={t:t,normalize:normalize,choose:choose,validate:validate,configure:configure,setLocale:setLocale,applyStatic:applyStatic,getLocale:function(){return locale},locales:locales};
  if(typeof module!=='undefined')module.exports=root.TTB_I18N;
})(typeof window!=='undefined'?window:globalThis);
