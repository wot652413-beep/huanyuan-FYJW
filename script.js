const historyItems = [
  {date:'2024.12',kicker:'初心萌芽',title:'星火启程，项目正式启动',description:'法律实务专家与人工智能团队汇聚，以“让智慧回归法律本身”为共同愿景，启动法义经纬项目。'},
  {date:'2025.02',kicker:'技术筑基',title:'法律知识图谱架构成型',description:'完成核心技术路线验证，构建法律知识、案件材料与推理任务之间的结构化连接。'},
  {date:'2025.05',kicker:'产品破晓',title:'首个端到端智能工作流上线',description:'从材料梳理、争点识别到文书生成，法律实务第一次拥有可持续协作的智能工作流。'},
  {date:'2025.08',kicker:'生态共创',title:'“律动无界”AI元年计划发布',description:'携手法律机构与产业伙伴，在滴水湖法律科技大会共同开启法律AI应用新阶段。'},
  {date:'2025.10',kicker:'场景扩展',title:'多智能体协作体系完成升级',description:'将检索、分析、策略与写作智能体编织为协同网络，覆盖更多复杂法律任务。'},
  {date:'2025.11',kicker:'规模落地',title:'专业工作流进入机构实践',description:'面向团队协作持续优化知识复用、任务交接与成果沉淀，让AI真正融入日常作业。'},
  {date:'2025.12',kicker:'智启未来',title:'全场景法律智能平台启航',description:'以可信、专业、可协作的法律AI基础设施，持续拓展法律服务的深度与广度。'}
];

const newsItems = [
  {image:'assets/news-1.png',title:'加强知识产权保护力度、安全护航企业“走出去”，管委会领导专题调研临港新片区法律服务机构',date:'2025年5月12日',full:'围绕企业国际化发展中的知识产权保护与法律服务需求，调研团队深入了解法律科技在风险识别、材料处理和专业协同中的应用成果。'},
  {image:'assets/news-2-clean.png',title:'首届滴水湖法律科技大会即将启幕，8月26日临港见！',date:'2025年8月21日',full:'大会汇聚法律实务、人工智能与产业创新力量，共同讨论法律科技的应用边界、可信机制与未来协作方式。'},
  {image:'assets/news-3.png',title:'首届滴水湖法律科技大会暨“律动无界”AI元年计划启动仪式成功举办',date:'2025年8月27日',full:'法义经纬与生态伙伴共同发布“律动无界”计划，推动专业知识、智能技术与真实法律场景形成更紧密的连接。'},
  {image:'assets/news-1.png',title:'法义经纬完成新一轮产品能力升级',date:'2025年12月12日',full:'新版本进一步强化多模态材料理解、案件脉络梳理与专业文书协作能力，为法律团队提供更连贯的端到端体验。'}
];

const features = [
  {title:'端到端工作流',detail:'告别碎片化问答，从材料到文书的一体化工作流。',icon:'assets/workflow-icon-1.png',image:'assets/workflow-bg-1.png'},
  {title:'案件全景理解',detail:'理解人物、事实、证据与争点，自动形成清晰的案件全景。',icon:'assets/workflow-icon-2.png',image:'assets/workflow-bg-2.png'},
  {title:'多智能体协作',detail:'检索、分析、策略、写作智能体分工协作，复杂任务有序推进。',icon:'assets/workflow-icon-3.png',image:'assets/workflow-bg-3.png'},
  {title:'专业知识增强',detail:'融合知识图谱与权威法律知识，让每一步分析更专业、更可追溯。',icon:'assets/workflow-icon-4.png',image:'assets/workflow-bg-4.png'},
  {title:'人机深度共创',detail:'关键判断始终由法律人掌控，AI在流程中持续提供解释与建议。',icon:'assets/workflow-icon-5.png',image:'assets/workflow-bg-5.png'},
  {title:'组织智慧沉淀',detail:'把团队经验转化为可复用的知识资产，让优秀方法持续流动。',icon:'assets/workflow-icon-6.png',image:'assets/workflow-bg-6.png'}
];

