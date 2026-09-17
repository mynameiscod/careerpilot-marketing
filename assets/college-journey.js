/* CareerPilot — "One CareerPilot. Your Complete College Journey." stacked scroll journey.
   Data → render (JourneyProgress + JourneyCard) → scroll controller. No dependencies. */
(() => {
  const section = document.querySelector('[data-college-journey]');
  if (!section) return;

  /* ---------- Data ----------
     `image` fills the right side of the card (cover). `imagePosition` sets its focal point.
     Set `image: null` to fall back to the built-in coded scene for that year. */
  const journeyYears = [
    {
      year: '01', stage: 'Discover', railLabel: 'Explore', theme: 'y1', scene: 'compass', image: '/assets/images/journey-year-1.webp', imagePosition: '0% 50%',
      title: 'Year 1 — Explore',
      statement: ["Discover what you're good at.", 'Explore where you want to go.'],
      description: 'Build strong foundations while exploring technology, communication, aptitude and possible career paths.',
      chips: ['Programming Basics', 'Communication', 'Aptitude', 'Career Discovery', 'Technology Awareness'],
      note: 'Discover your potential.'
    },
    {
      year: '02', stage: 'Build', railLabel: 'Build', theme: 'y2', scene: 'build', image: '/assets/images/journey-year-2.webp', imagePosition: '22% 50%',
      title: 'Year 2 — Build',
      statement: ['Turn your foundations', 'into real skills.'],
      description: 'Strengthen programming, problem solving and DSA while building projects and understanding your career direction.',
      chips: ['Programming', 'DSA', 'Projects', 'Problem Solving', 'Aptitude'],
      note: 'Build your skills.'
    },
    {
      year: '03', stage: 'Experience', railLabel: 'Industry Ready', theme: 'y3', scene: 'industry', image: '/assets/images/journey-year-3.webp', imagePosition: '30% 40%',
      title: 'Year 3 — Industry Ready',
      statement: ['Build experience', 'companies can see.'],
      description: 'Move beyond learning into projects, internships and a professional profile that represents your skills.',
      chips: ['Advanced Skills', 'Projects', 'Internships', 'Resume', 'LinkedIn', 'GitHub', 'Mock Interviews'],
      note: 'Gain real-world experience.'
    },
    {
      year: '04', stage: 'Launch', railLabel: 'Placement Ready', theme: 'y4', scene: 'launch', image: '/assets/images/journey-year-4.webp', imagePosition: '40% 40%',
      title: 'Year 4 — Placement Ready',
      statement: ['Turn preparation', 'into opportunity.'],
      description: 'Prepare for technical interviews, aptitude, HR rounds and applications while becoming ready for your target companies.',
      chips: ['DSA', 'Technical Interviews', 'Aptitude', 'HR Preparation', 'Profile Optimization', 'Applications'],
      final: { flow: ['College', 'Skills', 'Industry', 'Career'], link: { label: 'Your career starts here', href: '#pricing' } }
    }
  ];

  /* ---------- Scroll tuning ----------
     stepVh:      scroll distance per card change (× viewport height). Higher = slower.
     startHoldVh: scroll before the first card starts moving.
     endHoldVh:   scroll after Year 4 settles, before the section releases.
     moveWindow:  share of each step spent moving (the rest is a resting pause).
     peekPx / scaleStep / shadeStep: how much previous cards peek, shrink and fade per level.
     Cards stay opaque; the fade is a shade layer, so text never shows through from cards below. */
  const TUNING = { stepVh: 0.9, startHoldVh: 0.12, endHoldVh: 0.35, moveWindow: 0.72, peekPx: 28, scaleStep: 0.03, shadeStep: 0.14, maxShade: 0.4, incoming: 1.1 };

  const total = journeyYears.length;
  const pad = n => String(n).padStart(2, '0');
  const ic = name => `<i class="bi bi-${name}" aria-hidden="true"></i>`;
  const float = (icon, label, sub, style, opts = {}) =>
    `<div class="cj-float${opts.minor ? ' cj-float--minor' : ''}" style="${style}">${ic(icon)}<span><b>${label}</b>${sub ? `<small>${sub}</small>` : ''}${opts.bar ? `<span class="cj-bar"><span style="--w:${opts.bar}%"></span></span>` : ''}</span></div>`;
  const note = (text, style) => text ? `<span class="cj-note" style="${style}">${text}</span>` : '';

  /* ---------- Scenes (right column illustrations) ---------- */
  const scenes = {
    compass: y => `
      <span class="cj-orb"></span>
      <span class="cj-ring" style="left:58%;top:40%;width:58%"></span>
      <span class="cj-ring cj-ring--faint" style="left:58%;top:40%;width:86%"></span>
      <svg class="cj-paths" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M58 40C50 30 38 22 24 17"/><path d="M58 40C68 32 78 28 86 25"/><path d="M58 40C66 52 76 60 84 69"/></svg>
      <div class="cj-hub" style="left:58%;top:40%">${ic('compass')}</div>
      ${float('code-slash', 'Software Dev', 'Build apps', 'left:3%;top:8%')}
      ${float('cpu', 'AI &amp; Data', 'Analyse &amp; predict', 'right:0;top:15%')}
      ${float('cloud-check', 'Cloud &amp; DevOps', 'Scale systems', 'right:2%;top:64%', { minor: true })}
      <img class="cj-person" src="/assets/images/journey-student-cutout.webp" alt="" loading="lazy" decoding="async">
      ${note(y.note, 'right:5%;bottom:7%')}`,
    build: y => `
      <span class="cj-orb"></span>
      <div class="cj-code" style="left:5%;top:15%;width:72%">
        <div class="cj-code__bar"><i></i><i></i><i></i><span>solve.js</span></div>
<pre class="cj-code__body"><span class="k">function</span> <span class="f">solve</span>(nums) {
  <span class="k">const</span> seen = <span class="k">new</span> Set();
  <span class="k">for</span> (<span class="k">const</span> n <span class="k">of</span> nums) {
    <span class="k">if</span> (seen.has(n)) <span class="k">return</span> n;
    seen.<span class="f">add</span>(n);
  }
}</pre>
      </div>
      <div class="cj-tile" style="right:5%;top:5%">${ic('journal-code')}</div>
      <svg class="cj-paths" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M70 56C80 58 84 60 86 64"/><path d="M28 60C22 66 18 70 16 74"/></svg>
      ${float('kanban', 'Portfolio Project', '', 'right:0;top:60%', { bar: 72 })}
      ${float('diagram-3', 'DSA Practice', '120 problems solved', 'left:2%;top:72%', { minor: true })}
      ${note(y.note, 'left:44%;bottom:5%')}`,
    industry: y => `
      <span class="cj-orb"></span>
      <svg class="cj-skyline" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><g class="far"><rect x="10" y="90" width="34" height="110"/><rect x="52" y="60" width="28" height="140"/><rect x="88" y="104" width="40" height="96"/><rect x="250" y="70" width="30" height="130"/><rect x="288" y="40" width="36" height="160"/><rect x="332" y="96" width="30" height="104"/><rect x="368" y="76" width="28" height="124"/></g><g class="near"><rect x="0" y="140" width="60" height="60"/><rect x="130" y="120" width="46" height="80"/><rect x="186" y="96" width="54" height="104"/><rect x="306" y="130" width="56" height="70"/></g></svg>
      <span class="cj-ring" style="left:50%;top:42%;width:48%"></span>
      <svg class="cj-paths" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 42C38 34 30 26 22 19"/><path d="M50 42C62 36 72 32 80 30"/><path d="M50 42C40 54 32 62 24 70"/></svg>
      <div class="cj-tile cj-tile--lg" style="left:50%;top:42%;transform:translate(-50%,-50%)">${ic('briefcase-fill')}</div>
      ${float('patch-check-fill', 'Internship', 'Offer received', 'left:2%;top:8%')}
      ${float('file-earmark-person-fill', 'Resume', '92% complete', 'right:0;top:22%', { bar: 92 })}
      ${float('bar-chart-line-fill', 'Projects shipped', '6 live · 240 commits', 'left:3%;top:64%', { minor: true })}
      <div class="cj-socials" style="right:6%;top:62%">${ic('github')}${ic('linkedin')}${ic('code-square')}</div>
      ${note(y.note, 'right:4%;bottom:4%')}`,
    launch: y => `
      <span class="cj-orb"></span>
      <img class="cj-mountain" src="/assets/images/journey-mountain.webp" alt="" loading="lazy" decoding="async">
      <i class="bi bi-stars cj-spark" style="left:44%;top:10%" aria-hidden="true"></i>
      <i class="bi bi-stars cj-spark cj-spark--sm" style="left:8%;top:44%" aria-hidden="true"></i>
      <svg class="cj-paths" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M22 58C34 66 48 52 58 42C64 36 70 30 74 24"/></svg>
      <div class="cj-hub cj-hub--gold" style="left:24%;top:26%">${ic('trophy-fill')}</div>
      ${float('envelope-paper-fill', 'Offer Letter', 'Selected ✓', 'left:2%;top:58%')}
      ${float('buildings-fill', 'Target Company', 'Interview cleared', 'right:3%;top:5%', { minor: true })}
      ${y.final ? `<div class="cj-flow">${y.final.flow.map(s => `<span>${s}</span>`).join('<i aria-hidden="true">→</i>')}</div>` : ''}`
  };

  /* ---------- JourneyCard ---------- */
  const JourneyCard = (y, i) => {
    const n = i + 1;
    const dots = journeyYears.map((_, k) => `<i${k <= i ? ' class="on"' : ''}></i>`).join('');
    const visual = y.image
      ? `<img class="cj-image" data-src="${y.image}" alt="" style="object-position:${y.imagePosition || '50% 50%'}" decoding="async">`
      : scenes[y.scene](y);
    const final = y.final
      ? `<a class="cj-final-link cj-anim" style="--d:420ms" href="${y.final.link.href}">${y.final.link.label} <span aria-hidden="true">→</span></a>`
      : '';
    return `
      <article class="cj-card cj-card--${y.theme}${y.image ? ' cj-card--image' : ''}" style="--i:${i}" data-index="${i}" aria-labelledby="cj-title-${n}">
        <span class="cj-card__shade" aria-hidden="true"></span>
        <div class="cj-card__meta">
          <span class="cj-stage-label"><b>${y.year}</b> / ${y.stage.toUpperCase()}</span>
          <span class="cj-count"><span><span class="cj-count__pre">YEAR </span>${y.year} / ${pad(total)}</span><span class="cj-dots" aria-hidden="true">${dots}</span></span>
        </div>
        <div class="cj-card__body">
          <div class="cj-card__content">
            <span class="cj-bignum" aria-hidden="true">${y.year}</span>
            <h3 class="cj-title cj-anim" id="cj-title-${n}">${y.title}</h3>
            <p class="cj-statement cj-anim" style="--d:60ms"><span>${y.statement[0]}</span> <span class="cj-hl">${y.statement[1]}</span></p>
            <p class="cj-desc cj-anim" style="--d:140ms">${y.description}</p>
            <ul class="cj-chips" aria-label="Focus areas in ${y.title}">${y.chips.map((c, k) => `<li class="cj-anim" style="--d:${200 + k * 35}ms">${c}</li>`).join('')}</ul>
            <div class="cj-progress-row">
              <div class="cj-progress cj-anim" style="--d:380ms" aria-hidden="true"><span>01</span><i><b style="--w:${(n / total) * 100}%"></b></i><span>${pad(total)}</span></div>
              ${final}
            </div>
          </div>
          <div class="cj-visual${y.image ? ' cj-visual--image' : ''}" aria-hidden="true"><div class="cj-scene">${visual}</div></div>
        </div>
      </article>`;
  };

  /* ---------- JourneyProgress (desktop rail) ---------- */
  const JourneyProgress = () => `
    <div class="cj-rail" aria-hidden="true">
      <span class="cj-rail__cap"><span class="cj-rail__capicon">${ic('record-circle')}</span>START</span>
      <div class="cj-rail__track">
        <span class="cj-rail__line"><span class="cj-rail__fill"></span></span>
        <ol class="cj-rail__list">${journeyYears.map(y => `<li class="cj-rail__item"><span class="cj-rail__dot">${ic('check-lg')}</span><span class="cj-rail__num">${y.year}</span><span class="cj-rail__label">${y.railLabel}</span></li>`).join('')}</ol>
      </div>
      <span class="cj-rail__cap cj-rail__cap--end"><span class="cj-rail__capicon">${ic('flag-fill')}</span>CAREER</span>
    </div>`;

  const track = section.querySelector('.cj-track');
  const stage = section.querySelector('.cj-stage');
  stage.innerHTML = `${JourneyProgress()}<div class="cj-deck">${journeyYears.map(JourneyCard).join('')}</div>`;
  section.classList.add('cj-js');

  /* Load card images shortly before the section is reached. Native lazy loading would wait
     until each (transformed/clipped) card is visible, causing pop-in mid-animation. */
  const deferred = [...section.querySelectorAll('img[data-src]')];
  const loadImages = () => deferred.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { io.disconnect(); loadImages(); } }, { rootMargin: '1500px 0px' });
    io.observe(section);
  } else {
    loadImages();
  }

  const cards = [...section.querySelectorAll('.cj-card')];
  const railItems = [...section.querySelectorAll('.cj-rail__item')];
  const railFill = section.querySelector('.cj-rail__fill');
  const nav = document.querySelector('.cb-nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Scroll controller ---------- */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let mode = '', navH = 0, step = 0, startHold = 0, cardH = 0, ticking = false, lastActive = -1;
  const shades = cards.map(c => c.querySelector('.cj-card__shade'));
  const cache = cards.map(() => ({ t: '', o: '', shown: null }));
  let observer = null;

  const showAll = () => cards.forEach(c => c.classList.add('is-shown'));

  function layout() {
    const reduce = reduceMotion.matches;
    const w = window.innerWidth, h = window.innerHeight;
    navH = nav ? nav.getBoundingClientRect().height : 0;
    section.style.setProperty('--cj-nav', `${Math.round(navH)}px`);
    const next = reduce ? 'static' : (w >= 768 && h >= 600 ? 'stacked' : (w < 768 ? 'mobile' : 'static'));

    if (next !== mode) {
      mode = next;
      section.classList.toggle('cj--stacked', mode === 'stacked');
      section.classList.toggle('cj--mobile', mode === 'mobile');
      cards.forEach((c, i) => { c.style.transform = ''; shades[i].style.opacity = ''; cache[i] = { t: '', o: '', shown: null }; });
      lastActive = -1;
      if (observer) { observer.disconnect(); observer = null; }
      if (mode === 'mobile' && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-shown'); observer.unobserve(e.target); } }), { threshold: 0.2 });
        cards.forEach(c => observer.observe(c));
      } else if (mode !== 'stacked') {
        showAll();
      }
    }

    if (mode === 'stacked') {
      step = h * TUNING.stepVh;
      startHold = h * TUNING.startHoldVh;
      const stickyH = h - navH;
      track.style.height = `${Math.round(stickyH + startHold + step * (total - 1) + h * TUNING.endHoldVh)}px`;
      cardH = cards[0].offsetHeight;
      update();
    } else {
      track.style.height = '';
      if (mode === 'mobile') {
        const room = h - navH - 24;
        cards.forEach(c => c.classList.toggle('cj-card--flow', c.offsetHeight > room));
      }
    }
  }

  function update() {
    ticking = false;
    if (mode !== 'stacked') return;
    const rect = track.getBoundingClientRect();
    const p = clamp((navH - rect.top - startHold) / step, 0, total - 1);
    const pause = (1 - TUNING.moveWindow) / 2;
    const arrive = cards.map((_, i) => (i === 0 ? 1 : ease(clamp((p - (i - 1) - pause) / TUNING.moveWindow, 0, 1))));
    const E = arrive.reduce((sum, a, i) => sum + (i === 0 ? 0 : a), 0);

    cards.forEach((card, i) => {
      const depth = clamp(E - i, 0, total - 1);
      const ty = (1 - arrive[i]) * cardH * TUNING.incoming - TUNING.peekPx * depth;
      const scale = 1 - TUNING.scaleStep * depth;
      const t = `translate3d(0,${ty.toFixed(1)}px,0) scale(${scale.toFixed(4)})`;
      const o = Math.min(TUNING.maxShade, TUNING.shadeStep * depth).toFixed(3);
      const c = cache[i];
      if (c.t !== t) { card.style.transform = t; c.t = t; }
      if (c.o !== o) { shades[i].style.opacity = o; c.o = o; }
      const shown = arrive[i] > 0.45;
      if (c.shown !== shown) { card.classList.toggle('is-shown', shown); c.shown = shown; }
    });

    const active = Math.round(E);
    if (active !== lastActive) {
      railItems.forEach((item, i) => {
        item.classList.toggle('is-done', i < active);
        item.classList.toggle('is-current', i === active);
      });
      lastActive = active;
    }
    if (railFill) railFill.style.transform = `scaleY(${(E / (total - 1)).toFixed(4)})`;
  }

  const onScroll = () => { if (!ticking && mode === 'stacked') { ticking = true; requestAnimationFrame(update); } };
  let resizeRaf = 0;
  const onResize = () => { cancelAnimationFrame(resizeRaf); resizeRaf = requestAnimationFrame(layout); };

  layout();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
})();
