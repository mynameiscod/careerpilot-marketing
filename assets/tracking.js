(() => {
  const GA_ID = 'G-Q78DVE5GDZ';
  const PIXEL_ID = '1437911148228299';
  const fireGA = (name, params={}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };
  const fireMeta = (type, name, params={}) => { if (typeof window.fbq === 'function') window.fbq(type, name, params); };
  const page = document.body?.dataset?.page || location.pathname;
  const params = new URLSearchParams(location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k=>{ const v=params.get(k); if(v) sessionStorage.setItem(k,v); });
  const campaign = Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].map(k=>[k,sessionStorage.getItem(k)||'']).filter(([,v])=>v));
  window.cpTrack = (eventName, metaName, extra={}) => {
    const payload = {page, ...campaign, ...extra};
    fireGA(eventName,payload);
    if(metaName) fireMeta(metaName.standard ? 'track' : 'trackCustom', metaName.name, payload);
  };
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-track]'); if(!el) return;
    const kind = el.dataset.track;
    const href = el.getAttribute('href') || '';
    if(kind==='readiness') cpTrack('career_readiness_cta_click',{standard:true,name:'Lead'},{cta_location:el.dataset.location||'unknown',destination:href});
    if(kind==='login') cpTrack('login_click',{standard:false,name:'LoginClick'},{destination:href});
    if(kind==='membership') cpTrack('membership_cta_click',{standard:false,name:'MembershipCTAClick'},{plan:'CareerPilot Annual',value:1999,currency:'INR',destination:href});
  });
  const pricing = document.querySelector('#pricing');
  if(pricing){ let fired=false; const io=new IntersectionObserver(es=>{es.forEach(x=>{if(x.isIntersecting&&!fired){fired=true;cpTrack('pricing_view',{standard:true,name:'ViewContent'},{content_name:'CareerPilot Annual Membership',value:1999,currency:'INR'});io.disconnect();}})},{threshold:.45});io.observe(pricing);}
})();
