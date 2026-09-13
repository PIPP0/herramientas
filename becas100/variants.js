(()=>{
  const requested=new URLSearchParams(location.search).get('v')||'admin1';
  const v=/^admin[1-3]$/.test(requested)?requested:'admin1';
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
    if(!main||!experience)return;
    const hero=document.createElement('section'); hero.className='v3-hero';
    hero.innerHTML=`<div class="v3-copy"><span>◎ EDUCACIÓN SIN FRONTERAS</span><h1>Tu próximo destino<br>está <em>más cerca.</em></h1><p>Becas 100% financiadas para chilenos y latinoamericanos.</p><div class="v3-stats"><b><strong id="v3Scholarships">—</strong><small>Becas disponibles</small></b><b><strong id="v3Countries">—</strong><small>Países</small></b><b><strong>100%</strong><small>Para LatAm</small></b></div></div><div class="v3-collage"><article class="photo jp"><span>🇯🇵</span></article><article class="photo uk"><span>🇬🇧</span></article><article class="photo es"><span>🇪🇸</span></article><small>Aprende<br>Explora<br>Crece</small><i class="v3-line"></i></div>`;
    const bar=document.createElement('div');bar.className='v3-filterbar';
    const search=proxy('searchInput');const country=proxy('countryFilter','select'),lang=proxy('languageFilter','select'),level=proxy('levelFilter','select');
    if(country)country.setAttribute('aria-label','País');if(lang)lang.setAttribute('aria-label','Idioma');if(level)level.setAttribute('aria-label','Nivel');
    [search,country,lang,level].forEach(x=>x&&bar.appendChild(x));
    const go=document.createElement('button');go.textContent='→';go.setAttribute('aria-label','Aplicar filtros');go.onclick=()=>$('#applyFilters')?.click();bar.appendChild(go);
    hero.appendChild(bar);main.insertBefore(hero,experience);

    const syncStats=()=>{const a=$('#footerVerified')?.textContent,b=$('#footerCountries')?.textContent;if(a&&a!=='—'&&$('#v3Scholarships'))$('#v3Scholarships').textContent=a;if(b&&b!=='—'&&$('#v3Countries'))$('#v3Countries').textContent=b};
    new MutationObserver(syncStats).observe(document.body,{subtree:true,childList:true,characterData:true});syncStats();

    const photos={
      'España':'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80',
      'Chile':'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=900&q=80',
      'Reino Unido':'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80',
      'Japón':'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80',
      'Corea del Sur':'https://images.unsplash.com/photo-1538485399081-7c8971d6dcaf?auto=format&fit=crop&w=900&q=80',
      'China':'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80',
      'Turquía':'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80',
      'Singapur':'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80'
    };
    const panelCountry=$('#panelCountry');
    const updateCover=()=>{const name=panelCountry?.textContent?.trim(),cover=$('#countryCover');if(cover&&photos[name])cover.style.backgroundImage=`linear-gradient(0deg,rgba(6,22,42,.54),rgba(6,22,42,.02)),url("${photos[name]}")`};
    if(panelCountry)new MutationObserver(updateCover).observe(panelCountry,{childList:true,characterData:true,subtree:true});updateCover();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    document.body.classList.add(`variant-${v}`);if(v!=='admin1')document.body.classList.add('variant-white');
    if(v==='admin3')admin3();
  });
})();