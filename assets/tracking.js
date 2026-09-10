(() => {
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

  const pricingSection = document.querySelector('#pricing');
  const offer = pricingSection?.querySelector('.offer');
  if (offer) {
    const ctaByPage = {
      'career-readiness':'Start My Career Journey',
      'start-early':'Start My Career Journey',
      'skill-gap':'Start My Roadmap',
      'placement-ready':'Start My Placement Journey'
    };
    const cta = ctaByPage[page] || 'Start My CareerPilot Journey';
    offer.innerHTML = `
      <div class="cp-price-shell">
        <div class="cp-price-main">
          <div class="cp-price-left">
            <span class="cp-price-chip"><i class="bi bi-lightning-charge-fill"></i> Limited Time Launch Offer</span>
            <h2>Your Career-Ready <span>Future Starts Here.</span></h2>
            <p>Get 12 months of CareerPilot access and build the skills, confidence and profile you need for internships and placements.</p>
            <div class="cp-price-row"><span class="cp-price-old">₹4,999</span><span class="cp-price-off">60% OFF</span></div>
            <div><span class="cp-price-new">₹1,999</span><span class="cp-price-term"> / 12 months</span></div>
            <div class="cp-price-mini">
              <div><i class="bi bi-calendar-check"></i><b>12 Months Access</b><span>Full CareerPilot access</span></div>
              <div><i class="bi bi-infinity"></i><b>Learn Anytime</b><span>At your own pace</span></div>
              <div><i class="bi bi-award"></i><b>Industry Designed</b><span>Career-focused journey</span></div>
            </div>
          </div>
          <div class="cp-price-mid">
            <h3>What's Included in CareerPilot?</h3>
            <p>Everything you need to move from confusion to career readiness — in one guided platform.</p>
            <div class="cp-includes">
              <div class="cp-inc"><div class="cp-inc-icon"><i class="bi bi-clipboard2-data"></i></div><b>Career Readiness Assessment</b><span>Know where you stand</span></div>
              <div class="cp-inc"><div class="cp-inc-icon"><i class="bi bi-map"></i></div><b>Personalized Learning Roadmap</b><span>Clear step-by-step direction</span></div>
              <div class="cp-inc"><div class="cp-inc-icon"><i class="bi bi-code-slash"></i></div><b>DSA, Aptitude & Technical Practice</b><span>Build problem-solving skills</span></div>
              <div class="cp-inc"><div class="cp-inc-icon"><i class="bi bi-play-btn"></i></div><b>Curated Learning Resources</b><span>Videos, notes and practice</span></div>
              <div class="cp-inc"><div class="cp-inc-icon"><i class="bi bi-person-video3"></i></div><b>Mock Interviews</b><span>Practice technical and HR rounds</span></div>
              <div class="cp-inc"><div class="cp-inc-icon"><i class="bi bi-file-earmark-person"></i></div><b>Resume & Career Profile</b><span>Present yourself professionally</span></div>
              <div class="cp-inc"><div class="cp-inc-icon"><i class="bi bi-graph-up-arrow"></i></div><b>Progress Tracking</b><span>See your improvement over time</span></div>
              <div class="cp-inc"><div class="cp-inc-icon"><i class="bi bi-robot"></i></div><b>AI Career Mentor</b><span>Guidance when you need it</span></div>
            </div>
          </div>
          <div class="cp-price-right">
            <div class="cp-price-visual"><i class="bi bi-rocket-takeoff"></i></div>
            <a class="btn btn-teal" data-track="membership" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">${cta} <i class="bi bi-arrow-right"></i></a>
            <div class="cp-trust-row">
              <div><i class="bi bi-credit-card"></i><b>Easy Access</b></div>
              <div><i class="bi bi-headset"></i><b>Guided Support</b></div>
              <div><i class="bi bi-shield-check"></i><b>Career Focused</b></div>
            </div>
            <div class="cp-gift"><i class="bi bi-gift"></i><span>Unlock your potential. Build the skills your future career needs.</span></div>
          </div>
        </div>
        <div class="cp-price-bottom">
          <div><i class="bi bi-mortarboard"></i><span><b>12 Months Access</b><span>Full platform journey</span></span></div>
          <div><i class="bi bi-clock-history"></i><span><b>Learn at Your Pace</b><span>Practice consistently</span></span></div>
          <div><i class="bi bi-people"></i><span><b>Designed by Industry Experts</b><span>Built around career readiness</span></span></div>
          <div><i class="bi bi-bullseye"></i><span><b>Placement Focused</b><span>Skills, profile and interviews</span></span></div>
        </div>
      </div>`;
  }

  if (pricingSection && !document.querySelector('#expectations-gap')) {
    const style = document.createElement('style');
    style.textContent = `.expectations-gap{padding:76px 0;background:linear-gradient(180deg,#f8fbff 0%,#eef8fb 100%)}.expectations-head{text-align:center;max-width:820px;margin:0 auto 34px}.expectations-kicker{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border-radius:999px;background:#e6f5f7;color:#217f90;font-size:12px;font-weight:800;margin-bottom:12px}.expectations-head h2{margin:0;color:#051D64;font-size:40px;line-height:1.08;letter-spacing:-1.4px}.expectations-head p{margin:13px auto 0;color:#5f6f87;max-width:760px;font-size:16px}.expectations-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:stretch}.expectations-card{background:#fff;border:1px solid #dfe8f1;border-radius:22px;padding:26px;box-shadow:0 12px 34px rgba(5,29,100,.07)}.expectations-card.company{border-top:4px solid #359AAD}.expectations-card.student{border-top:4px solid #051D64}.expectations-card h3{margin:0 0 6px;color:#051D64;font-size:22px}.expectations-card>p{margin:0 0 20px;color:#68758b;font-size:14px}.expect-row{display:grid;grid-template-columns:42px 1fr;gap:12px;align-items:start;padding:13px 0;border-bottom:1px solid #edf1f5}.expect-row:last-child{border-bottom:0}.expect-icon{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:#e8f6f8;color:#359AAD;font-size:17px}.student .expect-icon{background:#edf2ff;color:#051D64}.expect-row b{display:block;color:#10234d;font-size:14px}.expect-row span{display:block;margin-top:3px;color:#6b778c;font-size:12px;line-height:1.45}.gap-bridge{margin-top:22px;background:linear-gradient(120deg,#051D64,#0d4b9c);border-radius:22px;padding:26px;color:#fff;display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}.gap-bridge h3{margin:0 0 6px;font-size:24px}.gap-bridge p{margin:0;color:#dce8ff;max-width:760px}.gap-bridge .btn{white-space:nowrap;background:#fff;color:#051D64;border-color:#fff}@media(max-width:800px){.expectations-grid{grid-template-columns:1fr}.gap-bridge{grid-template-columns:1fr}.expectations-head h2{font-size:32px}.expectations-gap{padding:58px 0}}`;
    document.head.appendChild(style);
    const section = document.createElement('section');
    section.id = 'expectations-gap'; section.className = 'expectations-gap';
    section.innerHTML = `<div class="container"><div class="expectations-head"><span class="expectations-kicker"><i class="bi bi-buildings"></i> Industry expectations vs student readiness</span><h2>What Companies Expect — And Where Students Often Stand Today</h2><p>CareerPilot helps make the gap visible early, then turns it into a clear plan for learning, practice and career readiness.</p></div><div class="expectations-grid"><div class="expectations-card company"><h3>What Companies Expect</h3><p>Hiring teams typically look beyond marks and certificates.</p><div class="expect-row"><div class="expect-icon"><i class="bi bi-lightbulb"></i></div><div><b>Problem Solving & Logical Thinking</b><span>Break down problems and arrive at practical solutions.</span></div></div><div class="expect-row"><div class="expect-icon"><i class="bi bi-code-slash"></i></div><div><b>Strong Technical Fundamentals</b><span>Understand core concepts beyond memorized answers.</span></div></div><div class="expect-row"><div class="expect-icon"><i class="bi bi-kanban"></i></div><div><b>Projects & Practical Application</b><span>Apply concepts through real tasks and projects.</span></div></div><div class="expect-row"><div class="expect-icon"><i class="bi bi-chat-dots"></i></div><div><b>Communication & Explanation</b><span>Explain your work and thinking confidently.</span></div></div></div><div class="expectations-card student"><h3>Where Students Often Stand Today</h3><p>Many students discover these gaps only when internships or placements begin.</p><div class="expect-row"><div class="expect-icon"><i class="bi bi-journal-text"></i></div><div><b>Academic Knowledge, Limited Practice</b><span>Concept familiarity without enough practical repetition.</span></div></div><div class="expect-row"><div class="expect-icon"><i class="bi bi-signpost-split"></i></div><div><b>No Clear Learning Priority</b><span>Too many resources but uncertainty about what matters next.</span></div></div><div class="expect-row"><div class="expect-icon"><i class="bi bi-mic"></i></div><div><b>Low Interview Confidence</b><span>Knowing an answer is different from explaining it clearly.</span></div></div><div class="expect-row"><div class="expect-icon"><i class="bi bi-graph-up-arrow"></i></div><div><b>No Measurable Readiness View</b><span>Hard to know whether preparation is actually improving.</span></div></div></div></div><div class="gap-bridge"><div><h3>CareerPilot Bridges the Gap.</h3><p>Assess your readiness, identify what's missing, get a personalized roadmap and improve consistently.</p></div><a class="btn" data-track="readiness" data-location="expectations-gap" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">Check Where I Stand <i class="bi bi-arrow-right"></i></a></div></div>`;
    pricingSection.parentNode.insertBefore(section, pricingSection);
  }

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-track]'); if(!el) return;
    const kind = el.dataset.track; const href = el.getAttribute('href') || '';
    if(kind==='readiness') cpTrack('career_readiness_cta_click',{standard:true,name:'Lead'},{cta_location:el.dataset.location||'unknown',destination:href});
    if(kind==='login') cpTrack('login_click',{standard:false,name:'LoginClick'},{destination:href});
    if(kind==='membership') cpTrack('membership_cta_click',{standard:false,name:'MembershipCTAClick'},{plan:'CareerPilot Annual',value:1999,currency:'INR',destination:href});
  });
  if(pricingSection){ let fired=false; const io=new IntersectionObserver(es=>{es.forEach(x=>{if(x.isIntersecting&&!fired){fired=true;cpTrack('pricing_view',{standard:true,name:'ViewContent'},{content_name:'CareerPilot Annual Membership',value:1999,currency:'INR'});io.disconnect();}})},{threshold:.35});io.observe(pricingSection);}
})();
