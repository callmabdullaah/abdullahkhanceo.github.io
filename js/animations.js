/* Progressive enhancement: content remains visible when scripts are disabled. */
(() => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animatedStats = new Set();
  let revealObserver;
  let statsObserver;
  const runningFrames = new Map();

  function finishAnimations() {
    revealObserver?.disconnect();
    statsObserver?.disconnect();
    document.querySelectorAll('.reveal-pending').forEach(element => {
      element.classList.remove('reveal-pending');
      element.classList.add('is-visible');
    });
    runningFrames.forEach((frame, element) => {
      cancelAnimationFrame(frame);
      element.textContent = element.dataset.finalValue;
    });
    runningFrames.clear();
  }

  if (!motionPreference.matches && 'IntersectionObserver' in window) {
    // Reveal once, with small stagger within each row.
    const targets = document.querySelectorAll('.hero-intro, .hero-side-copy, .showcase-frame, .about-copy, .about-portrait, .service, .work, .process-grid article, .testimonial-card, .cta, .contact-grid');
    targets.forEach(element => {
      element.classList.add('reveal-pending');
      const siblings = Array.from(element.parentElement.children);
      const index = siblings.indexOf(element);
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
    });
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.classList.remove('reveal-pending');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
    targets.forEach(element => revealObserver.observe(element));

    // Start counters only when the stats enter the viewport, once per page visit.
    statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const element = entry.target;
        if (!entry.isIntersecting || animatedStats.has(element)) return;
        animatedStats.add(element);
        statsObserver.unobserve(element);
        const finalValue = element.textContent.trim();
        const target = Number.parseInt(finalValue, 10);
        if (!Number.isFinite(target)) return;
        element.dataset.finalValue = finalValue;
        const suffix = finalValue.replace(/^\d+/, '');
        const startTime = performance.now();
        const duration = 1400;
        const animate = time => {
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1 && !motionPreference.matches) {
            runningFrames.set(element, requestAnimationFrame(animate));
          } else {
            element.textContent = finalValue;
            runningFrames.delete(element);
          }
        };
        runningFrames.set(element, requestAnimationFrame(animate));
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.stats strong').forEach(element => statsObserver.observe(element));
  }

  // A single passive listener, batched to one update per frame.
  const navbar = document.querySelector('.navbar');
  let scrollFrame = 0;
  const updateNavbar = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 30);
    scrollFrame = 0;
  };
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateNavbar);
  }, { passive: true });
  updateNavbar();
  motionPreference.addEventListener('change', event => {
    if (event.matches) finishAnimations();
  });
})();
