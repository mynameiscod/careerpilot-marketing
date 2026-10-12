/* CareerPilot — "Code Visualizer" demo: steps through a program line by line,
   animating the call stack, variables, heap array and console output. */
(() => {
  const root = document.querySelector('[data-code-visualizer]');
  if (!root) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Example 1: recursion and the call stack ---------------------------------
  const factCode = [
    'public class Main {',
    '    static int fact(int n) {',
    '        if (n <= 1) return 1;',
    '        return n * fact(n - 1);',
    '    }',
    '',
    '    public static void main(String[] args) {',
    '        int result = fact(3);',
    '        System.out.println(result);',
    '    }',
    '}'
  ];
  const M = vars => ({ id: 'main', fn: 'main(args)', vars });
  const F = (n, vars, ret) => ({ id: 'f' + n, fn: `fact(${n})`, vars: { n, ...vars }, ret });
  const factSteps = [
    { line: 7, frames: [M({})], msg: 'Execution starts in <code>main()</code>. A stack frame for main is pushed onto the call stack.' },
    { line: 8, frames: [M({ result: '?' })], msg: '<code>main()</code> needs the value of <code>fact(3)</code>, so it pauses here and makes a call.' },
    { line: 2, frames: [M({ result: '?' }), F(3)], msg: '<code>fact(3)</code> is called — a new frame with <code>n = 3</code> is pushed on top of the stack.' },
    { line: 3, frames: [M({ result: '?' }), F(3)], msg: 'Check the base case: is <code>3 &lt;= 1</code>? No — so we skip the return.' },
    { line: 4, frames: [M({ result: '?' }), F(3)], msg: '<code>3 * fact(2)</code> — fact(3) must wait until fact(2) returns.' },
    { line: 2, frames: [M({ result: '?' }), F(3), F(2)], msg: '<code>fact(2)</code> is pushed. Three frames are now on the stack.' },
    { line: 3, frames: [M({ result: '?' }), F(3), F(2)], msg: 'Is <code>2 &lt;= 1</code>? No — keep recursing.' },
    { line: 4, frames: [M({ result: '?' }), F(3), F(2)], msg: '<code>2 * fact(1)</code> — one more recursive call.' },
    { line: 2, frames: [M({ result: '?' }), F(3), F(2), F(1)], msg: '<code>fact(1)</code> is pushed. This is the deepest point of the recursion.' },
    { line: 3, frames: [M({ result: '?' }), F(3), F(2), F(1, {}, 1)], msg: 'Base case reached! <code>1 &lt;= 1</code> is true, so fact(1) returns <code>1</code>.' },
    { line: 4, frames: [M({ result: '?' }), F(3), F(2, { 'fact(1)': 1 }, 2)], msg: 'fact(1) is popped off the stack. Back in fact(2): <code>2 * 1 = 2</code>, so it returns 2.' },
    { line: 4, frames: [M({ result: '?' }), F(3, { 'fact(2)': 2 }, 6)], msg: 'fact(2) is popped. Back in fact(3): <code>3 * 2 = 6</code>, so it returns 6.' },
    { line: 8, frames: [M({ result: 6 })], msg: 'fact(3) is popped. The returned value <code>6</code> is stored in <code>result</code>.' },
    { line: 9, frames: [M({ result: 6 })], out: ['6'], msg: '<code>println</code> writes <code>6</code> to the console.' },
    { line: 10, frames: [], out: ['6'], msg: '<code>main()</code> finishes and its frame is popped. The stack is empty — the program ends.' }
  ];

  // ---- Example 2: arrays, references and two pointers --------------------------
  const revCode = [
    'import java.util.Arrays;',
    '',
    'public class Main {',
    '    static void reverse(int[] a) {',
    '        int i = 0, j = a.length - 1;',
    '        while (i < j) {',
    '            int t = a[i];',
    '            a[i] = a[j];',
    '            a[j] = t;',
    '            i++; j--;',
    '        }',
    '    }',
    '',
    '    public static void main(String[] args) {',
    '        int[] a = {4, 8, 15, 16, 23};',
    '        reverse(a);',
    '        System.out.println(Arrays.toString(a));',
    '    }',
    '}'
  ];
  const revSteps = (() => {
    const steps = [];
    const arr = [4, 8, 15, 16, 23];
    const ref = '→ int[5]';
    const main = () => ({ id: 'main', fn: 'main(args)', vars: { a: ref } });
    const rev = vars => ({ id: 'rev', fn: 'reverse(a)', vars: { a: ref, ...vars } });
    const mem = (ptr = {}, hl = [], done = []) => ({ values: [...arr], ptr, hl, done: [...done] });
    const done = [];
    steps.push({ line: 14, frames: [{ id: 'main', fn: 'main(args)', vars: {} }], msg: 'Execution starts in <code>main()</code> — its frame is pushed onto the stack.' });
    steps.push({ line: 15, frames: [main()], arr: mem(), msg: 'An array of 5 ints is created on the <b>heap</b>. The variable <code>a</code> only stores a reference to it.' });
    steps.push({ line: 16, frames: [main()], arr: mem(), msg: 'Call <code>reverse(a)</code> — the reference is copied, not the whole array.' });
    steps.push({ line: 4, frames: [main(), rev({})], arr: mem(), msg: 'A frame for <code>reverse</code> is pushed. Its <code>a</code> points to the <i>same</i> array as main’s.' });
    let i = 0, j = arr.length - 1;
    steps.push({ line: 5, frames: [main(), rev({ i, j })], arr: mem({ i, j }), msg: `Two pointers: <code>i</code> starts at the first index, <code>j</code> at the last (<code>a.length - 1 = ${j}</code>).` });
    while (i < j) {
      steps.push({ line: 6, frames: [main(), rev({ i, j })], arr: mem({ i, j }, [], done), msg: `Check <code>${i} &lt; ${j}</code> → true, so we enter the loop.` });
      const t = arr[i];
      steps.push({ line: 7, frames: [main(), rev({ i, j, t })], arr: mem({ i, j }, [i], done), msg: `Save the left value: <code>t = a[${i}] = ${t}</code>.` });
      arr[i] = arr[j];
      steps.push({ line: 8, frames: [main(), rev({ i, j, t })], arr: mem({ i, j }, [i], done), msg: `Copy the right value into the left slot: <code>a[${i}] = a[${j}] = ${arr[j]}</code>.` });
      arr[j] = t;
      done.push(i, j);
      steps.push({ line: 9, frames: [main(), rev({ i, j, t })], arr: mem({ i, j }, [j], done), msg: `Put the saved value on the right: <code>a[${j}] = t = ${t}</code>. Swap complete!` });
      i++; j--;
      steps.push({ line: 10, frames: [main(), rev({ i, j, t })], arr: mem({ i, j }, [], done), msg: `Move both pointers inward: <code>i = ${i}</code>, <code>j = ${j}</code>.` });
    }
    steps.push({ line: 6, frames: [main(), rev({ i, j })], arr: mem({ i, j }, [], done), msg: `Check <code>${i} &lt; ${j}</code> → false. The pointers met, so the loop ends.` });
    const all = arr.map((_, k) => k);
    steps.push({ line: 12, frames: [main()], arr: mem({}, [], all), msg: '<code>reverse()</code> returns and its frame is popped. The array on the heap stays reversed.' });
    const out = ['[' + arr.join(', ') + ']'];
    steps.push({ line: 17, frames: [main()], arr: mem({}, [], all), out, msg: 'main’s <code>a</code> points to the same array, so it prints the reversed values — the array was changed <b>in place</b>.' });
    steps.push({ line: 18, frames: [], arr: mem({}, [], all), out, msg: '<code>main()</code> finishes and is popped. The stack is empty — program complete.' });
    return steps;
  })();

  const examples = {
    recursion: { code: factCode, steps: factSteps },
    arrays: { code: revCode, steps: revSteps }
  };

  // ---- Syntax highlighting (enough for the snippets above) ---------------------
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const highlight = line => esc(line).replace(
    /(\/\/.*$)|("[^"]*")|\b(public|static|void|class|return|if|while|import|new)\b|\b(int|String|Main|System|Arrays)\b|\b(\d+)\b|\b([a-zA-Z_]\w*)(?=\()/g,
    (m, c, s, k, t, n, f) => c ? `<span class="tk-c">${m}</span>` : s ? `<span class="tk-s">${m}</span>` : k ? `<span class="tk-k">${m}</span>` : t ? `<span class="tk-t">${m}</span>` : n ? `<span class="tk-n">${m}</span>` : `<span class="tk-f">${m}</span>`
  );

  // ---- Elements ----------------------------------------------------------------
  const $ = sel => root.querySelector(sel);
  const codeEl = $('.cvz-code'), msgEl = $('.cvz-msg'), stepLbl = $('.cvz-step-lbl'), stackEl = $('.cvz-stack'),
    depthEl = $('.cvz-depth'), memEl = $('.cvz-mem'), outEl = $('.cvz-console'), progEl = $('.cvz-prog span'),
    countEl = $('.cvz-count'), playBtn = $('[data-act="play"]'), prevBtn = $('[data-act="prev"]'),
    nextBtn = $('[data-act="next"]'), speedSel = $('.cvz-speed'), tabs = [...root.querySelectorAll('.cvz-tab')];

  let ex = examples.recursion, idx = 0, timer = null, prevStep = null;

  const renderCode = () => {
    codeEl.innerHTML = ex.code.map((l, k) => `<div class="cvz-line" data-l="${k + 1}"><span class="no">${k + 1}</span><span>${highlight(l) || ' '}</span></div>`).join('');
  };

  const renderStack = (step, back) => {
    const prev = prevStep ? prevStep.frames : [];
    const nowIds = new Set(step.frames.map(f => f.id));
    const prevMap = Object.fromEntries(prev.map(f => [f.id, f]));
    const html = [];
    // Popped frames animate out on top of the stack before disappearing (forward only).
    if (!back && !reduced) prev.filter(f => !nowIds.has(f.id)).reverse().forEach(f => html.push(frameHtml(f, false, 'is-out', null)));
    [...step.frames].reverse().forEach((f, k) => {
      const isNew = !back && !prevMap[f.id];
      html.push(frameHtml(f, k === 0, isNew ? 'is-in' : '', prevMap[f.id]));
    });
    stackEl.innerHTML = html.length ? html.join('') : '<div class="cvz-empty">Call stack is empty</div>';
    if (!back && !reduced) setTimeout(() => stackEl.querySelectorAll('.is-out').forEach(n => n.remove()), 450);
    depthEl.textContent = `${step.frames.length} frame${step.frames.length === 1 ? '' : 's'}`;
  };

  const frameHtml = (f, top, cls, before) => {
    const vars = Object.entries(f.vars).map(([k, v]) => {
      const chg = before && before.vars[k] !== v && !reduced;
      return `<span class="cvz-var${chg ? ' is-chg' : ''}">${esc(k)} = <b>${esc(String(v))}</b></span>`;
    }).join('');
    return `<div class="cvz-frame${top ? ' is-top' : ''} ${cls}"><span class="fn">${esc(f.fn)}</span>${top ? '<span class="top-tag">TOP</span>' : ''}${vars}${f.ret !== undefined ? `<span class="cvz-ret">returns ${f.ret}</span>` : ''}</div>`;
  };

  const renderMem = step => {
    const a = step.arr;
    if (!a) { memEl.innerHTML = '<span class="cvz-mem-empty">Only primitive values on the stack — nothing on the heap yet.</span>'; return; }
    memEl.innerHTML = '<div class="cvz-arr">' + a.values.map((v, k) => {
      const ptrs = Object.entries(a.ptr).filter(([, p]) => p === k).map(([n]) => `<span class="${n}">${n}</span>`).join('');
      const cls = a.hl.includes(k) ? ' is-hl' : a.done.includes(k) ? ' is-done' : '';
      return `<div class="cvz-cell${cls}"><span class="v">${v}</span><span class="ix">[${k}]</span>${ptrs ? `<span class="cvz-ptr">${ptrs}</span>` : ''}</div>`;
    }).join('') + '</div>';
  };

  const render = (back = false) => {
    const step = ex.steps[idx];
    codeEl.querySelectorAll('.is-cur,.is-prev').forEach(n => n.classList.remove('is-cur', 'is-prev'));
    if (prevStep && !back && prevStep.line !== step.line) codeEl.querySelector(`[data-l="${prevStep.line}"]`)?.classList.add('is-prev');
    const cur = codeEl.querySelector(`[data-l="${step.line}"]`);
    cur?.classList.add('is-cur');
    if (cur && codeEl.scrollHeight > codeEl.clientHeight) cur.scrollIntoView({ block: 'nearest' });
    msgEl.innerHTML = step.msg;
    stepLbl.textContent = `Step ${idx + 1} · Line ${step.line}`;
    renderStack(step, back);
    renderMem(step);
    const out = step.out || [];
    const prevOut = (prevStep && prevStep.out) || [];
    outEl.innerHTML = out.length ? out.map((l, k) => `<div${back || k < prevOut.length ? ' style="animation:none"' : ''}>${esc(l)}</div>`).join('') : '<span class="ph">// program output appears here</span>';
    progEl.style.width = `${((idx + 1) / ex.steps.length) * 100}%`;
    countEl.textContent = `${idx + 1} / ${ex.steps.length}`;
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === ex.steps.length - 1;
    prevStep = step;
  };

  const setPlaying = on => {
    clearInterval(timer); timer = null;
    playBtn.innerHTML = on ? '<i class="bi bi-pause-fill"></i>' : '<i class="bi bi-play-fill"></i>';
    playBtn.setAttribute('aria-label', on ? 'Pause' : 'Play');
    if (!on) return;
    timer = setInterval(() => {
      if (idx >= ex.steps.length - 1) return setPlaying(false);
      idx++; render();
    }, +speedSel.value);
  };

  const go = to => { const back = to < idx; idx = Math.max(0, Math.min(ex.steps.length - 1, to)); if (back) prevStep = null; render(back); };

  root.addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'play') {
      if (timer) return setPlaying(false);
      if (idx >= ex.steps.length - 1) { prevStep = null; idx = 0; render(true); }
      setPlaying(true);
    } else {
      setPlaying(false);
      if (act === 'next') go(idx + 1);
      if (act === 'prev') go(idx - 1);
      if (act === 'reset') { prevStep = null; go(0); }
    }
    if (window.cpTrack) window.cpTrack('code_visualizer_interact', null, { action: act });
  });

  speedSel.addEventListener('change', () => { if (timer) setPlaying(true); });

  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    setPlaying(false);
    ex = examples[tab.dataset.ex]; idx = 0; prevStep = null;
    renderCode(); render(true);
  }));

  renderCode(); render(true);

  // Autoplay once the demo scrolls into view (skipped for reduced-motion users).
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { io.disconnect(); setTimeout(() => { if (!timer && idx === 0) setPlaying(true); }, 600); }
    }), { threshold: .45 });
    io.observe(root);
  }
})();

/* Staggered reveal for the coding-problem domain cards. */
(() => {
  const section = document.querySelector('.cpz');
  if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = [...section.querySelectorAll('.cpz-card')];
  section.classList.add('cpz-js');
  cards.forEach((card, i) => card.style.setProperty('--d', `${(i % 2) * 70 + Math.floor(i / 2) * 60}ms`));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: .2 });
  cards.forEach(card => io.observe(card));
})();