let historyIndex = 3;
const timeline = document.querySelector('#timeline');
timeline.innerHTML = '<span class="timeline-progress"></span>' + historyItems.map((item,index)=>`<button class="timeline-btn" role="tab" aria-selected="false" data-index="${index}" style="--node-index:${index}"><span class="timeline-node" aria-hidden="true"></span><span class="timeline-date">${item.date}</span><span class="timeline-tooltip" role="tooltip">${item.title}</span></button>`).join('');

function updateTimelineStates(animateCurrent=false){
  document.querySelectorAll('.timeline-btn').forEach((button,i)=>{
    button.classList.toggle('completed',i<historyIndex);
    button.classList.toggle('active',i===historyIndex);
    button.classList.toggle('upcoming',i>historyIndex);
    button.classList.toggle('just-activated',animateCurrent&&i===historyIndex);
    button.setAttribute('aria-selected',i===historyIndex);
  });
  const progress=historyIndex/(historyItems.length-1);
  timeline.style.setProperty('--timeline-progress',progress);
  document.querySelector('.timeline-progress').style.width=`calc((100% - 90px) * ${progress})`;
  if(animateCurrent)window.setTimeout(()=>document.querySelector('.timeline-btn.just-activated')?.classList.remove('just-activated'),900);
}

function setHistory(index,direction){
  const previousIndex=historyIndex;
  const nextIndex=(index+historyItems.length)%historyItems.length;
  const motionDirection=direction||(nextIndex>=previousIndex?'forward':'backward');
  const box=document.querySelector('.history-content');
  box.classList.remove('enter-forward','enter-backward');
  box.classList.add('switching',motionDirection==='forward'?'exit-forward':'exit-backward');
  window.setTimeout(()=>{
    historyIndex=nextIndex;
    const item=historyItems[historyIndex];
    document.querySelector('#historyKicker').textContent=item.kicker;
    document.querySelector('#historyTitle').textContent=item.title;
    document.querySelector('#historyDescription').textContent=item.description;
    updateTimelineStates(true);
    box.classList.remove('switching','exit-forward','exit-backward');
    box.classList.add(motionDirection==='forward'?'enter-forward':'enter-backward');
    requestAnimationFrame(()=>requestAnimationFrame(()=>box.classList.remove('enter-forward','enter-backward')));
  },220);
}
timeline.addEventListener('click',event=>{const button=event.target.closest('.timeline-btn');if(button)setHistory(Number(button.dataset.index))});
document.querySelector('.history-arrow.prev').addEventListener('click',()=>setHistory(historyIndex-1,'backward'));
document.querySelector('.history-arrow.next').addEventListener('click',()=>setHistory(historyIndex+1,'forward'));
const historySection=document.querySelector('.history');
let historyTimer=null;
let historyInView=false;
function stopHistoryRotation(){
  window.clearInterval(historyTimer);
  historyTimer=null;
}
function startHistoryRotation(){
  stopHistoryRotation();
  historyTimer=window.setInterval(()=>setHistory(historyIndex+1,'forward'),2500);
}
function syncHistoryRotation(){
  if(historyInView&&!document.hidden)startHistoryRotation();
  else stopHistoryRotation();
}
const historyRotationObserver=new IntersectionObserver(([entry])=>{
  historyInView=entry.isIntersecting;
  syncHistoryRotation();
},{threshold:.55});
historyRotationObserver.observe(historySection);
document.addEventListener('visibilitychange',syncHistoryRotation);

const initialHistory=historyItems[historyIndex];
document.querySelector('#historyKicker').textContent=initialHistory.kicker;
document.querySelector('#historyTitle').textContent=initialHistory.title;
document.querySelector('#historyDescription').textContent=initialHistory.description;
updateTimelineStates(false);
timeline.classList.add('timeline-pending');
const timelineObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  timeline.classList.remove('timeline-pending');
  timeline.classList.add('timeline-animated');
  const progress=document.querySelector('.timeline-progress');
  const targetWidth=progress.style.width;
  progress.style.width='0px';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{progress.style.width=targetWidth}));
  timelineObserver.disconnect();
}),{threshold:.35});
timelineObserver.observe(historySection);

