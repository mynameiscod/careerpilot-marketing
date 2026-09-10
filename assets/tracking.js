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

  // Shared comparison section used across all CareerPilot campaign landing pages.
  const pricingSection = document.querySelector('#pricing');
  if (pricingSection && !document.querySelector('#expectations-gap')) {
    const style = document.createElement('style');
    style.textContent = `
      .expectations-gap{padding:76px 0;background:linear-gradient(180deg,#f8fbff 0%,#eef8fb 100%)}
      .expectations-head{text-align:center;max-width:820px;margin:0 auto 34px}
      .expectations-kicker{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border-radius:999px;background:#e6f5f7;color:#217f90;font-size:12px;font-weight:800;margin-bottom:12px}
      .expectations-head h2{margin:0;color:#051D64;font-size:40px;line-height:1.08;letter-spacing:-1.4px}
      .expectations-head p{margin:13px auto 0;color:#5f6f87;max-width:760px;font-size:16px}
      .expectations-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:stretch}
      .expectations-card{background:#fff;border:1px solid #dfe8f1;border-radius:22px;padding:26px;box-shadow:0 12px 34px rgba(5,29,100,.07)}
      .expectations-card.company{border-top:4px solid #359AAD}.expectations-card.student{border-top:4px solid #051D64}
      .expectations-card h3{margin:0 0 6px;color:#051D64;font-size:22px}.expectations-card>p{margin:0 0 20px;color:#68758b;font-size:14px}
      .expect-row{display:grid;grid-template-columns:42px 1fr;gap:12px;align-items:start;padding:13px 0;border-bottom:1px solid #edf1f5}.expect-row:last-child{border-bottom:0}
      .expect-icon{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:#e8f6f8;color:#359AAD;font-size:17px}.student .expect-icon{background:#edf2ff;color:#051D64}
      .expect-row b{display:block;color:#10234d;font-size:14px}.expect-row span{display:block;margin-top:3px;color:#6b778c;font-size:12px;line-height:1.45}
      .gap-bridge{margin-top:22px;background:linear-gradient(120deg,#051D64,#0d4b9c);border-radius:22px;padding:26px;color:#fff;display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}
      .gap-bridge h3{margin:0 0 6px;font-size:24px}.gap-bridge p{margin:0;color:#dce8ff;max-width:760px}.gap-bridge .btn{white-space:nowrap;background:#fff;color:#051D64;border-color:#fff}
      @media(max-width:800px){.expectations-grid{grid-template-columns:1fr}.gap-bridge{grid-template-columns:1fr}.expectations-head h2{font-size:32px}.expectations-gap{padding:58px 0}}
    `;
    document.head.appendChild(style);

    const section = document.createElement('section');
    section.id = 'expectations-gap';
    section.className = 'expectations-gap';
    section.innerHTML = `
      <div class="container">
        <div class="expectations-head">
          <span class="expectations-kicker"><i class="bi bi-buildings"></i> Industry expectations vs student readiness</span>
          <h2>What Companies Expect — And Where Students Often Stand Today</h2>
          <p>CareerPilot helps make the gap visible early, then turns it into a clear plan for learning, practice and career readiness.</p>
        </div>
        <div class="expectations-grid">
          <div class="expectations-card company">
            <h3>What Companies Expect</h3>
            <p>Hiring teams typically look beyond marks and certificates.</p>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-lightbulb"></i></div><div><b>Problem Solving & Logical Thinking</b><span>Ability to break down problems and arrive at practical solutions.</span></div></div>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-code-slash"></i></div><div><b>Strong Technical Fundamentals</b><span>Clear understanding of core concepts, not only memorized answers.</span></div></div>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-kanban"></i></div><div><b>Projects & Practical Application</b><span>Evidence that you can apply concepts to real tasks and projects.</span></div></div>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-chat-dots"></i></div><div><b>Communication & Explanation</b><span>Ability to explain your thinking, work and decisions with confidence.</span></div></div>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-person-check"></i></div><div><b>Interview & Professional Readiness</b><span>Resume, profile, aptitude and interview performance that reflect your skills.</span></div></div>
          </div>
          <div class="expectations-card student">
            <h3>Where Students Often Stand Today</h3>
            <p>Many students discover these gaps only when internships or placements begin.</p>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-journal-text"></i></div><div><b>Academic Knowledge, Limited Practice</b><span>Concepts may be familiar, but application and repetition can be inconsistent.</span></div></div>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-signpost-split"></i></div><div><b>No Clear Learning Priority</b><span>Too many resources, but uncertainty about what to learn next.</span></div></div>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-code-square"></i></div><div><b>Uneven Problem-Solving Exposure</b><span>Practice may not be structured by skill level, topic or career goal.</span></div></div>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-mic"></i></div><div><b>Low Interview Confidence</b><span>Students may know the answer but struggle to communicate it clearly.</span></div></div>
            <div class="expect-row"><div class="expect-icon"><i class="bi bi-graph-up-arrow"></i></div><div><b>No Measurable Readiness View</b><span>It can be difficult to know whether preparation is actually improving employability.</span></div></div>
          </div>
        </div>
        <div class="gap-bridge">
          <div><h3>CareerPilot Bridges the Gap.</h3><p>Assess your current readiness, identify what is missing, get a personalized roadmap, practice consistently and track your progress toward career readiness.</p></div>
          <a class="btn" data-track="readiness" data-location="expectations-gap" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">Check Where I Stand <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>`;
    pricingSection.parentNode.insertBefore(section, pricingSection);
  }

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
