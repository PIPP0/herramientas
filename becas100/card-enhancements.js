(()=>{
  const flags={
    'Chile':'🇨🇱','España':'🇪🇸','Reino Unido':'🇬🇧','Japón':'🇯🇵','China':'🇨🇳','Corea del Sur':'🇰🇷','Turquía':'🇹🇷','Singapur':'🇸🇬','Australia':'🇦🇺','Estados Unidos':'🇺🇸','Canadá':'🇨🇦','Alemania':'🇩🇪','México':'🇲🇽','Colombia':'🇨🇴','Argentina':'🇦🇷','Perú':'🇵🇪','Francia':'🇫🇷','Italia':'🇮🇹'
  };
  const languageWords=['Español','Inglés','Japonés','Coreano','Chino','Turco','Francés','Alemán','Portugués','Italiano'];

  function enhanceCard(card){
    const meta=card.querySelector('.meta');
    if(!meta)return;
    const spans=[...meta.querySelectorAll(':scope > span')];
    if(!spans.length)return;

    const country=spans[0];
    const rawCountry=country.dataset.rawCountry||country.textContent.trim();
    country.dataset.rawCountry=rawCountry;
    country.classList.add('country-chip');
    const flag=flags[rawCountry]||'🌍';
    country.textContent=`${flag} ${rawCountry}`;

    spans.slice(1).forEach(span=>{
      const raw=span.dataset.rawValue||span.textContent.trim();
      span.dataset.rawValue=raw;
      if(languageWords.some(lang=>raw.includes(lang))){
        span.classList.add('language-chip');
        span.textContent=`Idioma · ${raw}`;
      }
    });
  }

  function enhancePanel(item){
    const spans=[...item.querySelectorAll('.panel-meta > span')];
    spans.forEach(span=>{
      const raw=span.dataset.rawValue||span.textContent.trim();
      span.dataset.rawValue=raw;
      if(languageWords.some(lang=>raw.includes(lang))){
        span.classList.add('panel-language-chip');
        span.textContent=`🌐 Idioma · ${raw}`;
      }
    });
  }

  function enhanceAll(root=document){
    root.querySelectorAll?.('.card').forEach(enhanceCard);
    root.querySelectorAll?.('.scholarship-detail').forEach(enhancePanel);
  }

  let scheduled=false;
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;enhanceAll();});
  };

  enhanceAll();
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
})();