function newsCard(item){return `<article class="news-card"><img class="news-image" src="${item.image}" alt="${item.title}"><div class="news-body"><h3>${item.title}</h3><div class="news-meta"><span>⌖ 中国，上海</span><span>◷ ${item.date}</span></div></div><div class="news-full"><h3>${item.title}</h3><p>${item.full}</p><small>中国，上海 · ${item.date}</small></div></article>`}
document.querySelector('#newsTrack').innerHTML=[...newsItems,...newsItems].map(newsCard).join('');

const featureDeck=document.querySelector('#featureDeck');
featureDeck.innerHTML=features.map((item,index)=>`<article class="feature-card" tabindex="0" data-index="${index}"><img class="feature-photo" src="${item.image}" alt=""><div class="feature-content"><img src="${item.icon}" alt=""><div class="feature-title-wrap"><h3>${item.title}</h3></div><span class="feature-line"></span><p>${item.detail}</p></div><span class="feature-num">0${index+1}</span></article>`).join('');
function activateFeature(card){document.querySelectorAll('.feature-card').forEach(item=>item.classList.toggle('active',item===card))}
featureDeck.addEventListener('mouseover',event=>{const card=event.target.closest('.feature-card');if(card)activateFeature(card)});
featureDeck.addEventListener('mouseleave',()=>activateFeature(null));

const legalScenesSection=document.querySelector('.legal-scenes');
const sceneItems=[...document.querySelectorAll('.scene-item')];
const sceneSymbols=[...document.querySelectorAll('[data-scene-symbol]')];
let activeScene=0;
let sceneTimer=null;

function setActiveScene(index){
  activeScene=(index+sceneItems.length)%sceneItems.length;
  sceneItems.forEach((item,itemIndex)=>{
    const isActive=itemIndex===activeScene;
    item.classList.toggle('active',isActive);
    item.setAttribute('aria-selected',String(isActive));
  });
  sceneSymbols.forEach((symbol,symbolIndex)=>{
    const isActive=symbolIndex===activeScene;
    symbol.classList.remove('active');
    if(isActive)requestAnimationFrame(()=>symbol.classList.add('active'));
  });
}

function startSceneRotation(){
  window.clearInterval(sceneTimer);
  sceneTimer=window.setInterval(()=>setActiveScene(activeScene+1),3200);
}

sceneItems.forEach((item,index)=>{
  item.addEventListener('mouseenter',()=>setActiveScene(index));
  item.addEventListener('focus',()=>setActiveScene(index));
  item.addEventListener('click',()=>{setActiveScene(index);startSceneRotation()});
});

const sceneObserver=new IntersectionObserver(([entry])=>{
  if(entry.isIntersecting)startSceneRotation();
  else window.clearInterval(sceneTimer);
},{threshold:.35});
sceneObserver.observe(legalScenesSection);
setActiveScene(0);

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));

const topbar=document.querySelector('.topbar');
function updateTopbar(){topbar.classList.toggle('scrolled',window.scrollY>24)}
updateTopbar();
window.addEventListener('scroll',updateTopbar,{passive:true});

const advantagesSection=document.querySelector('.advantages');
const advantagesStage=advantagesSection?.querySelector('.advantages-stage');
const advantagesTrack=advantagesSection?.querySelector('.advantages-track');
const advantageCards=advantagesSection?[...advantagesSection.querySelectorAll('.advantage-card')]:[];
const advantageLoopClone=advantageCards[0]?.cloneNode(true);
const advantageLoopNextClone=advantageCards[1]?.cloneNode(true);
const advantageLoopLastClone=advantageCards.at(-1)?.cloneNode(true);
let advantageIndex=0;
let advantageLooping=false;
let advantageAutoplayTimer=null;
let advantageIsVisible=false;

