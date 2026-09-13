(()=>{
  const v=new URLSearchParams(location.search).get('v')||'admin1';
  if(!/^admin[1-5]$/.test(v))return;
  document.documentElement.dataset.variant=v;

  const $=s=>document.querySelector(s);
  const proxy=(sourceId,type='input')=>{
    const src=$('#'+sourceId); if(!src)return null;
    const el=type==='select'?document.createElement('select'):document.createElement('input');
    if(type==='input'){el.type='search';el.placeholder=src.placeholder||'Buscar becas…';el.value=src.value}
    else el.innerHTML=src.innerHTML;
    el.className='variant-proxy';
    el.addEventListener(type==='select'?'change':'input',()=>{src.value=el.value;src.dispatchEvent(new Event('input',{bubbles:true}))});
    return el;
  };

  function admin3(){
    const main=$('main'),experience=$('.experience');
    const hero=document.createElement('section'); hero.className='v3-hero';
    hero.innerHTML=`<div class="v3-copy"><span>◎ Educación sin fronteras</span><h1>Tu próximo destino<br>está <em>más cerca.</em></h1><p>Becas 100% financiadas para chilenos y latinoamericanos.</p><div class="v3-stats"><b>100%<small>financiadas</small></b><b>LatAm<small>elegibles</small></b><b>Diaria<small>actualización</small></b></div></div><div class="v3-collage"><article class="jp"><i>🇯🇵</i><b>Japón</b></article><article class="uk"><i>🇬🇧</i><b>Reino Unido</b></article><article class="es"><i>🇪🇸</i><b>España</b></article><small>Aprende · Explora · Crece</small></div>`;
    const bar=document.createElement('div');bar.className='v3-filterbar';
    const search=proxy('searchInput');const country=proxy('countryFilter','select'),lang=proxy('languageFilter','select'),level=proxy('levelFilter','select');
    [search,country,lang,level].forEach(x=>x&&bar.appendChild(x));
    const go=document.createElement('button');go.textContent='→';go.onclick=()=>$('#applyFilters')?.click();bar.appendChild(go);
    hero.appendChild(bar);main.insertBefore(hero,experience);
  }

  function admin4(){
    const rail=document.createElement('aside');rail.className='v4-rail';
    rail.innerHTML=`<a class="v4-brand" href="#mapa"><span>B</span><b>Becas100</b></a><nav><a href="#mapa">⌕ <b>Explorar</b></a><a class="active" href="#mapa">◫ <b>Mapa</b></a><a href="#becas">▣ <b>Becas</b></a><a href="#destinos">♙ <b>Para ti</b></a><a href="#criterio">▤ <b>Recursos</b></a></nav><div class="v4-promo"><strong>Educación para un mundo sin fronteras.</strong><p><b>100% financiadas</b><br>Para chilenos y latinoamericanos.</p><div>🌎</div></div>`;
    document.body.appendChild(rail);
  }

  function admin5(){
    const p=$('.explorer-panel');if(!p)return;
    const h=p.querySelector('h1');if(h)h.innerHTML='El mundo<br>también es <span>tuyo.</span>';
    const lead=p.querySelector(':scope > p');if(lead)lead.textContent='Becas 100% financiadas para chilenos y latinoamericanos.';
    const eyebrow=p.querySelector('.eyebrow');if(eyebrow)eyebrow.textContent='01. Explora';
    const quote=p.querySelector('blockquote');if(quote)quote.innerHTML='“Más oportunidades.<br><b>Un futuro sin fronteras.</b>”';
  }

  document.addEventListener('DOMContentLoaded',()=>{
    document.body.classList.add(`variant-${v}`);if(v!=='admin1')document.body.classList.add('variant-white');
    if(v==='admin3')admin3();if(v==='admin4')admin4();if(v==='admin5')admin5();
  });
})();