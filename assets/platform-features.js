/* CareerPilot — staggered reveal for the "Everything Inside CareerPilot" cards. */
(() => {
  const section = document.querySelector('.fx');
  if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = [...section.querySelectorAll('.fx-card')];
  section.classList.add('fx-js');
  cards.forEach((card, i) => card.style.setProperty('--d', `${(i % 3) * 70 + Math.floor(i / 3) * 40}ms`));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  cards.forEach(card => io.observe(card));
})();