if(advantageLoopClone&&advantagesTrack){
  advantageLoopClone.classList.add('is-clone');
  advantageLoopClone.setAttribute('aria-hidden','true');
  advantageLoopClone.removeAttribute('aria-current');
  advantagesTrack.appendChild(advantageLoopClone);
}
if(advantageLoopNextClone&&advantagesTrack){
  advantageLoopNextClone.classList.add('is-clone');
  advantageLoopNextClone.setAttribute('aria-hidden','true');
  advantageLoopNextClone.removeAttribute('aria-current');
  advantagesTrack.appendChild(advantageLoopNextClone);
}
if(advantageLoopLastClone&&advantagesTrack){
  advantageLoopLastClone.classList.add('is-clone');
  advantageLoopLastClone.setAttribute('aria-hidden','true');
  advantageLoopLastClone.removeAttribute('aria-current');
  advantagesTrack.insertBefore(advantageLoopLastClone,advantagesTrack.firstChild);
}

function positionAdvantageTrack(targetCard=advantageCards[advantageIndex]){
  if(!advantagesStage||!advantagesTrack||window.innerWidth<=900)return;
  if(!targetCard)return;
  const activeCenter=targetCard.offsetLeft+targetCard.offsetWidth/2;
  advantagesTrack.style.transform=`translate3d(${-activeCenter}px,-50%,0)`;
}

function setAdvantage(index){
  if(!advantageCards.length||advantageLooping)return;
  advantageIndex=Math.max(0,Math.min(index,advantageCards.length-1));
  advantagesSection.dataset.step=String(advantageIndex);
  advantageCards.forEach((card,cardIndex)=>{
    card.classList.toggle('is-active',cardIndex===advantageIndex);
    card.classList.toggle('is-past',cardIndex===advantageIndex-1);
    card.classList.toggle('is-next',cardIndex===advantageIndex+1);
    card.setAttribute('aria-current',cardIndex===advantageIndex?'step':'false');
  });
  if(advantageLoopClone){
    advantageLoopClone.classList.remove('is-active','is-past');
    advantageLoopClone.classList.toggle('is-next',advantageIndex===advantageCards.length-1);
  }
  advantageLoopNextClone?.classList.remove('is-active','is-past','is-next');
  if(advantageLoopLastClone){
    advantageLoopLastClone.classList.remove('is-active','is-next');
    advantageLoopLastClone.classList.toggle('is-past',advantageIndex===0);
  }
  requestAnimationFrame(()=>positionAdvantageTrack());
}

function loopAdvantageToStart(){
  if(!advantageLoopClone||!advantagesTrack)return setAdvantage(0);
  advantageLooping=true;
  advantageCards.forEach((card,cardIndex)=>{
    card.classList.remove('is-active','is-next');
    card.classList.toggle('is-past',cardIndex===advantageCards.length-1);
    card.setAttribute('aria-current','false');
  });
  advantageLoopClone.classList.remove('is-next','is-past');
  advantageLoopClone.classList.add('is-active');
  advantageLoopNextClone?.classList.add('is-next');
  advantageLoopLastClone?.classList.remove('is-active','is-past','is-next');
  requestAnimationFrame(()=>positionAdvantageTrack(advantageLoopClone));
  window.setTimeout(()=>{
    advantagesTrack.classList.add('is-resetting');
    advantagesTrack.style.transition='none';
    advantageIndex=0;
    advantageLoopClone.classList.remove('is-active','is-past','is-next');
    advantageLoopNextClone?.classList.remove('is-active','is-past','is-next');
    advantageLoopLastClone?.classList.add('is-past');
    advantageCards.forEach((card,cardIndex)=>{
      card.classList.toggle('is-active',cardIndex===0);
      card.classList.remove('is-past');
      card.classList.toggle('is-next',cardIndex===1);
      card.setAttribute('aria-current',cardIndex===0?'step':'false');
    });
    advantagesSection.dataset.step='0';
    positionAdvantageTrack(advantageCards[0]);
    void advantagesTrack.offsetWidth;
    advantagesTrack.style.transition='';
    advantagesTrack.classList.remove('is-resetting');
    advantageLooping=false;
  },900);
}

