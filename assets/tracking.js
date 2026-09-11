(() => {
  const fireGA = (name, params={}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };
  const fireMeta = (type, name, params={}) => { if (typeof window.fbq === 'function') window.fbq(type, name, params); };
  const page = document.body?.dataset?.page || (location.pathname === '/' ? 'home' : location.pathname);
  const params = new URLSearchParams(location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k=>{ const v=params.get(k); if(v) sessionStorage.setItem(k,v); });
  const campaign = Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].map(k=>[k,sessionStorage.getItem(k)||'']).filter(([,v])=>v));
  const basePayload = () => ({ page, page_path: location.pathname, ...campaign });
  window.cpTrack = (eventName, metaName, extra={}) => {
    const payload = { ...basePayload(), ...extra };
    fireGA(eventName,payload);
    if(metaName) fireMeta(metaName.standard ? 'track' : 'trackCustom', metaName.name, payload);
  };

  // Landing-page view for campaign comparison in GA4/Meta.
  cpTrack('landing_page_view',{standard:false,name:'LandingPageView'},{landing_page_variant:page});

  const pricingSection = document.querySelector('#pricing');
  const offer = pricingSection?.querySelector('.offer');
  if (offer) {
    const ctaByPage = {
      'home':'Start My CareerPilot Journey',
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
            <a class="btn btn-teal" data-track="membership" data-location="pricing" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">${cta} <i class="bi bi-arrow-right"></i></a>
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

  const expectationsSection = document.querySelector('#expectations-gap');
  if (pricingSection && !document.querySelector('#industry-relations')) {
    const industryStyle = document.createElement('style');
    industryStyle.textContent = `.industry-relations{padding:78px 0;background:#fff}.ir-head{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:end;margin-bottom:28px}.ir-kicker{display:inline-flex;gap:8px;align-items:center;color:#248da0;font-size:12px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.ir-head h2{font-size:44px;line-height:1.06;letter-spacing:-1.7px;color:#051D64;margin:12px 0 10px}.ir-head h2 span{color:#19afbf}.ir-head p{margin:0;color:#65728a;font-size:16px;max-width:680px}.ir-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.ir-stat{padding:17px 18px;border:1px solid #dfe8f1;border-radius:18px;background:linear-gradient(145deg,#fff,#f5fbfd);box-shadow:0 8px 24px rgba(5,29,100,.05)}.ir-stat i{color:#359AAD;font-size:20px}.ir-stat b{display:block;color:#051D64;font-size:20px;margin-top:5px}.ir-stat span{display:block;color:#6b778c;font-size:11px;margin-top:2px}.ir-gallery{display:grid;grid-template-columns:1.35fr .85fr .85fr;grid-template-rows:190px 190px;gap:14px}.ir-card{position:relative;overflow:hidden;border-radius:22px;background:#eaf4f9;box-shadow:0 12px 32px rgba(5,29,100,.10);min-height:180px}.ir-card.ir-large{grid-row:1/3}.ir-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}.ir-card:hover img{transform:scale(1.035)}.ir-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,26,62,.02) 30%,rgba(4,26,62,.88) 100%)}.ir-card-content{position:absolute;z-index:2;left:18px;right:18px;bottom:16px;color:#fff}.ir-card-content b{display:block;font-size:16px}.ir-card-content span{display:block;font-size:11px;color:#dbe7f7;margin-top:3px}.ir-label{position:absolute;z-index:3;left:14px;top:14px;display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border-radius:999px;background:rgba(5,29,100,.9);color:#fff;font-size:10px;font-weight:800;backdrop-filter:blur(8px)}.ir-update{margin-top:16px;border:1px solid #dce8f0;border-radius:22px;background:linear-gradient(120deg,#f6fbfd,#edf7ff);padding:22px;display:grid;grid-template-columns:1.1fr .9fr auto;gap:18px;align-items:center}.ir-update-title{display:flex;gap:13px;align-items:center}.ir-update-icon{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:#dff4f5;color:#168b9b;font-size:22px}.ir-update h3{margin:0;color:#051D64;font-size:18px}.ir-update p{margin:4px 0 0;color:#68758b;font-size:12px}.ir-points{display:flex;gap:16px;flex-wrap:wrap;color:#334867;font-size:12px;font-weight:700}.ir-points span{display:flex;align-items:center;gap:6px}.ir-points i{color:#359AAD}.ir-update .btn{white-space:nowrap}.ir-note{margin-top:16px;padding:14px 18px;border-radius:15px;background:#051D64;color:#dce8ff;font-size:12px;display:flex;gap:10px;align-items:center}.ir-note i{color:#46ced8;font-size:18px}.ir-note b{color:#fff}@media(max-width:900px){.ir-head{grid-template-columns:1fr}.ir-gallery{grid-template-columns:1fr 1fr;grid-template-rows:280px 180px 180px}.ir-card.ir-large{grid-column:1/3;grid-row:auto}.ir-update{grid-template-columns:1fr}.ir-head h2{font-size:36px}}@media(max-width:640px){.industry-relations{padding:58px 0}.ir-head h2{font-size:32px}.ir-stats{grid-template-columns:1fr 1fr}.ir-gallery{display:grid;grid-template-columns:1fr;grid-template-rows:auto}.ir-card,.ir-card.ir-large{grid-column:auto;grid-row:auto;height:220px}.ir-card.ir-large{height:260px}.ir-points{display:grid;gap:8px}.ir-update{padding:18px}}`;
    document.head.appendChild(industryStyle);
    const ir = document.createElement('section'); ir.id = 'industry-relations'; ir.className = 'industry-relations';
    ir.innerHTML = `<div class="container"><div class="ir-head"><div><span class="ir-kicker"><i class="bi bi-diagram-3"></i> Industry Relations</span><h2>Bridging Students with <span>Real Opportunities.</span></h2><p>CareerPilot is backed by CodeBegun's industry-focused ecosystem — connecting learning with expert interactions, hackathons, mock interviews, workshops and career opportunities.</p></div><div class="ir-stats"><div class="ir-stat"><i class="bi bi-buildings"></i><b>80+</b><span>Hiring partners in the CodeBegun network</span></div><div class="ir-stat"><i class="bi bi-trophy"></i><b>14 LPA</b><span>Highest CodeBegun placement outcome</span></div></div></div><div class="ir-gallery"><article class="ir-card ir-large"><img loading="lazy" src="https://www.codebegun.com/images/homepage1.jpeg" alt="Industry expert interaction"><span class="ir-label"><i class="bi bi-megaphone"></i> Industry Expert Sessions</span><div class="ir-card-content"><b>Learn Directly from Working Professionals</b><span>Understand real roles, expectations, skills and hiring perspectives.</span></div></article><article class="ir-card"><img loading="lazy" src="https://raw.githubusercontent.com/mynameiscod/cbwebsite/master/public/images/hackathons/codebegun-techotsav-26.jpeg" alt="CodeBegun hackathon"><span class="ir-label"><i class="bi bi-trophy"></i> Hackathons</span><div class="ir-card-content"><b>Build. Compete. Innovate.</b><span>Apply your skills through campus challenges and technical events.</span></div></article><article class="ir-card"><img loading="lazy" src="https://www.codebegun.com/images/homepage3.jpeg" alt="Career readiness mock interview"><span class="ir-label"><i class="bi bi-person-video3"></i> Mock Interviews</span><div class="ir-card-content"><b>Practice Before the Real Interview</b><span>Structured preparation and feedback from experienced professionals.</span></div></article><article class="ir-card"><img loading="lazy" src="https://www.codebegun.com/images/homepage5.jpeg" alt="CodeBegun career workshop"><span class="ir-label"><i class="bi bi-easel2"></i> Career Workshops</span><div class="ir-card-content"><b>Industry-Aligned Skill Building</b><span>Workshops that connect classroom learning with career expectations.</span></div></article><article class="ir-card"><img loading="lazy" src="https://www.codebegun.com/images/homepage4.jpeg" alt="Students preparing for career opportunities"><span class="ir-label"><i class="bi bi-briefcase"></i> Career Opportunities</span><div class="ir-card-content"><b>Prepare for Internships & Placements</b><span>Build the skills and profile needed when opportunities arrive.</span></div></article></div><div class="ir-update"><div class="ir-update-title"><div class="ir-update-icon"><i class="bi bi-calendar-event"></i></div><div><h3>Industry Relations Updates</h3><p>CareerPilot members stay connected to CodeBegun's career-focused activities and upcoming opportunities.</p></div></div><div class="ir-points"><span><i class="bi bi-check-circle-fill"></i> Expert Sessions</span><span><i class="bi bi-check-circle-fill"></i> Hackathons</span><span><i class="bi bi-check-circle-fill"></i> Mock Interviews</span><span><i class="bi bi-check-circle-fill"></i> Workshops</span></div><a class="btn btn-primary" data-track="readiness" data-location="industry-relations" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">Join CareerPilot <i class="bi bi-arrow-right"></i></a></div><div class="ir-note"><i class="bi bi-rocket-takeoff"></i><span><b>Your career. Our industry network.</b> Learn the skills, understand industry expectations and be ready when the right opportunity comes.</span></div></div>`;
    const anchor = expectationsSection || pricingSection; anchor.parentNode.insertBefore(ir, anchor);
  }

  document.addEventListener('click', e => {
    const el = e.target.closest('a,button'); if(!el) return;
    const kind = el.dataset.track || '';
    const href = el.getAttribute('href') || '';
    const locationName = el.dataset.location || el.dataset.ctaLocation || el.closest('section')?.id || 'page';
    const text = (el.textContent || '').trim().replace(/\s+/g,' ').slice(0,120);

    if(kind==='readiness' || kind==='career-readiness') {
      cpTrack('career_readiness_cta_click',{standard:true,name:'Lead'},{cta_location:locationName,cta_text:text,destination:href});
    }
    if(kind==='login') {
      cpTrack('login_click',{standard:false,name:'LoginClick'},{cta_location:locationName,destination:href});
    }
    if(kind==='membership') {
      const purchaseIntent = {plan:'CareerPilot Annual',value:1999,currency:'INR',cta_location:locationName,cta_text:text,destination:href};
      fireGA('membership_cta_click',{...basePayload(),...purchaseIntent});
      fireMeta('track','InitiateCheckout',{...basePayload(),...purchaseIntent,content_name:'CareerPilot Annual Membership'});
      fireMeta('trackCustom','MembershipCTAClick',{...basePayload(),...purchaseIntent});
    }
    if(href.startsWith('#')) cpTrack('navigation_click',{standard:false,name:'NavigationClick'},{link_text:text,destination:href});
    if(/^https?:\/\//.test(href) && !href.includes(location.hostname) && !kind) cpTrack('outbound_click',{standard:false,name:'OutboundClick'},{link_text:text,destination:href});
  });

  const observeSection = (el, name, extra={}) => {
    if(!el || !('IntersectionObserver' in window)) return;
    let fired=false;
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting && !fired){ fired=true; cpTrack('section_view',{standard:false,name:'SectionView'},{section_name:name,...extra}); io.disconnect(); }
    }),{threshold:.35});
    io.observe(el);
  };
  document.querySelectorAll('main section[id]').forEach(el=>observeSection(el,el.id));
  observeSection(document.querySelector('#industry-relations'),'industry-relations');
  observeSection(document.querySelector('#expectations-gap'),'expectations-gap');

  if(pricingSection){
    let fired=false;
    const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting&&!fired){
      fired=true;
      const payload={...basePayload(),content_name:'CareerPilot Annual Membership',plan:'CareerPilot Annual',value:1999,currency:'INR'};
      fireGA('pricing_view',payload);
      fireMeta('track','ViewContent',payload);
      io.disconnect();
    }}),{threshold:.35}); io.observe(pricingSection);
  }

  const reached = new Set();
  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - innerHeight;
    if(max <= 0) return;
    const pct = Math.round((scrollY / max) * 100);
    [25,50,75,90].forEach(mark=>{ if(pct>=mark && !reached.has(mark)){ reached.add(mark); cpTrack(`scroll_depth_${mark}`,{standard:false,name:'ScrollDepth'},{percent:mark}); } });
  };
  addEventListener('scroll',onScroll,{passive:true});

  setTimeout(()=>cpTrack('engaged_30_seconds',{standard:false,name:'Engaged30Seconds'},{seconds:30}),30000);
})();
