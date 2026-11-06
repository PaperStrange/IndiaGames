/* Locale-independent action and inventory contracts. No display labels decide behavior. */
(function(root){
  'use strict';
  function list(data){
    var result=[];
    data.worlds.forEach(function(world){Object.keys(world).forEach(function(place){result=result.concat(world[place].choices)})});
    data.squareChoices.forEach(function(choices){result=result.concat(choices)});
    return result.concat(data.squareAction);
  }
  function validate(data){
    var seen=new Set();
    list(data).forEach(function(action){
      if(!action.id||seen.has(action.id))throw Error('Duplicate/missing action id: '+action.id);
      seen.add(action.id);
      if(action.fracture!==1&&action.fracture!==2)throw Error('Explicit action cost required: '+action.id);
      if(typeof action.effect!=='string')throw Error('Semantic effect required: '+action.id);
    });
    return seen.size;
  }
  function find(data,id){var action=list(data).find(function(a){return a.id===id});if(!action)throw Error('Unknown action: '+id);return action}
  function choice(action,status){return {id:action.id,label:action.label,description:action.descriptions?(action.descriptions[status]||action.descriptions.pending):action.description,effect:action.effect,result:action.result,fracture:action.fracture}}
  function firstConsequence(place,id){return id==='world-0-'+place+'-0'||id==='world-1-'+place+'-0'||place==='square'&&id==='square-flowers'}
  function inventoryDelta(state,commit){
    var effect=commit.effect,anchored=['route','song','lens'].indexOf(effect)>=0;
    var item=effect.indexOf('item:')===0?effect.slice(5):null;
    return {bond:commit.place.root,item:item,keepsake:(!state.satchel.length&&!item)||effect==='note'||anchored?'keepsake:'+commit.place.root:null,anchor:anchored?effect:null,scar:commit.gain===2?'echo:'+commit.place.root:null};
  }
  var api={list:list,validate:validate,find:find,choice:choice,firstConsequence:firstConsequence,inventoryDelta:inventoryDelta};
  root.TTB_ACTIONS=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