function loopAdvantageToEnd(){
  if(!advantageLoopLastClone||!advantagesTrack)return setAdvantage(advantageCards.length-1);
  advantageLooping=true;
  advantageCards.forEach((card,cardIndex)=>{
    card.classList.remove('is-active','is-past');
    card.classList.toggle('is-next',cardIndex===0);
    card.setAttribute('aria-current','false');
  });
  advantageLoopLastClone.classList.remove('is-past','is-next');
  advantageLoopLastClone.classList.add('is-active');
  advantageLoopClone?.classList.remove('is-active','is-past','is-next');
  advantageLoopNextClone?.classList.remove('is-active','is-past','is-next');
  requestAnimationFrame(()=>positionAdvantageTrack(advantageLoopLastClone));
  window.setTimeout(()=>{
    advantagesTrack.classList.add('is-resetting');
    advantagesTrack.style.transition='none';
    advantageIndex=advantageCards.length-1;
    advantageLoopLastClone.classList.remove('is-active','is-past','is-next');
    advantageCards.forEach((card,cardIndex)=>{
      card.classList.toggle('is-active',cardIndex===advantageIndex);
      card.classList.toggle('is-past',cardIndex===advantageIndex-1);
      card.classList.remove('is-next');
      card.setAttribute('aria-current',cardIndex===advantageIndex?'step':'false');
    });
    advantageLoopClone?.classList.add('is-next');
    advantagesSection.dataset.step=String(advantageIndex);
    positionAdvantageTrack(advantageCards[advantageIndex]);
    void advantagesTrack.offsetWidth;
    advantagesTrack.style.transition='';
    advantagesTrack.classList.remove('is-resetting');
    advantageLooping=false;
  },900);
}

function advanceAdvantage(){
  if(advantageLooping||!advantageCards.length)return;
  if(advantageIndex===advantageCards.length-1){
    loopAdvantageToStart();
  }else{
    setAdvantage(advantageIndex+1);
  }
}

function startAdvantageAutoplay(){
  window.clearInterval(advantageAutoplayTimer);
  if(!advantageIsVisible||document.hidden||window.innerWidth<=900)return;
  advantageAutoplayTimer=window.setInterval(advanceAdvantage,4000);
}

function stopAdvantageAutoplay(){
  window.clearInterval(advantageAutoplayTimer);
  advantageAutoplayTimer=null;
}

advantagesTrack?.addEventListener('click',event=>{
  const card=event.target.closest('.advantage-card');
  if(!card||!advantagesTrack.contains(card)||advantageLooping)return;
  const index=Number(card.dataset.advantage);
  if(!Number.isInteger(index))return;
  if(card===advantageLoopClone&&advantageIndex===advantageCards.length-1){
    loopAdvantageToStart();
  }else if(card===advantageLoopLastClone&&advantageIndex===0){
    loopAdvantageToEnd();
  }else{
    setAdvantage(index);
  }
  startAdvantageAutoplay();
});
window.addEventListener('resize',()=>{
  positionAdvantageTrack();
  startAdvantageAutoplay();
},{passive:true});
document.addEventListener('visibilitychange',()=>document.hidden?stopAdvantageAutoplay():startAdvantageAutoplay());
if(advantagesSection){
  const advantageVisibilityObserver=new IntersectionObserver(([entry])=>{
    advantageIsVisible=entry.isIntersecting;
    if(advantageIsVisible)startAdvantageAutoplay();
    else stopAdvantageAutoplay();
  },{threshold:.45});
  advantageVisibilityObserver.observe(advantagesSection);
}
setAdvantage(0);
positionAdvantageTrack();
