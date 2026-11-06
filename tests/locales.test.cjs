const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const actions=require('../js/actions.js');
function data(){const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/data.js'),'utf8'),c);return JSON.parse(JSON.stringify(c.window.TTB_DATA))}
function contract(){const c={window:{}};for(const file of ['messages','story-locales','ui-locales','data','i18n'])vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/'+file+'.js'),'utf8'),c);return c.window}
test('all legacy dangerous choices preserve explicit Fracture 2, independent of display text',()=>{
 const d=data(),dangerous=['world-0-glassworks-0','world-1-floodedArchive-0','world-1-underbell-1','world-1-square-1','world-1-glassworks-1','world-2-hospice-1','world-2-underbell-0','world-2-gate-0','square-ledger'];
 assert.equal(actions.validate(d),43);
 assert.deepEqual(actions.list(d).filter(a=>a.fracture===2).map(a=>a.id).sort(),dangerous.sort());
 for(const a of actions.list(d)){const original=actions.choice(a,'pending');for(const label of ['Release should not change this cost','危険な行動ではない','温柔地帮助']){a.label=label;assert.equal(actions.choice(a,'pending').fracture,original.fracture);assert.equal(actions.choice(a,'pending').effect,original.effect)}}
});
test('consequence branches use action identities, preserving original and Square history',()=>{
 for(const place of ['floodedArchive','hospice','underbell','square','gate','glassworks']){
  assert.equal(actions.firstConsequence(place,'world-0-'+place+'-0'),true);
  assert.equal(actions.firstConsequence(place,'world-1-'+place+'-0'),true);
  assert.equal(actions.firstConsequence(place,'world-0-'+place+'-1'),false);
  assert.equal(actions.firstConsequence(place,'Listen or Help translated text'),false);
 }
 assert.equal(actions.firstConsequence('square','square-flowers'),true);assert.equal(actions.firstConsequence('square','square-thread'),false);
});
test('inventory outcomes retain semantic IDs when labels, names and prose change',()=>{
 const d=data();for(const a of actions.list(d)){
  const commit={effect:a.effect,gain:a.fracture,place:{root:'square',name:'Bell Square'}};
  const before=actions.inventoryDelta({satchel:[]},commit);
  commit.place.name='鐘の広場';commit.label='翻译后的行动';assert.deepEqual(actions.inventoryDelta({satchel:[]},commit),before);
  if(a.effect.startsWith('item:')){assert.equal(before.item,a.effect.slice(5));assert.equal(before.keepsake,null)}
 }
 assert.deepEqual(actions.inventoryDelta({satchel:[]},{effect:'note',gain:2,place:{root:'gate'}}),{bond:'gate',item:null,keepsake:'keepsake:gate',anchor:null,scar:'echo:gate'});
});
test('all three locale catalogs are complete and parameter/markup parity is enforced',()=>{
 const w=contract();assert.ok(w.TTB_I18N.validate(w.TTB_DATA).messages>500);
 const key='Fracture {value} of 4';delete w.TTB_UI_LOCALES.ja[key];assert.throws(()=>w.TTB_I18N.validate(w.TTB_DATA),/Missing ja/);
});
test('bad translated placeholders and markup stop validation',()=>{
 const w=contract();w.TTB_UI_LOCALES.ja['Fracture {value} of 4']='亀裂 {wrong}/4';assert.throws(()=>w.TTB_I18N.validate(w.TTB_DATA),/Placeholder mismatch/);
 const v=contract();const key=v.TTB_UI_MESSAGES.find(k=>k.includes('<b>'));v.TTB_UI_LOCALES.ja[key]=v.TTB_UI_LOCALES.ja[key].replace('<b>','<em>');assert.throws(()=>v.TTB_I18N.validate(v.TTB_DATA),/Markup mismatch/);
});
test('explicit locale, saved preference, browser preference and English fallback preserve script distinctions',()=>{
 const {choose,normalize}=contract().TTB_I18N;
 assert.equal(choose('ja','zh-Hans',['en-US']),'ja');assert.equal(choose(null,'zh-CN',['ja']),'zh-Hans');assert.equal(choose(null,null,['zh-TW','ja-JP']),'ja');assert.equal(choose(null,null,['zh-Hant','fr']),'en');assert.equal(normalize('zh-SG'),'zh-Hans');assert.equal(normalize('zh-Hant-TW'),null);
});
test('generated HTML with visible text passes through the catalog, including numbered onboarding',()=>{
 const source=fs.readFileSync(path.join(__dirname,'../js/engine.js'),'utf8'),keys=new Set(contract().TTB_UI_MESSAGES);
 for(const match of source.matchAll(/(['"])((?:\\.|(?!\1).)*)\1/g)){
  const value=match[2].replaceAll('\\'+match[1],match[1]);
  if(!value.includes('<')||!/[A-Za-z]/.test(value.replace(/<[^>]*>/g,'')))continue;
  assert.ok(keys.has(value),'Generated HTML omitted from registry: '+value);
  assert.match(source.slice(0,match.index),/\bt\($/,'Generated HTML bypasses translation: '+value);
 }
});
