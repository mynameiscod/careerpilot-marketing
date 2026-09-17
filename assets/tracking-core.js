(() => {
  // PostHog (EU cloud) — shared across every CareerPilot marketing page.
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="su ru ou lu hu init Au Fu Eu Pu Nu zl Ru ju Tu Uu Wu Vu capture getExtension Ou iu Qu calculateEventProperties Zu register register_once register_for_session unregister unregister_for_session Xu Mu Ju getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync th identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset eh shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty Ku zu createPersonProfile setInternalOrTestUser Yu cu du opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Bu debug Ul $s getPageViewId captureTraceFeedback captureTraceMetric Su".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('phc_qUoM5D37t2VSVWGrYKhRdbwFkirc2QTiCiNz2eJ3QtEi', {
    api_host: 'https://eu.i.posthog.com',
    defaults: '2026-05-30',
    person_profiles: 'identified_only'
  });

  const fireGA = (name, params={}) => { if (typeof window.gtag === 'function') window.gtag('event', name, params); };
  const fireMeta = (type, name, params={}) => { if (typeof window.fbq === 'function') window.fbq(type, name, params); };
  const firePostHog = (name, params={}) => { if (window.posthog && typeof window.posthog.capture === 'function') window.posthog.capture(name, params); };
  const page = document.body?.dataset?.page || (location.pathname === '/' ? 'home' : location.pathname);
  const params = new URLSearchParams(location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k=>{ const v=params.get(k); if(v) sessionStorage.setItem(k,v); });
  const campaign = Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].map(k=>[k,sessionStorage.getItem(k)||'']).filter(([,v])=>v));
  const basePayload = () => ({ page, page_path: location.pathname, ...campaign });
  window.cpTrack = (eventName, metaName, extra={}) => {
    const payload = { ...basePayload(), ...extra };
    fireGA(eventName,payload);
    if(metaName) fireMeta(metaName.standard ? 'track' : 'trackCustom', metaName.name, payload);
    firePostHog(eventName,payload);
  };

  cpTrack('landing_page_view',{standard:false,name:'LandingPageView'},{landing_page_variant:page});

  const ctaByPage = {
    'home':'Check My Career Readiness',
    'career-readiness':'Check My Career Readiness',
    'start-early':'Build My Career Plan',
    'skill-gap':'Find My Skill Gaps',
    'placement-ready':'Check My Placement Readiness'
  };
  const pageCta = ctaByPage[page] || 'Check My Career Readiness';

  const pricingSection = document.querySelector('#pricing');
  const offer = pricingSection?.querySelector('.offer');
  if (offer) {
    offer.innerHTML = `
      <div class="cp-price-shell">
        <div class="cp-price-main">
          <div class="cp-price-left">
            <span class="cp-price-chip"><i class="bi bi-lightning-charge-fill"></i> Limited Time Launch Offer</span>
            <h2>Your Career-Ready <span>Future Starts Here.</span></h2>
            <p>Get 12 months of CareerPilot access and build the skills, confidence and profile you need for internships and placements.</p>
            <div class="cp-price-row"><span class="cp-price-old">₹4,999</span><span class="cp-price-off">60% OFF</span></div>
            <div><span class="cp-price-new">₹1,999</span><span class="cp-price-term"> / 12 months</span></div>
            <div class="cp-launch-deadline"><i class="bi bi-calendar-event"></i><span>Launch offer valid until <b>24 Sep 2026</b></span></div>
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
            <a class="btn btn-teal" data-track="membership" data-location="pricing" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">${pageCta} <i class="bi bi-arrow-right"></i></a>
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

  const deadlineStyle = document.createElement('style');
  deadlineStyle.textContent = `.cp-launch-deadline{display:inline-flex;align-items:center;gap:8px;margin-top:12px;padding:9px 12px;border-radius:12px;background:rgba(255,211,77,.14);border:1px solid rgba(255,211,77,.45);color:#fff;font-size:12px;font-weight:700}.cp-launch-deadline i{color:#ffd34d}.cp-launch-deadline b{color:#ffd34d}`;
  document.head.appendChild(deadlineStyle);

  if (pricingSection && !document.querySelector('#expectations-gap')) {
    if (!document.querySelector('link[href*="expectations-gap.css"]')) { const egCss = document.createElement('link'); egCss.rel = 'stylesheet'; egCss.href = '/assets/expectations-gap.css?v=20260917-2'; document.head.appendChild(egCss); }
    const section = document.createElement('section');
    section.id = 'expectations-gap'; section.className = 'expectations-gap';
    section.innerHTML = `<div class="eg"><span class="eg-dots eg-dots--l" aria-hidden="true"></span><span class="eg-dots eg-dots--r" aria-hidden="true"></span><span class="eg-hand eg-hand--l" aria-hidden="true">Real skills<br>Real opportunities<svg viewBox="0 0 44 26"><path d="M2 4C10 18 24 22 40 20M32 14L40 20L32 25"/></svg></span><span class="eg-hand eg-hand--r" aria-hidden="true">From<br>&nbsp;potential<br>&nbsp;&nbsp;to opportunity<svg viewBox="0 0 44 26"><path d="M4 22C16 10 28 6 42 6"/></svg></span><div class="eg-head"><span class="eg-kicker"><i class="bi bi-bar-chart-line" aria-hidden="true"></i> Industry expectations vs student readiness</span><h2>What Companies Expect — And Where <span>Students Often Stand Today</span></h2><p>CareerPilot helps make the gap visible early, then turns it into a clear plan for learning, practice and career readiness.</p></div><div class="eg-grid"><div class="eg-panel eg-panel--company"><div class="eg-phead"><i class="bi bi-briefcase" aria-hidden="true"></i><div><h3>What Companies Expect</h3><p>Hiring teams typically look beyond marks and certificates.</p></div></div><ul class="eg-list"><li class="eg-item"><i class="bi bi-lightbulb i-green" aria-hidden="true"></i><div><b>Problem Solving &amp; Logical Thinking</b><span>Break down problems and arrive at practical solutions.</span></div><i class="bi bi-chevron-right" aria-hidden="true"></i></li><li class="eg-item"><i class="bi bi-code-slash i-blue" aria-hidden="true"></i><div><b>Strong Technical Fundamentals</b><span>Understand core concepts beyond memorized answers.</span></div><i class="bi bi-chevron-right" aria-hidden="true"></i></li><li class="eg-item"><i class="bi bi-kanban i-teal" aria-hidden="true"></i><div><b>Projects &amp; Practical Application</b><span>Apply concepts through real tasks and projects.</span></div><i class="bi bi-chevron-right" aria-hidden="true"></i></li><li class="eg-item"><i class="bi bi-chat-dots i-sky" aria-hidden="true"></i><div><b>Communication &amp; Explanation</b><span>Explain your work and thinking confidently.</span></div><i class="bi bi-chevron-right" aria-hidden="true"></i></li></ul></div><div class="eg-bridge" aria-hidden="true"><svg viewBox="0 0 156 200" preserveAspectRatio="none"><path stroke="url(#egGrad)" d="M0 30C60 30 96 170 156 170M0 170C60 170 96 30 156 30"/><path stroke="url(#egGrad)" d="M0 60C60 60 96 140 156 140M0 140C60 140 96 60 156 60"/><path stroke="url(#egGrad)" d="M0 100C60 100 96 100 156 100"/><defs><linearGradient id="egGrad" x1="0" x2="1"><stop offset="0" stop-color="#2bb3bf"/><stop offset="1" stop-color="#3b6ff0"/></linearGradient></defs></svg><span class="eg-arrow"><i class="bi bi-arrow-right"></i></span><span class="eg-bridge-text">BRIDGING<br>THE GAP<br>TOGETHER</span></div><div class="eg-panel eg-panel--student"><div class="eg-phead"><i class="bi bi-mortarboard" aria-hidden="true"></i><div><h3>Where Students Often Stand Today</h3><p>Many students discover these gaps only when internships or placements begin.</p></div></div><ul class="eg-list"><li class="eg-item"><i class="bi bi-journal-text i-rose" aria-hidden="true"></i><div><b>Academic Knowledge, Limited Practice</b><span>Concept familiarity without enough practical repetition.</span></div><i class="bi bi-chevron-right" aria-hidden="true"></i></li><li class="eg-item"><i class="bi bi-signpost-split i-indigo" aria-hidden="true"></i><div><b>No Clear Learning Priority</b><span>Too many resources but uncertainty about what matters next.</span></div><i class="bi bi-chevron-right" aria-hidden="true"></i></li><li class="eg-item"><i class="bi bi-mic i-pink" aria-hidden="true"></i><div><b>Low Interview Confidence</b><span>Knowing an answer is different from explaining it clearly.</span></div><i class="bi bi-chevron-right" aria-hidden="true"></i></li><li class="eg-item"><i class="bi bi-graph-up-arrow i-navy" aria-hidden="true"></i><div><b>No Measurable Readiness View</b><span>Hard to know whether preparation is actually improving.</span></div><i class="bi bi-chevron-right" aria-hidden="true"></i></li></ul></div></div><div class="eg-cta"><i class="bi bi-bar-chart-fill" aria-hidden="true"></i><div><h3>CareerPilot Bridges the Gap.</h3><p>Assess your readiness, identify what&#39;s missing, get a personalized roadmap and improve consistently.</p></div><a class="btn" data-track="readiness" data-location="expectations-gap" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">${pageCta} <i class="bi bi-arrow-right"></i></a><svg class="eg-spark" viewBox="0 0 22 22" aria-hidden="true"><path d="M4 2L7 9M13 4L11 10M19 12L13 13"/></svg></div></div>`;
    pricingSection.parentNode.insertBefore(section, pricingSection);
  }

  const expectationsSection = document.querySelector('#expectations-gap');
  if (pricingSection && !document.querySelector('#industry-relations')) {
    if (!document.querySelector('link[href*="industry-relations.css"]')) { const irCss = document.createElement('link'); irCss.rel = 'stylesheet'; irCss.href = '/assets/industry-relations.css?v=20260917-5'; document.head.appendChild(irCss); }
    if (!document.querySelector('link[href*="family=Caveat"]')) { const font = document.createElement('link'); font.rel = 'stylesheet'; font.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap'; document.head.appendChild(font); }
    const ir = document.createElement('section'); ir.id = 'industry-relations'; ir.className = 'industry-relations';
    ir.innerHTML = `<div class="ir2"><div class="ir2-main"><div class="ir2-copy"><span class="ir2-kicker"><i class="bi bi-diagram-3" aria-hidden="true"></i> Industry Relations</span><h2>Bridging Students with <span>Real Opportunities.</span></h2><p>CareerPilot is backed by CodeBegun's industry-focused ecosystem — connecting learning with expert interactions, hackathons, mock interviews, workshops, internships and career opportunities.</p><div class="ir2-stats"><div class="ir2-stat"><i class="bi bi-buildings" aria-hidden="true"></i><b>80+</b><span>Hiring Partners</span></div><div class="ir2-stat s-teal"><i class="bi bi-briefcase" aria-hidden="true"></i><b>500+</b><span>Job &amp; Internship Opportunities</span></div><div class="ir2-stat s-gold"><i class="bi bi-trophy" aria-hidden="true"></i><b>14 LPA</b><span>Highest Placement</span></div></div><div class="ir2-ctas"><a class="btn btn-primary" data-track="readiness" data-cta-keep data-location="industry-relations" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">Explore Industry Opportunities <i class="bi bi-arrow-right"></i></a><a class="btn btn-outline" data-track="readiness" data-location="industry-relations-secondary" href="https://platform.codebegun.com/careerpilot/join?tenant=codebegun">${pageCta} <i class="bi bi-arrow-right"></i></a></div><div class="ir2-hand" aria-hidden="true">From Learning<br>&nbsp;&nbsp;to a Brighter Career<svg viewBox="0 0 46 22"><path d="M2 18C14 20 30 16 42 5M34 4L43 4L41 13"/></svg></div></div><div class="ir2-mosaic"><article class="ir2-card ir2-expert"><img loading="lazy" decoding="async" src="/assets/images/ir-expert-session.webp" alt="Industry expert session with students"><span class="ir2-label"><i class="bi bi-people" aria-hidden="true"></i> Industry Expert Sessions</span><span class="ir2-note" aria-hidden="true">Real Skills<br>Real Careers</span><div class="ir2-body"><b>Learn from Industry Professionals</b><span>Gain real-world insights, career guidance and industry perspectives.</span></div></article><article class="ir2-card ir2-hack"><img loading="lazy" decoding="async" src="/assets/images/ir-hackathon.webp" alt="Students at a CodeBegun hackathon"><span class="ir2-label"><i class="bi bi-code-slash" aria-hidden="true"></i> Hackathons</span><span class="ir2-note" aria-hidden="true">Ideas<br>Build<br>Futures</span><div class="ir2-body"><b>Build. Compete. Innovate.</b><span>Apply your skills through real-world challenges and technical events.</span></div></article><article class="ir2-card ir2-mock"><img loading="lazy" decoding="async" src="/assets/images/ir-mock-interview.webp" alt="Student in a mock interview"><span class="ir2-label"><i class="bi bi-camera-video" aria-hidden="true"></i> Mock Interviews</span><div class="ir2-body"><b>Practice Before the Real Interview</b><span>Get feedback from experienced professionals and improve with confidence.</span></div></article><article class="ir2-card ir2-work"><img loading="lazy" decoding="async" src="/assets/images/ir-workshop.webp" alt="Students in a CodeBegun career workshop"><span class="ir2-label"><i class="bi bi-people-fill" aria-hidden="true"></i> Career Workshops</span><div class="ir2-body"><b>Industry-Aligned Skill Building</b><span>Hands-on workshops that bridge classroom learning with career expectations.</span></div></article><article class="ir2-card ir2-opp"><img loading="lazy" decoding="async" src="/assets/images/ir-opportunities.webp" alt="Students preparing for internships and placements"><span class="ir2-label"><i class="bi bi-briefcase" aria-hidden="true"></i> Career Opportunities</span><div class="ir2-body"><b>Prepare for Internships &amp; Placements</b><span>Get access to exclusive opportunities with our hiring partners.</span></div></article></div></div><div class="ir2-band"><i class="bi bi-rocket-takeoff" aria-hidden="true"></i><p><b>Your career. Our industry network.</b>Learn the skills, understand industry expectations and be ready when the right opportunity comes.</p><span class="ir2-band-hand" aria-hidden="true">Industry<br>Ready You</span></div></div>`;
    const anchor = expectationsSection || pricingSection; anchor.parentNode.insertBefore(ir, anchor);
  }

  const finalCtaSection = document.querySelector('.cta-band')?.closest('section');
  if (finalCtaSection && !document.querySelector('#faq')) {
    const faqStyle = document.createElement('style');
    faqStyle.textContent = `.cp-faq-section{padding:76px 0;background:#f8fbff}.cp-faq-head{text-align:center;max-width:760px;margin:0 auto 30px}.cp-faq-head h2{margin:0;color:#051D64;font-size:40px;line-height:1.08;letter-spacing:-1.4px}.cp-faq-head p{margin:12px 0 0;color:#66728a;font-size:15px}.cp-faq{max-width:900px;margin:0 auto;display:grid;gap:12px}.cp-faq details{background:#fff;border:1px solid #dfe8f1;border-radius:16px;padding:0 18px;box-shadow:0 7px 20px rgba(5,29,100,.04)}.cp-faq summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 0;color:#051D64;font-weight:800;font-size:14px}.cp-faq summary::-webkit-details-marker{display:none}.cp-faq summary:after{content:'+';width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#edf7fb;color:#359AAD;font-size:20px;flex:0 0 auto}.cp-faq details[open] summary:after{content:'−'}.cp-faq details p{margin:0;padding:0 0 18px;color:#66728a;font-size:13px;line-height:1.65}.cp-faq-note{max-width:900px;margin:16px auto 0;padding:13px 16px;border-radius:14px;background:#eef8fb;color:#40516f;font-size:12px;text-align:center}.cp-faq-note b{color:#051D64}@media(max-width:640px){.cp-faq-section{padding:56px 0}.cp-faq-head h2{font-size:32px}.cp-faq summary{font-size:13px;padding:16px 0}}`;
    document.head.appendChild(faqStyle);
    const faq = document.createElement('section');
    faq.id = 'faq';
    faq.className = 'cp-faq-section';
    faq.innerHTML = `<div class="container"><div class="cp-faq-head"><h2>Frequently Asked Questions</h2><p>Quick answers about CareerPilot, the launch offer and how the platform helps you prepare.</p></div><div class="cp-faq"><details><summary>What is CareerPilot?</summary><p>CareerPilot is an AI-powered career-readiness platform by CodeBegun that helps students assess their current skills, identify gaps, follow a personalized roadmap and improve through learning, practice and daily missions.</p></details><details><summary>Who can use CareerPilot?</summary><p>CareerPilot is designed for engineering and degree students across all years, including students who are still exploring career options and students actively preparing for internships or placements.</p></details><details><summary>Do I need to choose a career role before I start?</summary><p>No. Early-year students can begin with fundamentals, interests, reasoning, communication and technology awareness. Career direction can become more specific as the student progresses.</p></details><details><summary>What do I get with the ₹1,999 launch offer?</summary><p>You get 12 months of CareerPilot access, including career-readiness assessment, personalized roadmap, daily missions, learning resources, technical practice, communication support, resume and career-profile tools, interview preparation and progress tracking.</p></details><details><summary>How long is the ₹1,999 launch offer valid?</summary><p>The ₹1,999 launch offer is valid until 24 September 2026. Pricing may change after the launch-offer period.</p></details><details><summary>Does CareerPilot guarantee a placement?</summary><p>No platform can responsibly guarantee a job outcome. CareerPilot is designed to improve career readiness by helping students build skills, practice consistently, strengthen their profile and prepare better for internships and placement opportunities.</p></details></div><div class="cp-faq-note"><b>Launch offer:</b> ₹1,999 for 12 months · Valid until 24 Sep 2026</div></div>`;
    finalCtaSection.parentNode.insertBefore(faq, finalCtaSection);

    faq.querySelectorAll('details').forEach((item, index) => {
      item.addEventListener('toggle', () => {
        if (item.open) cpTrack('faq_open',{standard:false,name:'FAQOpen'},{faq_index:index + 1,faq_question:item.querySelector('summary')?.textContent?.trim() || ''});
      });
    });
  }

  // Keep every primary CareerPilot CTA consistent with the page intent.
  document.querySelectorAll('[data-track="readiness"],[data-track="career-readiness"],[data-track="membership"]').forEach(el => {
    if (el.hasAttribute('data-cta-keep')) return;
    const hasArrow = !!el.querySelector('.bi-arrow-right');
    el.innerHTML = `${pageCta}${hasArrow ? ' <i class="bi bi-arrow-right"></i>' : ''}`;
  });

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
      const payload = {...basePayload(),...purchaseIntent};
      fireGA('membership_cta_click',payload);
      fireMeta('track','InitiateCheckout',{...payload,content_name:'CareerPilot Annual Membership'});
      fireMeta('trackCustom','MembershipCTAClick',payload);
      firePostHog('membership_cta_click',payload);
      firePostHog('initiate_checkout',{...payload,content_name:'CareerPilot Annual Membership'});
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
  observeSection(document.querySelector('#faq'),'faq');

  if(pricingSection){
    let fired=false;
    const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting&&!fired){
      fired=true;
      const payload={...basePayload(),content_name:'CareerPilot Annual Membership',plan:'CareerPilot Annual',value:1999,currency:'INR'};
      fireGA('pricing_view',payload);
      fireMeta('track','ViewContent',payload);
      firePostHog('pricing_view',payload);
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
