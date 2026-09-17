/* CareerPilot — CareerHorizonSection
   A giant wheel whose centre sits far below the visible area; only its upper arc shows.
   Scroll rotates the wheel; the career at 12 o'clock is active. Data: assets/career-paths.js. */
(() => {
  const section = document.querySelector('[data-career-horizon]');
  const careers = (window.CareerPilotData && window.CareerPilotData.careerPaths) || [];
  const skillLogos = (window.CareerPilotData && window.CareerPilotData.skillLogos) || {};
  const logoSrc = name => `/assets/tech-icons/${name}.svg`;
  const skillIcons = (window.CareerPilotData && window.CareerPilotData.skillIcons) || {};
  const skillIcon = name => {
    if (skillLogos[name]) return `<img src="${logoSrc(skillLogos[name])}" alt="" width="16" height="16">`;
    const [cls, color] = skillIcons[name] || ['bi-check2-circle', '#359AAD'];
    return `<i class="bi ${cls}" style="color:${color}" aria-hidden="true"></i>`;
  };
  const careerIcon = (c, size) => c.logo
    ? `<img src="${logoSrc(c.logo)}" alt="" width="${size}" height="${size}" decoding="async">`
    : `<i class="bi ${c.icon}" aria-hidden="true"></i>`;
  if (!section || !careers.length) return;

  /* ---------- Tuning ----------
     stepDeg:          degrees between neighbouring careers on the wheel (smaller = closer together).
     scrollPerCareerVh: scroll distance per career change (× viewport height). Higher = slower.
     startHoldVh / endHoldVh: extra scroll before the first and after the last career.
     pause:            share of each step where the wheel rests on a career (0–0.4).
     smoothing:        per-frame easing toward the scroll target (0.08 floaty – 0.3 tight).
     Wheel radius and visible arc height live in CSS: --ch-r and --ch-arc-top (career-horizon.css). */
  const CONFIG = {
    stepDeg: 20,
    scrollPerCareerVh: 0.3,
    startHoldVh: 0.1,
    endHoldVh: 0.25,
    pause: 0.18,
    smoothing: 0.16,
    ctaHref: 'https://platform.codebegun.com/careerpilot/join?tenant=codebegun'
  };

  const N = careers.length;
  const copies = Math.max(1, Math.round(360 / (CONFIG.stepDeg * N)));
  const slotCount = N * copies;
  const step = 360 / slotCount; // exact spacing so the ring closes seamlessly
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Render ---------- */
  const CareerNode = (c, slot) => `
    <div class="ch-slot" style="--a:${(slot * step).toFixed(3)}deg">
      <button type="button" class="ch-node" data-career="${slot % N}" tabindex="-1" aria-hidden="true">
        <span class="ch-node__icon${c.logo ? ' has-logo' : ''}">${careerIcon(c, 30)}</span>
        <span class="ch-node__label">${esc(c.shortTitle)}</span>
      </button>
    </div>`;

  const dots = [];
  for (let a = 0; a < 360; a += step / 4) if (Math.round(a / step * 4) % 4 !== 0) dots.push(`<span class="ch-dot" style="--a:${a.toFixed(2)}deg"></span>`);

  const horizon = section.querySelector('.ch-horizon');
  horizon.innerHTML = `
    <div class="ch-arc" aria-hidden="true">
      <div class="ch-glow"></div>
      <div class="ch-pivot">
        <div class="ch-ring"></div>
        <div class="ch-wheel">${dots.join('')}${Array.from({ length: slotCount }, (_, s) => CareerNode(careers[s % N], s)).join('')}</div>
        <span class="ch-beacon"></span>
      </div>
    </div>
    <div class="ch-active"></div>
    <div class="ch-base" aria-hidden="true"><b>CAREERPILOT</b><span>Explore <i>•</i> Learn <i>•</i> Practice <i>•</i> Grow</span></div>
    <div class="ch-progress">
      <button type="button" class="ch-stepbtn" data-dir="-1" aria-label="Previous career"><i class="bi bi-chevron-left" aria-hidden="true"></i></button>
      <span class="ch-count" aria-hidden="true"><b>01</b> / ${pad(N)}</span>
      <span class="ch-dots" aria-hidden="true">${careers.map(() => '<i></i>').join('')}</span>
      <button type="button" class="ch-stepbtn" data-dir="1" aria-label="Next career"><i class="bi bi-chevron-right" aria-hidden="true"></i></button>
    </div>
    <ol class="ch-sr">${careers.map(c => `<li><b>${esc(c.title)}</b>: ${esc(c.tagline)} Key skills: ${c.skills.map(esc).join(', ')}.</li>`).join('')}</ol>`;
  section.classList.add('ch-js');

  const track = section.querySelector('.ch-track');
  const wheel = section.querySelector('.ch-wheel');
  const arc = section.querySelector('.ch-arc');
  const nodes = [...section.querySelectorAll('.ch-node')];
  const panel = section.querySelector('.ch-active');
  const countEl = section.querySelector('.ch-count b');
  const dotEls = [...section.querySelectorAll('.ch-dots i')];
  const nav = document.querySelector('.cb-nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const ActivePanel = c => `
    <span class="ch-active__icon ch-anim${c.logo ? ' has-logo' : ''}">${careerIcon(c, 38)}</span>
    <h3 class="ch-active__title ch-anim" style="--d:40ms">${esc(c.title)}</h3>
    <p class="ch-active__tagline ch-anim" style="--d:90ms">${esc(c.tagline)}</p>
    <ul class="ch-active__skills" aria-label="Key skills">${c.skills.map((s, k) => `<li class="ch-anim" style="--d:${140 + k * 45}ms">${skillIcon(s)}${esc(s)}</li>`).join('')}</ul>
    <a class="ch-active__cta ch-anim" style="--d:360ms" href="${CONFIG.ctaHref}" data-track="readiness" data-cta-keep data-location="career-horizon" data-career="${c.id}">Explore This Career <span aria-hidden="true">→</span></a>`;

  /* ---------- State ---------- */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ease = t => t * t * (3 - 2 * t);
  let mode = '', navH = 0, stepPx = 0, startHold = 0;
  let cur = 0, target = 0, running = false, active = -1;
  let maxDn = 2.5, fadeActive = true;
  const nodeCache = nodes.map(() => ({ t: '', o: '', v: null }));

  function setActive(i) {
    if (i === active) return;
    active = i;
    panel.innerHTML = ActivePanel(careers[i]);
    panel.classList.remove('is-in');
    void panel.offsetWidth; // restart entrance animation
    panel.classList.add('is-in');
    countEl.textContent = pad(i + 1);
    dotEls.forEach((d, k) => d.classList.toggle('on', k === i));
    nodes.forEach(n => n.classList.toggle('is-active', +n.dataset.career === i));
  }

  function render() {
    const rot = -cur * (360 / N) / copies; // = -cur × step
    wheel.style.transform = `rotate(${rot.toFixed(3)}deg)`;
    nodes.forEach((node, s) => {
      let d = ((s * step + rot) % 360 + 540) % 360 - 180; // angle from 12 o'clock, −180…180
      const dn = Math.abs(d) / step;
      let scale, op;
      if (dn <= 1) { scale = 1 - 0.2 * dn; op = 1 - 0.25 * dn; }
      else if (dn <= 2) { scale = 0.8 - 0.18 * (dn - 1); op = 0.75 - 0.3 * (dn - 1); }
      else { scale = 0.62; op = Math.max(0, 0.45 - (dn - 2) * 0.9); }
      if (dn > maxDn) op = Math.max(0, op - (dn - maxDn) * 2);
      if (fadeActive) op *= clamp((dn - 0.12) / 0.5, 0, 1); // the active career is shown in the panel above
      const t = `translate(-50%,-28px) rotate(${(-rot).toFixed(3)}deg) scale(${scale.toFixed(3)})`;
      const o = op.toFixed(3);
      const vis = op > 0.02;
      const c = nodeCache[s];
      if (c.t !== t) { node.style.transform = t; c.t = t; }
      if (c.o !== o) { node.style.opacity = o; c.o = o; }
      if (c.v !== vis) { node.style.visibility = vis ? '' : 'hidden'; c.v = vis; }
    });
    setActive(((Math.round(cur) % N) + N) % N);
  }

  function tick() {
    const diff = target - cur;
    if (Math.abs(diff) < 0.0008 || reduceMotion.matches) { cur = target; running = false; render(); return; }
    cur += diff * CONFIG.smoothing;
    render();
    requestAnimationFrame(tick);
  }
  const animate = () => { if (!running) { running = true; requestAnimationFrame(tick); } };

  /* ---------- Scroll mode (desktop / tablet) ---------- */
  function scrollTarget() {
    const rect = track.getBoundingClientRect();
    const p = clamp((navH - rect.top - startHold) / stepPx, 0, N - 1);
    const base = Math.min(Math.floor(p), N - 1);
    const frac = p - base;
    return base + ease(clamp((frac - CONFIG.pause) / (1 - 2 * CONFIG.pause), 0, 1));
  }
  const onScroll = () => { if (mode === 'scroll') { target = scrollTarget(); animate(); } };

  function goTo(i) {
    if (mode === 'scroll') {
      const k = clamp(i, 0, N - 1);
      const top = track.getBoundingClientRect().top + window.scrollY - navH + startHold + k * stepPx;
      window.scrollTo({ top, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    } else {
      const here = ((Math.round(target) % N) + N) % N;
      let delta = ((i - here) % N + N) % N;
      if (delta > N / 2) delta -= N; // shortest way round
      target = Math.round(target) + delta;
      animate();
    }
  }

  /* ---------- Layout / mode ---------- */
  function layout() {
    const w = window.innerWidth, h = window.innerHeight;
    navH = nav ? nav.getBoundingClientRect().height : 0;
    section.style.setProperty('--ch-nav', `${Math.round(navH)}px`);
    const next = !reduceMotion.matches && w >= 768 && h >= 620 ? 'scroll' : 'step';
    maxDn = w >= 1200 ? 2.5 : w >= 1000 ? 2.2 : w >= 768 ? 1.6 : 1.35;
    fadeActive = w >= 768;
    if (next !== mode) {
      mode = next;
      section.classList.toggle('ch--scroll', mode === 'scroll');
      section.classList.toggle('ch--step', mode === 'step');
      // Announce career changes only when they come from explicit prev/next/swipe, not from scrolling.
      if (mode === 'step') panel.setAttribute('aria-live', 'polite'); else panel.removeAttribute('aria-live');
      if (mode === 'step') { target = cur = ((Math.round(cur) % N) + N) % N; }
    }
    if (mode === 'scroll') {
      stepPx = h * CONFIG.scrollPerCareerVh;
      startHold = h * CONFIG.startHoldVh;
      track.style.height = `${Math.round(h - navH + startHold + stepPx * (N - 1) + h * CONFIG.endHoldVh)}px`;
      target = cur = scrollTarget();
    } else {
      track.style.height = '';
    }
    render();
  }

  /* ---------- Interaction ---------- */
  wheel.addEventListener('click', e => {
    const node = e.target.closest('.ch-node');
    if (node) goTo(+node.dataset.career);
  });
  section.querySelectorAll('.ch-stepbtn').forEach(btn => btn.addEventListener('click', () => {
    const dir = +btn.dataset.dir;
    goTo(mode === 'scroll' ? active + dir : (active + dir + N) % N);
  }));

  let touchX = null, touchY = null;
  arc.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; }, { passive: true });
  arc.addEventListener('touchend', e => {
    if (touchX === null || mode !== 'step') return;
    const dx = e.changedTouches[0].clientX - touchX, dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) goTo((active + (dx < 0 ? 1 : -1) + N) % N);
  }, { passive: true });

  let resizeRaf = 0;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { cancelAnimationFrame(resizeRaf); resizeRaf = requestAnimationFrame(layout); });
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', () => { mode = ''; layout(); });
  layout();
})();
