(() => {
  const core = document.createElement('script');
  core.src = '/assets/tracking-core.js?v=20260911-1';
  core.onload = () => {
    const pricing = document.querySelector('#pricing');
    if (!pricing) return;

    const button = pricing.querySelector('[data-track="membership"]');
    if (button) button.innerHTML = 'Get CareerPilot — ₹1,999 <i class="bi bi-arrow-right"></i>';

    const trust = pricing.querySelector('.cp-trust-row');
    if (trust) trust.innerHTML = `
      <div><i class="bi bi-shield-lock"></i><b>Secure Payment</b><span>Protected checkout</span></div>
      <div><i class="bi bi-calendar-check"></i><b>12 Months Access</b><span>One-time payment</span></div>
      <div><i class="bi bi-headset"></i><b>Student Support</b><span>Help when you need it</span></div>`;

    const reassurance = pricing.querySelector('.cp-gift');
    if (reassurance) reassurance.innerHTML = '<i class="bi bi-check-circle"></i><span><b>₹1,999 one-time</b> • 12 months access • No monthly subscription</span>';

    const bottom = pricing.querySelector('.cp-price-bottom');
    if (bottom) bottom.innerHTML = `
      <div><i class="bi bi-buildings"></i><span><b>Built by CodeBegun</b><span>Career & technology learning ecosystem</span></span></div>
      <div><i class="bi bi-people"></i><span><b>Industry-Designed</b><span>Built around employability skills</span></span></div>
      <div><i class="bi bi-signpost-split"></i><span><b>Personalized Journey</b><span>Assessment → gaps → roadmap → action</span></span></div>
      <div><i class="bi bi-calendar-check"></i><span><b>12 Months Access</b><span>One membership, full CareerPilot journey</span></span></div>`;

    const style = document.createElement('style');
    style.textContent = `.cp-trust-row span{display:block;color:#66728a;font-size:9px;line-height:1.35;margin-top:3px}.cp-gift b{color:#051D64}.cp-price-right>a.btn+ .cp-trust-row{margin-top:16px}`;
    document.head.appendChild(style);
  };
  core.onerror = () => console.error('CareerPilot tracking core failed to load');
  document.head.appendChild(core);
})();
