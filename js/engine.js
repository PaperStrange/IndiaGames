/* The Thirteenth Bell — game engine.
 * Systems: game loop, clock phases, scene manager, predictions, journal,
 * anchor board, momentum/fracture meters. All content comes from js/data.js
 * via window.TTB_DATA — no story content is declared here.
 * (Extracted 2026-10-03 from the single-file demo; logic unchanged.)
 */

  (function(){
    TTB_I18N.configure(TTB_DATA);
    var t=TTB_I18N.t;
    var state,clockTimer,currentPlace,mode='original',modeStates={},borrowRequested=false;
    var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
    TTB_ACTIONS.validate(TTB_DATA);
    function actionById(id){return TTB_ACTIONS.find(TTB_DATA,id)}
    function itemLabel(id){return id.indexOf('keepsake:')===0?TTB_DATA.keepsakes[id.slice(9)]:TTB_DATA.itemNames[id]}
    function bondLabel(id){return id==='town'?t('The town itself'):TTB_DATA.bonds[id]}
    function scarLabel(id){return id==='bellmarked'?t('Bellmarked'):t('Echo-burn from {place}',{place:baseRoster().find(function(p){return p.root===id.slice(5)}).name})}
    function baseRoster(){return[
      {id:'bell-square',root:'square',name:'Bell Square',slot:'p-square',world:0},{id:'north-gate',root:'gate',name:'North Gate',slot:'p-gate',world:0},{id:'glassworks',root:'glassworks',name:'Glassworks',slot:'p-glass',world:0},
      {id:'saint-orra-hospice',root:'hospice',name:"Saint Orra's Hospice",slot:'p-hospice',world:0},{id:'flooded-archive',root:'floodedArchive',name:'Flooded Archive',slot:'p-archive',world:0},{id:'underbell',root:'underbell',name:'Underbell',slot:'p-underbell',world:0}];}
    function roster(){
      var world=worldIndex();return baseRoster().map(function(p){return{id:p.id+(world?'-'+world:''),root:p.root,name:p.name,slot:p.slot,world:world}});
    }
    function fresh(){return{started:true,startTime:Date.now(),loop:1,phase:0,actions:0,anchors:{},satchel:[],bonds:[],journal:[],visited:{},mastered:{},visitCounts:{},flags:{},predictions:{},momentum:0,fracture:0,scars:[],carryBond:'',carryObject:'',pendingBond:'',pendingObject:'',pendingCommitment:null,pendingBatch:null,nextCommitmentId:0,pendingAdvance:false,resolvedPredictions:{},squareClue:null,squareDay:TTB_SQUARE.day(1),learnedBells:{},echoUsed:false,journalView:'place',understood:null}}
    function worldIndex(){return Math.min(2,state.loop-1)}
    function fmt(ms){var s=Math.max(0,Math.floor(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
    function tick(){if(state&&state.started)$('#timer').textContent=fmt(Date.now()-state.startTime)}
    function modal(id,on){$(id).classList.toggle('show',on)}
    function focusContrast(selector){var el=$(selector);if(!el)return;if(!el.matches('button,a[href],input,select,textarea,[tabindex]'))el.setAttribute('tabindex','-1');el.focus()}
    function toast(t){var el=$('#toast');el.textContent=t;el.classList.add('show');setTimeout(function(){el.classList.remove('show')},1300)}
    function note(message,values){var entry={message:message,values:values||{}};if(!state.journal.some(function(e){return JSON.stringify(e)===JSON.stringify(entry)})){state.journal.unshift(entry);state.journal=state.journal.slice(0,6)}}
    function anchor(kind){if(!state.anchors[kind]){state.anchors[kind]=true;toast(t('Memory anchored: {memory}',{memory:({route:t('Hidden route'),song:t("Bell's true song"),lens:t('Ember lens')}[kind])}));}}
    function addItem(name){if(state.satchel.indexOf(name)<0)state.satchel.push(name)}
    function allAnchors(){return state.anchors.route&&state.anchors.song&&state.anchors.lens}
    function phaseName(){return['Dawn','Noon','Dusk','Midnight'][state.phase]}
    function phaseClock(){return['Dawn · 7:00','Noon · 12:00','Dusk · 18:20','Midnight · 13th bell'][state.phase]}
    function animateClock(){var hour=[210,360,550,720][state.phase],minute=[0,0,120,0][state.phase];$('#hourHand').style.transform='rotate('+hour+'deg)';$('#minuteHand').style.transform='rotate('+minute+'deg)';var c=$('#mapClock');c.classList.remove('chime');void c.offsetWidth;c.classList.add('chime')}
    function predictionKey(){return state.loop+':'+state.phase}
    function declarePrediction(index){if(state.phase>=3||state.pendingAdvance||state.predictions[predictionKey()]!==undefined)return;state.predictions[predictionKey()]=index;render();focusContrast('#forecastState');toast(t('Prediction locked until the next bell'))}
    function predictionResult(){var picked=state.predictions[predictionKey()],scheduled=TTB_DATA.schedules[Math.min(2,state.phase)];return{picked:picked,scheduled:scheduled,correct:picked===scheduled.answer}}
    function resolvePrediction(){var r=predictionResult();if(r.picked===undefined){note('Prediction left blank: {reveal}',{reveal:r.scheduled.reveal});return}if(r.correct){state.momentum++;note('Prediction fulfilled: {reveal} Momentum +1.',{reveal:r.scheduled.reveal});toast(t('Prediction fulfilled · Momentum +1'))}else{note('Prediction missed: {reveal}',{reveal:r.scheduled.reveal})}}
    function renderPrediction(){var wrap=$('#predictionChoices'),box=$('.forecast'),scheduled=TTB_DATA.schedules[Math.min(2,state.phase)],picked=state.predictions[predictionKey()];if(state.phase>=3){box.hidden=true;return}box.hidden=false;$('#forecastLabel').textContent=mode==='contrast'?t('Prediction · declare before travel'):t('Prediction · before the next bell');$('#forecastTitle').textContent=t(scheduled.title);$('#forecastClue').textContent=mode==='contrast'?t('Use the people × phase ledger, then commit. The bell validates later.'):t(scheduled.clue);$('#forecastState').textContent=picked===undefined?t('Undeclared'):t('Locked · {prediction}',{prediction:scheduled.options[picked]});wrap.innerHTML='';scheduled.options.forEach(function(label,i){var b=document.createElement('button');b.className='prediction'+(picked===i?' selected':'');b.type='button';b.disabled=picked!==undefined||state.pendingAdvance;b.textContent=t(label);b.addEventListener('click',function(){declarePrediction(i)});wrap.appendChild(b)})}
    function renderForecastMemory(){
      var memory=state.learnedBells[state.phase],el=$('#forecastMemory');el.hidden=mode!=='contrast'||!memory||state.phase>=3;
      el.textContent=memory?t('{source} in loop {loop}: {reveal} Use the source of this knowledge when planning.',{source:memory.knowledge==='witnessed'?t('Witnessed'):t('Reported'),loop:memory.loop,reveal:memory.reveal}):'';
    }
    function rememberBell(commit){var witness=commit.place.root===['square','glassworks','underbell'][state.phase],memory=state.learnedBells[state.phase];if(!memory||witness&&memory.knowledge!=='witnessed')state.learnedBells[state.phase]={loop:state.loop,reveal:predictionResult().scheduled.reveal,knowledge:witness?'witnessed':'reported',place:commit.place.root,phase:state.phase+1}}
    function renderBorrow(){
      var panel=$('#borrowPanel'),button=$('#borrowMinute');panel.hidden=mode!=='contrast'||!currentPlace||!TTB_ECHO.knownBefore(state,currentPlace.root)||state.pendingAdvance;
      if(panel.hidden)return;var eligible=TTB_ECHO.canBorrow(state,currentPlace.root);button.disabled=!eligible;button.setAttribute('aria-pressed',borrowRequested);
      button.textContent=borrowRequested?t('Minute reserved · choose your action'):t('Borrow a minute · 1 Momentum');
      $('#borrowCopy').textContent=state.echoUsed?t('You already borrowed one minute this loop.'):state.momentum<1?t('Correct forecasts earn Momentum. Save 1 to borrow a minute on a familiar route next loop.'):borrowRequested?t('Your next choice keeps this phase. Fracture still rises; reaching 4 sends you to midnight.'):t('You know the way here. Spend 1 Momentum to make this visit without moving the clock. One extra visit per loop; every new choice stays yours.');
    }
    function renderSchedule(){var box=$('#scheduleGrid');box.innerHTML='';[t('Person'),t('Dawn'),t('Noon'),t('Dusk'),t('Midnight')].forEach(function(x,i){var c=document.createElement('div');c.className='schedule-cell head'+(i===state.phase+1?' now':'');c.textContent=t(x);box.appendChild(c)});TTB_DATA.npcScheduleRows.forEach(function(source){var row=source.cells.slice();if(mode==='contrast'&&source.id==='mina'){row[2]=state.squareDay.status==='safe'?t('Sheltered well'):state.squareDay.status==='blocked'?t('Auction stalls'):state.squareDay.status==='interrupted'?t('Noon interrupted'):t('Market crossing');if(state.squareDay.status==='safe'||state.squareDay.status==='blocked')row[3]=row[2];if(state.squareDay.status==='interrupted')row[3]=t('Dusk interrupted')}row.forEach(function(x,i){var c=document.createElement('div');c.className='schedule-cell'+(i===0?' person':'')+(i===state.phase+1?' now':'');c.textContent=t(x);box.appendChild(c)})})}
    function renderJournalViews(){
      if(mode!=='contrast')return;var box=$('#placeJournal');box.innerHTML='';var names={square:t('Bell Square'),gate:t('North Gate'),glassworks:t('Glassworks'),hospice:t("Saint Orra’s Hospice"),floodedArchive:t('Flooded Archive'),underbell:t('Underbell')};var roots=['square','gate','glassworks','hospice','floodedArchive','underbell'];
      roots.forEach(function(root,i){var entries=[];Object.keys(state.flags).forEach(function(k){if(k.indexOf(root+':')===0)entries.push(t('Loop {loop} · {action}',{loop:Number(k.split(':')[1])+1,action:actionById(state.flags[k]).label}))});var item=document.createElement('div');item.className='district-entry';item.innerHTML='<i>'+String(i+1).padStart(2,'0')+'</i><div><b>'+t(names[root])+'</b><span>'+(entries.length?entries.join('<br>'):t('No visit recorded.'))+'</span></div>';box.appendChild(item)});
      var flowers=!!state.flags['square:0'],route=!!state.anchors.route,song=!!state.anchors.song,lens=!!state.anchors.lens,release=route&&song&&lens;var theoryCopy={flowers:t('Redflowers calm the gears<small>Bell Square · observed</small>'),song:t('A missing note releases time<small>North Gate · anchored</small>'),route:t('The procession hides a stair<small>Archive → Underbell</small>'),lens:t('Living glass carries a change<small>Glassworks · anchored</small>'),release:t('Route + song + lens may free dawn<small>Working theory · unconfirmed</small>')};$$('.theory-pin').forEach(function(pin){var key=pin.dataset.theory,found=key==='flowers'?flowers:key==='route'?route:key==='song'?song:key==='lens'?lens:release;pin.classList.toggle('found',found);pin.innerHTML=found?theoryCopy[key]:(key==='release'?t('Unformed theory<small>Connect three anchors</small>'):t('Undiscovered thread<small>Gather evidence</small>'))});var edges=[flowers&&song,flowers&&route,song&&lens,route&&release,lens&&release,route&&lens];$$('.theory-lines line').forEach(function(line,i){line.classList.toggle('revealed',!!edges[i])});setJournalView(state.journalView||'place',false)
    }
    function setJournalView(view,doFocus){state.journalView=view;var place=view==='place';$('#placeTab').setAttribute('aria-selected',place);$('#theoryTab').setAttribute('aria-selected',!place);$('#placeJournal').hidden=!place;$('#theoryJournal').hidden=place;if(doFocus)focusContrast(place?'#placeJournal':'#theoryJournal')}
    function renderMode(){var contrast=mode==='contrast';$('#originalMode').setAttribute('aria-pressed',!contrast);$('#contrastMode').setAttribute('aria-pressed',contrast);$$('.contrast-only').forEach(function(el){el.hidden=!contrast});$$('.original-only').forEach(function(el){el.hidden=contrast});$('#originalMode').disabled=state.pendingAdvance;$('#contrastMode').disabled=state.pendingAdvance;$('#closeEncounter').disabled=state.pendingAdvance;$('#mapPace').textContent=contrast?t('Three bells before midnight. Memory can buy one extra visit.'):t('Each district holds an activity, not an answer. Three visits before midnight.');$('#chapter').textContent=contrast?t('Contrast demo · consequence-led'):t('A solo time-loop adventure');$('#startLabel').textContent=contrast?t('Contrast version · 4–8 minute solo adventure'):t('Original version · 4–8 minute solo adventure');$('#startTitle').textContent=contrast?t('Plan the day. Let midnight answer.'):t('Walk a day that refuses to repeat.');$('#startText').textContent=contrast?t('Read the NPC × phase ledger, declare what will change, then travel. What you witness becomes forecast evidence. From loop two, spend 1 Momentum on a familiar route to borrow one extra visit; Fracture still counts.'):t('You have three visits before the thirteenth bell—unless Fracture reaches 4 and catastrophe arrives early. Predict scheduled events to gain Momentum, then carry one bond and one object through midnight. Scars never reset.');$('#startHow').innerHTML=contrast?t('<div><b>1 · Read</b>Study people across four phases.</div><div><b>2 · Predict</b>Declare the change before travel.</div><div><b>3 · Commit</b>The town withholds judgment.</div><div><b>4 · Resolve</b>See consequences at the bell.</div>'):t('<div><b>1 · Predict</b>Commit before the next bell.</div><div><b>2 · Travel & act</b>Every choice strains the town.</div><div><b>3 · Spend Momentum</b>Skip scenes you have mastered.</div><div><b>4 · Anchor</b>Choose what tomorrow remembers.</div>');$('#startBtn').textContent=contrast?t('Begin Contrast run'):t('Begin Original run');$('#tryContrastBtn').hidden=contrast;$('#rulesTitle').textContent=contrast?t('Plan first. Learn at the bell.'):t('Read the schedule. Risk the town.');$('#rulesText').textContent=contrast?t('Use the people × phase ledger to make one prediction, then travel. New scenes keep their full context. From loop two, spend 1 Momentum on a familiar route to borrow one extra visit per loop without advancing the clock. Fracture still rises; at 4, midnight wins. A borrowed visit does not resolve or reward the forecast until the next bell. Your choice and prediction stay unresolved until the phase boundary, where consequences arrive as a batch and correct foresight earns Momentum. Place and Theory journal views persist alongside Scars and anchored memories.'):t('Before each bell, declare a prediction about the scheduled event. A correct call earns Momentum; spend 1 Momentum to skip a district scene you mastered in an earlier loop. Every action adds 1 Fracture, while dangerous actions add 2. At 4, catastrophe advances and midnight arrives early. At the Anchor Board, choose one bond and one object to survive the reset. Route, song, lens, and every Scar persist automatically.');renderSchedule();renderJournalViews();renderSquare()}
    function drawPlaces(){
      var box=$('#mapPlaces');box.innerHTML='';
      roster().forEach(function(p){
        var b=document.createElement('button');b.className='place '+p.slot+(state.visited[p.id]?' known':'')+(currentPlace&&currentPlace.id===p.id?' current':'');b.type='button';b.dataset.place=p.id;b.dataset.currentLabel=t('You are here');b.setAttribute('aria-label',t(p.name)+' · '+t(state.visited[p.id]?'visited this loop':'new activity'));b.disabled=state.phase>=3||state.pendingAdvance;
        b.innerHTML='<span class="mark">'+TTB_DATA.icons[p.root]+'<i class="spark"></i></span><b>'+t(p.name)+'</b><small>'+t(sceneFor(p).hint)+'</small>';
        b.addEventListener('click',function(){visit(p)});box.appendChild(b);
      });
    }
    function render(){
      var localeLocked=!!currentPlace||state.pendingAdvance||state.phase===3||$('#winModal').classList.contains('show');
      $$('.locale-choice').forEach(function(el){el.disabled=localeLocked;el.title=t('Language can be changed at the map between visits.')});
      if(state.understood!==null)$('#understandBtn').textContent=t('Clarity marked at {time}',{time:fmt(state.understood)});
      var meta=TTB_DATA.loopMeta[worldIndex()];$('#runLabel').textContent=t('{mode} · Loop {loop} · {phase}',{mode:mode==='contrast'?t('Contrast'):t('Original'),loop:state.loop,phase:phaseName()});$('#mapClockPhase').textContent=t(phaseClock());$('#loopMetric').textContent=state.loop;$('#actionMetric').textContent=state.actions;$('#satchel').textContent=state.satchel.length?state.satchel.map(function(id){return t(itemLabel(id))}).join(TTB_I18N.getLocale()==='en'?', ':'、'):t('Empty');$('#momentum').textContent=state.momentum;
      $('#objectiveTitle').textContent=t(meta.objective);$('#objectiveText').textContent=t(meta.text);$('#sceneText').textContent=t(meta.scene);$('#mapCaption').textContent=t('Loop {loop} · {name}',{loop:state.loop===1?'I':state.loop===2?'II':state.loop===3?'III':'IV+',name:meta.name});
      $$('.phase').forEach(function(el,i){el.classList.toggle('active',i===state.phase);el.classList.toggle('done',i<state.phase)});$$('.fracture-dot').forEach(function(el,i){el.classList.toggle('on',i<state.fracture)});$('#fractureTrack').setAttribute('aria-label',t('Fracture {value} of 4',{value:state.fracture}));drawPlaces();renderPrediction();renderForecastMemory();renderBorrow();animateClock();
      $$('.anchor').forEach(function(el){el.classList.toggle('found',!!state.anchors[el.dataset.anchor])});
      $('#carried').innerHTML=state.carryBond||state.carryObject?(state.carryBond?'<span class="carry-chip">'+t('Bond · {bond}',{bond:bondLabel(state.carryBond)})+'</span>':'')+(state.carryObject?'<span class="carry-chip">'+t('Object · {item}',{item:itemLabel(state.carryObject)})+'</span>':''):t('<span class="empty-note">Nothing chosen yet.</span>');
      $('#scars').innerHTML=state.scars.length?state.scars.map(function(x){return '<span class="scar-chip">'+scarLabel(x)+'</span>'}).join(''):t('<span class="empty-note">The first loop has left no scar.</span>');
      $('#journal').innerHTML=state.journal.length?state.journal.map(function(x){return '<li>'+t(x.message,x.values)+'</li>'}).join(''):t('<li>Your first morning has not happened yet.</li>');renderMode();
    }
    function consequenceLead(root,world){
      var scarLead=state.scars.length?t('The scar of {scar} tightens as you arrive.',{scar:scarLabel(state.scars[state.scars.length-1])})+' ':'';
      if(world===0)return scarLead;var prior=state.flags[root+':'+(world-1)]||'';
      if(!prior)return scarLead+(world===1?t('You never came here in the first loop, yet the wider fracture has remade this district without you. '):t('You left this strand untouched last time; it has now evolved on its own as the final day collapses. '));
      var leads={
        floodedArchive:TTB_ACTIONS.firstConsequence('floodedArchive',prior)?t('Because you followed the hidden voices, Vale is waiting for you. '):t('Your chalk survived the reset and opened a route no door held yesterday. '),
        hospice:TTB_ACTIONS.firstConsequence('hospice',prior)?t('The lullaby you carried has changed who waits in Saint Orra’s ward. '):t('The trail you followed pulled Orrin’s memory back to the hospice. '),
        underbell:TTB_ACTIONS.firstConsequence('underbell',prior)?t('The procession’s route has become a real passage. '):t('The drummer you helped has moved the tower’s entrance. '),
        square:TTB_ACTIONS.firstConsequence('square',prior)?t('Mina recognizes you and has shifted the market onto safer ground. '):t('Inspector Brann has rerouted the stalls to intercept you. '),
        gate:TTB_ACTIONS.firstConsequence('gate',prior)?t('The traveler’s melody has pulled North Gate out of alignment with the road. '):t('The counterweight you moved has turned the gatehouse upside down. '),
        glassworks:TTB_ACTIONS.firstConsequence('glassworks',prior)?t('The ember moth nested here, transforming the workshop overnight. '):t('The pressure you steadied has opened a new furnace room. ')
      };return scarLead+(leads[root]||'');
    }
    function sceneFor(place){
      var base=TTB_DATA.worlds[place.world][place.root];
      if(mode!=='contrast'||place.root!=='square')return base;
      var key=state.squareDay.status;
      if(key==='pending')key=state.squareDay.preparation?'prepared':TTB_SQUARE.eligibility(state).ok?'ready':'pending';
      var scene=TTB_DATA.squareScenes[key];
      return {hint:scene.hint,title:scene.title,weather:scene.weather,text:t(scene.text)+' '+t(TTB_DATA.squareLoopDetails[place.world]),choices:TTB_DATA.squareChoices[place.world]};
    }
    function renderSquare(){
      if(mode!=='contrast')return;
      var day=state.squareDay,provenance=day.resolvedAt,knowledge=provenance?provenance.knowledge:null;
      $('#squareStatus').dataset.status=day.status;
      $('#squareStatusTitle').textContent=t('Bell Square · {status}',{status:knowledge==='witnessed'?t('witnessed at Noon'):knowledge==='reported'?t('town report'):knowledge==='interrupted'?t('Noon interrupted'):t('before Noon')});
      $('#squareStatusText').textContent=day.status==='pending'?(day.preparation?t('Side passage prepared. Mina’s crossing still waits for Noon.'):t('Mina waits with her crate. The market crossing has not happened yet.')):t(TTB_DATA.squareOutcomes[day.status]);
      $('#squareStalls').textContent=day.status==='safe'?t('Auction stalls'):day.status==='interrupted'?t('Crossing interrupted'):t('Mina + crate · auction stalls');
      $('#squareWell').textContent=day.status==='safe'?t('Mina + crate · sheltered market well'):t('Sheltered market well');
      $('#squareStalls').classList.toggle('occupied',day.status!=='safe'&&day.status!=='interrupted');
      $('#squareWell').classList.toggle('occupied',day.status==='safe');
      $('#squareMinaMarker').setAttribute('transform',day.status==='safe'?'translate(346 69)':'translate(72 69)');
      $('#squareMinaMarker').style.opacity=day.status==='interrupted'?'.25':'1';
      $('#squareCrowd').style.opacity=day.status==='blocked'||day.status==='safe'?'1':'.15';
      $('#squareSideRoute').classList.toggle('prepared',!!day.preparation);
      $('#squareClue').dataset.known=state.squareClue?'true':'false';
      $('#squareClue').textContent=state.squareClue?t('Eyewitness clue · Loop {loop} · Noon · Bell Square: you saw the masked crowd close the main alley and strand Mina’s crate. This clue survives midnight.',{loop:state.squareClue.loop}):t('No eyewitness clue about the alley. Town reports and arriving after Noon do not supply one.');
    }
    function choiceData(choice){return TTB_ACTIONS.choice(choice,state.squareDay.status)}
    function visit(place){
      if(!state.started||state.phase>=3||state.pendingAdvance)return;
      borrowRequested=false;currentPlace=place;render();
      var ev=sceneFor(place),square=mode==='contrast'&&place.root==='square',repeated=mode==='contrast'&&!square&&!!state.flags[place.root+':'+place.world],lead=square?'':consequenceLead(place.root,place.world);
      $('#eventIcon').innerHTML=TTB_DATA.icons[place.root];$('#eventWeather').textContent=t(ev.weather);$('#eventLabel').textContent=repeated?t('Compressed return · {place}',{place:place.name}):t('{phase} · {place}',{phase:phaseName(),place:place.name});$('#eventTitle').textContent=repeated?t('Only the change remains'):t(ev.title);$('#eventText').textContent=repeated?lead+t('You remember the opening beats. New this phase: {weather} {hint}. Everything unchanged falls away.',{weather:ev.weather,hint:ev.hint}):lead+(square?ev.text:t(ev.text));$('#result').hidden=true;
      var skip=$('#skipScene');skip.hidden=mode==='contrast'||!(state.momentum>0&&state.mastered[place.root]);skip.dataset.place=place.id;
      var hint=$('#squareActionHint');if(!hint){hint=document.createElement('p');hint.id='squareActionHint';hint.className='square-action-hint';$('#choices').before(hint)}
      hint.hidden=!square;
      var eligibility=square?TTB_SQUARE.eligibility(state):null;
      if(square)hint.textContent=t(TTB_DATA.squareLimits[eligibility.reason]);
      var choices=ev.choices.map(function(c,i){return choiceData(c,i,place)});
      if(square)choices.push(TTB_DATA.squareAction);
      $('#choices').innerHTML='';choices.forEach(function(c){
        var gain=c.fracture,b=document.createElement('button');b.className='choice'+(gain===2?' fracture-warning':'');b.type='button';b.dataset.action=c.id;
        var unlearned=c.id===TTB_SQUARE.ACTION&&!state.squareClue;
        b.innerHTML='<b>'+t(unlearned?'A route not yet learned':c.label)+'<span class="choice-risk">'+t('+{value} Fracture',{value:gain})+'</span></b><small>'+t(unlearned?t('An eyewitness clue can open a different action on a later morning.'):c.description)+'</small>';
        if(c.id===TTB_SQUARE.ACTION){b.disabled=!eligibility.ok;b.setAttribute('aria-describedby','squareActionHint')}
        b.addEventListener('click',function(){resolveChoice(c,place,gain)});$('#choices').appendChild(b)
      });
      modal('#eventModal',true);focusContrast('#eventTitle');setTimeout(function(){$('#eventModal').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'})},30)
    }
    function applyCommitment(commit){
      var delta=TTB_ACTIONS.inventoryDelta(state,commit);
      if(state.bonds.indexOf(delta.bond)<0)state.bonds.push(delta.bond);
      if(delta.anchor)anchor(delta.anchor);if(delta.item)addItem(delta.item);if(delta.keepsake)addItem(delta.keepsake);
      if(delta.scar&&state.scars.indexOf(delta.scar)<0)state.scars.push(delta.scar);
      note('{place}: {result}',{place:commit.place.name,result:commit.result});
    }
    function resolveChoice(choice,place,gain){
      if(!state.started||state.phase>=3||state.pendingAdvance||!currentPlace||currentPlace.id!==place.id)return;
      if(mode==='contrast'&&choice.id===TTB_SQUARE.ACTION&&!TTB_SQUARE.eligibility(state).ok)return;
      if(mode==='contrast'&&borrowRequested&&!TTB_ECHO.canBorrow(state,place.root)){borrowRequested=false;renderBorrow();toast(t('That borrowed minute is unavailable. Choose an ordinary visit.'));return}
      $$('#choices .choice').forEach(function(b){b.disabled=true});$('#skipScene').hidden=true;state.pendingAdvance=true;state.actions++;state.visited[place.id]=true;state.visitCounts[place.root]=(state.visitCounts[place.root]||0)+1;var effect=choice.effect,result=choice.result,commit={id:++state.nextCommitmentId,actionId:choice.id,choice:choice.label,place:place,gain:gain,effect:effect,result:result};if(mode==='contrast'&&borrowRequested&&TTB_ECHO.canBorrow(state,place.root)){state.momentum--;state.echoUsed=true;commit.borrowed=true}borrowRequested=false;state.flags[place.root+':'+worldIndex()]=choice.id;state.mastered[place.root]=true;state.fracture=Math.min(4,state.fracture+gain);
      if(mode==='contrast'){state.pendingCommitment=commit;$('#resultText').innerHTML=t('<b>Commitment recorded.</b>')+(commit.borrowed?t('Your remembered route saves the walk. Resolve this choice; if Fracture stays below 4, the bell waits and your forecast remains locked.'):t('The town withholds its answer until the bell. Prediction, consequence, and Momentum will resolve together at the phase boundary.'))+' <span class="cost-summary">'+t('Fracture {value}/4.',{value:state.fracture})+'</span>';$('#result').hidden=false;$('#continueBtn').textContent=commit.borrowed?t('Resolve your borrowed visit'):state.phase===2?t('Ring the boundary bell'):t('Resolve the phase');$('#continueBtn').dataset.win='no';$('#continueBtn').dataset.catastrophe=state.fracture>=4?'yes':'no';render();focusContrast('#continueBtn');return}
      applyCommitment(commit);$('#resultText').innerHTML='<b>'+t(choice.label)+'</b>'+t(result)+' <span class="cost-summary">'+t('Fracture {value}/4.',{value:state.fracture})+'</span>';$('#result').hidden=false;render();
      if(effect==='final'&&allAnchors()){$('#continueBtn').textContent=t('Release the day');$('#continueBtn').dataset.win='yes';$('#continueBtn').dataset.catastrophe='no'}
      else if(effect==='final'){$('#resultText').innerHTML=t('<b>The stair refuses to settle.</b>You need the hidden route, the bell’s true song, and the ember lens. Explore the changed town; this is a journey still in motion.');$('#continueBtn').textContent=t('Continue exploring');$('#continueBtn').dataset.win='no';$('#continueBtn').dataset.catastrophe='no'}
      else if(state.fracture>=4){$('#resultText').innerHTML+=t('<b style="margin-top:8px">Catastrophe advances.</b>The town reaches midnight early: streets shear apart and the bell strikes before the schedule allows.');$('#continueBtn').textContent=t('Face the early catastrophe');$('#continueBtn').dataset.catastrophe='yes';$('#continueBtn').dataset.win='no'}
      else{$('#continueBtn').textContent=state.phase===2?t('Face the thirteenth bell'):t('Continue the day');$('#continueBtn').dataset.win='no';$('#continueBtn').dataset.catastrophe='no'}
    }
    function skipMastered(){if(state.pendingAdvance||!currentPlace||state.momentum<1||!state.mastered[currentPlace.root])return;state.pendingAdvance=true;state.momentum--;state.actions++;state.visited[currentPlace.id]=true;note('Spent 1 Momentum to skip the mastered {place} scene.',{place:currentPlace.name});$('#resultText').innerHTML=t('<b>Memory outruns repetition.</b>You move through the mastered scene without replaying it. Momentum falls to {value}.',{value:state.momentum});$('#choices').innerHTML='';$('#skipScene').hidden=true;$('#result').hidden=false;$('#continueBtn').textContent=state.phase===2?t('Face the thirteenth bell'):t('Continue the day');$('#continueBtn').dataset.win='no';$('#continueBtn').dataset.catastrophe='no';render()}
    function prepareAnchorBoard(){
      if(state.scars.indexOf('bellmarked')<0)state.scars.push('bellmarked');state.pendingBond='';state.pendingObject='';var bondsNow=state.bonds.length?state.bonds:['town'],objectsNow=state.satchel.length?state.satchel:['blank-token'];
      function fill(selector,items,key){var box=$(selector);box.innerHTML='';items.forEach(function(item){var b=document.createElement('button');b.type='button';b.className='anchor-option';b.textContent=t(key==='pendingBond'?bondLabel(item):itemLabel(item));b.dataset.value=item;b.addEventListener('click',function(){state[key]=item;Array.prototype.forEach.call(box.children,function(x){x.classList.toggle('selected',x===b)});updateWake()});box.appendChild(b)})}
      fill('#bondOptions',bondsNow,'pendingBond');fill('#objectOptions',objectsNow,'pendingObject');updateWake()
    }
    function updateWake(){var ready=state.pendingBond&&state.pendingObject;$('#wakeBtn').disabled=!ready;$('#wakeBtn').textContent=ready?t('Anchor these into tomorrow'):t('Choose a bond and an object')}
    function showReset(){render();if(state.loop===3){$('#resetTitle').textContent=t('The loop closes without you.');$('#resetText').textContent=t('Bellweather freezes between midnight and morning. You reached the final day without anchoring a complete path to the bell. This expedition ends here—but the scars remain visible in this run.');$('#anchorBoard').hidden=true;$('#wakeBtn').disabled=false;$('#wakeBtn').textContent=t('Begin a different path');$('#wakeBtn').dataset.restart='yes'}else{$('#resetTitle').textContent=t('What must tomorrow remember?');$('#resetText').textContent=t('Midnight empties your satchel and loosens every relationship. Choose exactly one bond and one object to carry. Anchored discoveries and Scars persist without permission.');$('#anchorBoard').hidden=false;$('#wakeBtn').dataset.restart='no';prepareAnchorBoard()}modal('#resetModal',true);focusContrast(state.loop===3?'#wakeBtn':'#bondOptions button')}
    function showBatch(){
      if(mode!=='contrast'||!state.pendingAdvance||!state.pendingCommitment||state.pendingBatch)return;
      var commit=state.pendingCommitment,pred=predictionResult(),items=[];
      // Consume the commitment before effects; repeated events cannot settle it twice.
      state.pendingCommitment=null;
      var square=TTB_SQUARE.settle(state,commit),hold=square.hold,catastrophe=square.interrupted;
      state.squareDay=square.day;state.squareClue=square.clue;
      modal('#eventModal',false);currentPlace=null;
      applyCommitment(commit);items.push('<div class="batch-item cost"><b>'+t('{action} · Fracture {value}/4',{action:commit.choice,value:state.fracture})+'</b><span>'+t(commit.result)+'</span></div>');
      if(square.event){var source=square.event.provenance.knowledge;var label=source==='witnessed'?'Witnessed in Bell Square':source==='reported'?'Town report · you were elsewhere':'The crossing was interrupted';var outcome=TTB_DATA.squareOutcomes[square.event.status];items.push('<div class="batch-item square-outcome"><b>'+t(label)+'</b><span>'+t(outcome)+'</span></div>');note('{source} · Loop {loop}: {outcome}',{source:label,loop:state.loop,outcome:outcome})}
      if(hold){items.push(t('<div class="batch-item good"><b>A minute borrowed · 1 Momentum spent</b><span>Your remembered route leaves room for one more visit in this phase. The bell has not rung: your forecast stays locked and unresolved.</span></div>'))}
      else if(!state.resolvedPredictions[predictionKey()]){
        state.resolvedPredictions[predictionKey()]=catastrophe?'interrupted':'resolved';
        if(catastrophe){note('Forecast interrupted in loop {loop} at {phase}: no reward for a skipped bell.',{loop:state.loop,phase:phaseName()});items.push(t('<div class="batch-item"><b>Forecast interrupted · no Momentum earned</b><span>Fracture reached four. Midnight overrides the scheduled bell; its prediction cannot be confirmed.</span></div>'))}
        else{rememberBell(commit);if(pred.picked===undefined){note('Prediction left blank: {reveal}',{reveal:pred.scheduled.reveal});items.push(t('<div class="batch-item"><b>No prediction declared</b><span>{reveal} No Momentum earned.</span></div>',{reveal:pred.scheduled.reveal}))}else if(pred.correct){state.momentum++;note('Prediction fulfilled: {reveal} Momentum +1.',{reveal:pred.scheduled.reveal});items.push(t('<div class="batch-item good"><b>Foresight fulfilled · Momentum +1</b><span>{reveal}</span></div>',{reveal:pred.scheduled.reveal}))}else{note('Prediction missed: {reveal}',{reveal:pred.scheduled.reveal});items.push(t('<div class="batch-item"><b>Prediction disproved</b><span>{reveal} No Momentum is lost.</span></div>',{reveal:pred.scheduled.reveal}))}}
      }
      var winReady=commit.effect==='final'&&allAnchors();
      state.pendingBatch={commitmentId:commit.id,placeId:commit.place.id,hold:hold,winReady:winReady,catastrophe:catastrophe,nextPhase:catastrophe?3:hold?state.phase:state.phase+1};
      $('#batchLabel').textContent=catastrophe?t('Catastrophe · the scheduled bell is interrupted'):hold?t('Borrowed minute · the bell waits'):t('Phase boundary · commitments resolve');
      $('#batchIntro').textContent=catastrophe?t('Fracture reaches four. The day ends before its next scheduled event.'):hold?t('Your action changes the town. Its schedule has not moved yet.'):t('At the bell, prediction and consequence arrive together.');
      $('#batchList').innerHTML=items.join('');$('#batchContinue').textContent=winReady?t('Release the day'):hold?t('Use your extra visit · {phase}',{phase:phaseName()}):(state.phase===2||catastrophe?t('Face the thirteenth bell'):t('Enter {phase}',{phase:[t('Noon'),t('Dusk'),t('Midnight')][state.phase]}));render();modal('#batchModal',true);focusContrast('#batchLabel')
    }
    function finishBatch(){
      var batch=state.pendingBatch;if(mode!=='contrast'||!state.pendingAdvance||!batch)return;
      state.pendingBatch=null;state.pendingAdvance=false;modal('#batchModal',false);
      if(batch.winReady){win();return}state.phase=batch.nextPhase;
      if(state.phase===3)showReset();else{render();focusContrast('[data-place="'+batch.placeId+'"]')}
    }
    function advance(){
      if(!state.pendingAdvance)return;if(mode==='contrast'){showBatch();return}state.pendingAdvance=false;if($('#continueBtn').dataset.win==='yes'){win();return}modal('#eventModal',false);currentPlace=null;resolvePrediction();if($('#continueBtn').dataset.catastrophe==='yes')state.phase=3;else state.phase++;
      if(state.phase===3)showReset();else render()
    }
    function wake(){if(state.phase!==3)return;if($('#wakeBtn').dataset.restart==='yes'){modal('#resetModal',false);begin();return}state.carryBond=state.pendingBond;state.carryObject=state.pendingObject;modal('#resetModal',false);state.loop++;state.phase=0;state.squareDay=TTB_SQUARE.day(state.loop);state.pendingBatch=null;state.pendingCommitment=null;state.echoUsed=false;borrowRequested=false;state.satchel=[state.carryObject];state.bonds=[state.carryBond];state.fracture=0;state.visited={};currentPlace=null;render();focusContrast('#forecastTitle')}
    function win(){modal('#eventModal',false);clearInterval(clockTimer);var elapsed=Date.now()-state.startTime;$('#debrief').innerHTML='<div><strong>'+fmt(elapsed)+'</strong><span>'+t('time to finish')+'</span></div><div><strong>'+state.loop+'</strong><span>'+t('loops lived')+'</span></div><div><strong>'+state.actions+'</strong><span>'+t('adventure visits')+'</span></div><div><strong>'+(state.understood===null?t('Not marked'):fmt(state.understood))+'</strong><span>'+t('rules felt clear')+'</span></div>';modal('#winModal',true);focusContrast('#restartBtn')}
    function begin(){borrowRequested=false;state=fresh();modeStates[mode]=state;currentPlace=null;['#startModal','#winModal','#eventModal','#batchModal','#resetModal'].forEach(function(id){modal(id,false)});$('#understandBtn').disabled=false;$('#understandBtn').textContent=t('I know how to play');clearInterval(clockTimer);clockTimer=setInterval(tick,250);render();tick();focusContrast('#objectiveTitle')}
    function switchMode(next){if(next===mode||state.pendingAdvance)return;borrowRequested=false;modeStates[mode]=state;mode=next;state=modeStates[mode];currentPlace=null;['#eventModal','#batchModal','#resetModal','#winModal','#rulesModal','#startModal'].forEach(function(id){modal(id,false)});render();if(!state.started)modal('#startModal',true);focusContrast(state.started?'#runLabel':'#startBtn');toast(next==='contrast'?t('Contrast version loaded'):t('Original version loaded'))}
    $$('.locale-choice').forEach(function(el){el.addEventListener('change',function(){if(currentPlace||state.pendingAdvance||state.phase===3||$('#winModal').classList.contains('show')){el.value=TTB_I18N.getLocale();return}TTB_I18N.setLocale(el.value);render();toast(t('Language changed. Your journey is unchanged.'))})});
    $('#borrowMinute').addEventListener('click',function(){if(currentPlace&&!state.pendingAdvance&&TTB_ECHO.canBorrow(state,currentPlace.root)){borrowRequested=!borrowRequested;renderBorrow()}});
    $('#tryContrastBtn').addEventListener('click',function(){switchMode('contrast')});
    $('#startBtn').addEventListener('click',begin);$('#continueBtn').addEventListener('click',advance);$('#batchContinue').addEventListener('click',finishBatch);$('#wakeBtn').addEventListener('click',wake);$('#restartBtn').addEventListener('click',begin);$('#skipScene').addEventListener('click',skipMastered);
    $('#originalMode').addEventListener('click',function(){switchMode('original')});$('#contrastMode').addEventListener('click',function(){switchMode('contrast')});$('#placeTab').addEventListener('click',function(){setJournalView('place',true)});$('#theoryTab').addEventListener('click',function(){setJournalView('theory',true)});
    $('#closeEncounter').addEventListener('click',function(){if(state.pendingAdvance)return;var placeId=currentPlace&&currentPlace.id;borrowRequested=false;currentPlace=null;modal('#eventModal',false);render();if(placeId)focusContrast('[data-place="'+placeId+'"]')});
    document.addEventListener('keydown',function(event){var dialog=$$('.event.show').pop();if(!dialog)return;if(event.key==='Escape'&&dialog.id==='rulesModal'){modal('#rulesModal',false);$('#rulesBtn').focus();return}if(event.key!=='Tab')return;var focusable=Array.prototype.filter.call(dialog.querySelectorAll('button:not([disabled]),select:not([disabled]),a[href],[tabindex="0"]'),function(el){return el.getClientRects().length});if(!focusable.length)return;var first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){event.preventDefault();last.focus()}else if(!event.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){event.preventDefault();first.focus()}});
    $('#rulesBtn').addEventListener('click',function(){modal('#rulesModal',true);$('#closeRules').focus()});$('#closeRules').addEventListener('click',function(){modal('#rulesModal',false);$('#rulesBtn').focus()});
    $('#understandBtn').addEventListener('click',function(){if(state&&state.understood===null){state.understood=Date.now()-state.startTime;this.textContent=t('Clarity marked at {time}',{time:fmt(state.understood)});this.disabled=true;toast(t('Learning time recorded'))}});
    modeStates.original=fresh();modeStates.original.started=false;modeStates.original.startTime=0;modeStates.contrast=fresh();modeStates.contrast.started=false;modeStates.contrast.startTime=0;state=modeStates.original;render();
  })();
