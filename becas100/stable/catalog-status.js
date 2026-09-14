(()=>{
const STATUS={
'Especialización en IA Avanzada para Roles Emergentes':{type:'active',label:'Activa hasta',date:'20 sep 2026'},
'Inteligencia Artificial Generativa Aplicada a la Educación':{type:'expired',label:'Expiró',date:'1 abr 2026'},
'Máster en Ciencia de Datos e Inteligencia Artificial':{type:'expired',label:'Expiró',date:'2 mar 2026'},
'Máster Universitario en Computación y Sistemas Inteligentes':{type:'expired',label:'Expiró',date:'2 mar 2026'},
'Transformación Digital con IA y Automatización':{type:'active',label:'Activa',date:'Sin fecha de cierre informada'},
'Chevening Scholarship 2027–2028':{type:'active',label:'Activa hasta',date:'6 oct 2026'},
'Becas Monbukagakusho (MEXT)':{type:'upcoming',label:'Se activa en',date:'abril 2027'},
'Global Korea Scholarship – Graduate (GKS-G)':{type:'expired',label:'Expiró',date:'25 feb 2026'},
'Beca del Gobierno Chino – Programa Bilateral':{type:'expired',label:'Expiró',date:'28 feb 2026'},
'Türkiye Scholarships':{type:'expired',label:'Expiró',date:'20 feb 2026'},
'Singapore International Graduate Award (SINGA)':{type:'upcoming',label:'Se activa en',date:'próxima convocatoria 2027'}
};
try{if(typeof META!=='undefined'&&META['Chile']){META['Chile'].img='assets/chile-latest.jpg?v=2';if(typeof render==='function')render()}}catch(e){}
function injectStyle(){if(document.getElementById('catalogStatusStyle'))return;const s=document.createElement('style');s.id='catalogStatusStyle';s.textContent=`.statusMeta{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 11px}.statusTag,.dateTag{display:inline-flex;align-items:center;gap:6px;min-height:28px;padding:5px 9px;border-radius:999px;font-size:11px;font-weight:800;line-height:1}.statusTag:before{content:'';width:7px;height:7px;border-radius:50%;background:currentColor}.statusTag.active{color:#13875c;background:#eafaf3}.statusTag.expired{color:#b42318;background:#fff0ee}.statusTag.upcoming{color:#6d5dfc;background:#f1efff}.dateTag{color:#56677e;background:#f5f8fb}.card.isExpired .apply{background:#eef2f6;color:#667085;box-shadow:none}.card.isExpired{background:#fcfcfd}`;document.head.appendChild(s)}
function decorate(){injectStyle();document.querySelectorAll('.card').forEach(card=>{if(card.querySelector('.statusMeta'))return;const title=card.querySelector('h3')?.textContent?.trim();const st=STATUS[title];if(!st)return;const box=document.createElement('div');box.className='statusMeta';box.innerHTML=`<span class="statusTag ${st.type}">${st.label}</span><span class="dateTag">${st.date}</span>`;const badge=card.querySelector('.badge');if(badge)badge.insertAdjacentElement('afterend',box);else card.prepend(box);if(st.type==='expired')card.classList.add('isExpired')})}
function boot(){decorate();const grid=document.getElementById('grid');if(grid){new MutationObserver(()=>decorate()).observe(grid,{childList:true})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();