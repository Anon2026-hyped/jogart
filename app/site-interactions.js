/* ==========================================================
   JOGAT Green Inc. — prototype interactions
   ========================================================== */

const IMAGES = {
  'hero': '/images/Out_warehouse.jpg',
  'residential': '/images/Residential.jpg',
  'residential-2': '/images/Residential_waste_bin_pickup.jpg',
  'commercial': '/images/In_warehouse.jpg',
  'industrial': '/images/Out_warehouse.jpg',
  'recycling': '/images/Recycling.jpg',
  'energy': '/images/Power_Plants.jpg',
  'about': '/images/Team_members.jpg',
  'consulting': '/images/In_warehouse.jpg'
};

export function initializeSite() {
  'use strict';
  if (document.documentElement.dataset.jogatInitialized === 'true') return;
  document.documentElement.dataset.jogatInitialized = 'true';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Apply images ---------- */
  $$('.media[data-img]').forEach(el => {
    const url = IMAGES[el.dataset.img];
    if (url) {
      el.style.backgroundImage = `url("${url}")`;
      el.classList.add('has-img');
    }
  });

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeBtn = $('#theme-toggle');
  try { const saved = localStorage.getItem('jogat-theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}
  if (!root.getAttribute('data-theme')) root.setAttribute('data-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function syncThemeBtn() {
    const dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  const SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" fill="currentColor"/></svg>';
  const toast = $('#theme-toast');
  const labelEl = $('#theme-label');
  let toastTimer;
  function syncLabels() {
    const dark = root.getAttribute('data-theme') === 'dark';
    labelEl.textContent = dark ? 'Light mode' : 'Dark mode';
  }
  function showToast(dark) {
    $('#toast-ico').innerHTML = dark ? MOON : SUN;
    $('#toast-title').textContent = dark ? 'Dark mode on' : 'Light mode on';
    $('#toast-sub').textContent = dark ? 'Easier on the eyes at night' : 'Bright and clear';
    toast.classList.remove('show'); void toast.offsetWidth; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }
  function applyTheme(next) {
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('jogat-theme', next); } catch (e) {}
    syncThemeBtn(); syncLabels(); showToast(next === 'dark');
  }
  themeBtn.addEventListener('click', e => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (document.startViewTransition && !reduceMotion) {
      const r = themeBtn.getBoundingClientRect();
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const vt = document.startViewTransition(() => applyTheme(next));
      vt.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(.22,.61,.36,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(() => {});
    } else {
      document.body.classList.add('theme-fade');
      applyTheme(next);
      setTimeout(() => document.body.classList.remove('theme-fade'), 600);
    }
  });
  syncLabels();
  syncThemeBtn();

  /* ---------- Header: solid on scroll, hide on scroll-down ---------- */
  const header = $('#header');
  let lastY = window.scrollY, ticking = false;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    const menuOpen = $('#nav-links').classList.contains('open');
    header.classList.toggle('hide', y > lastY && y > 400 && !menuOpen);
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('#menu-btn'), navLinks = $('#nav-links');
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 960) setMenu(false); });

  /* ---------- Active nav link while scrolling ---------- */
  const navAnchors = $$('.nav-links a[href^="#"]:not(.btn)');
  const sections = navAnchors.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---------- Tabs (arrow keys, Home/End) ---------- */
  const tabs = $('[data-tabs]');
  const tabBtns = $$('[role="tab"]', tabs);
  const rotationButton = $('.tab-rotation-toggle', tabs);
  const rotationDelay = 6000;
  let rotationPaused = reduceMotion;
  let rotationTimer;
  function stopRotation() {
    clearTimeout(rotationTimer);
  }
  function scheduleRotation() {
    stopRotation();
    if (rotationPaused || reduceMotion || document.hidden || tabs.matches(':hover') || tabs.querySelector('[role="tab"]:focus')) return;
    rotationTimer = setTimeout(() => {
      const currentIndex = tabBtns.findIndex(b => b.getAttribute('aria-selected') === 'true');
      selectTab(tabBtns[(currentIndex + 1) % tabBtns.length]);
    }, rotationDelay);
  }
  function syncRotationButton() {
    const action = rotationPaused ? 'Resume' : 'Pause';
    rotationButton.textContent = action;
    rotationButton.setAttribute('aria-label', `${action} automatic tab rotation`);
    rotationButton.setAttribute('aria-pressed', String(rotationPaused));
  }
  rotationButton.hidden = reduceMotion;
  syncRotationButton();
  function selectTab(btn, focus) {
    tabBtns.forEach(b => {
      const on = b === btn;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      $('#' + b.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) btn.focus();
    scheduleRotation();
  }
  rotationButton.addEventListener('click', () => {
    rotationPaused = !rotationPaused;
    syncRotationButton();
    scheduleRotation();
  });
  tabs.addEventListener('mouseenter', stopRotation);
  tabs.addEventListener('mouseleave', scheduleRotation);
  tabs.addEventListener('focusin', stopRotation);
  tabs.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!tabs.contains(document.activeElement)) scheduleRotation();
    });
  });
  document.addEventListener('visibilitychange', scheduleRotation);
  tabBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => selectTab(btn));
    btn.addEventListener('keydown', e => {
      let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabBtns.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + tabBtns.length) % tabBtns.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabBtns.length - 1;
      if (n !== null) { e.preventDefault(); selectTab(tabBtns[n], true); }
    });
  });
  // Division cards open the matching tab
  $$('[data-tab-link]').forEach(a => a.addEventListener('click', () => {
    const t = $('#tab-' + a.dataset.tabLink); if (t) selectTab(t);
  }));
  scheduleRotation();

  /* ---------- Pre-select inquiry topic from CTA buttons ---------- */
  const topic = $('#f-topic');
  $$('[data-inquiry]').forEach(a => a.addEventListener('click', () => {
    const v = a.dataset.inquiry;
    const opt = Array.from(topic.options).find(o => o.text === v);
    if (opt) topic.value = opt.value || opt.text;
  }));

  /* ---------- Contact form (frontend demo — nothing is sent) ---------- */
  const form = $('#inquiry-form'), status = $('#form-status');
  const rules = {
    name:    { el: $('#f-name'),  err: $('#e-name'),  test: v => v.trim().length >= 2, msg: 'Please enter your name.' },
    email:   { el: $('#f-email'), err: $('#e-email'), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: 'Please enter a valid email address.' },
    phone:   { el: $('#f-phone'), err: $('#e-phone'), test: v => /^\+?[\d\s().-]+$/.test(v.trim()) && (v.match(/\d/g) || []).length >= 7 && (v.match(/\d/g) || []).length <= 15, msg: 'Please enter a valid phone number with 7 to 15 digits.' },
    topic:   { el: $('#f-topic'), err: $('#e-topic'), test: v => v !== '', msg: 'Please choose a service.' },
    message: { el: $('#f-msg'),   err: $('#e-msg'),   test: v => v.trim().length >= 10, msg: 'Please add a few details (at least 10 characters).' }
  };
  function check(rule) {
    const ok = rule.test(rule.el.value);
    rule.el.closest('.field').classList.toggle('invalid', !ok);
    rule.el.setAttribute('aria-invalid', String(!ok));
    rule.err.textContent = ok ? '' : rule.msg;
    return ok;
  }
  Object.values(rules).forEach(r => {
    r.el.addEventListener('blur', () => check(r));
    r.el.addEventListener('input', () => { if (r.el.closest('.field').classList.contains('invalid')) check(r); });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = '';
    const results = Object.values(rules).map(check);
    if (results.every(Boolean)) {
      status.textContent = 'Your inquiry passed validation. This form does not send messages yet.';
      form.reset();
    } else {
      const first = Object.values(rules).find(r => !r.test(r.el.value));
      if (first) first.el.focus();
    }
  });


  /* ---------- Motion enhancements ---------- */
  // 1) Move each picture into its own layer so we can zoom / parallax it without moving the frame
  const layered = $$('.media.has-img').map(el => {
    const url = el.style.backgroundImage;
    el.style.backgroundImage = 'none';
    const layer = document.createElement('span');
    layer.className = 'media-img';
    layer.style.backgroundImage = url;
    el.prepend(layer);
    return { el, layer };
  });

  // 2) Curtain-wipe reveal when images scroll into view
  if ('IntersectionObserver' in window && !reduceMotion) {
    const imgIO = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('shown'); obs.unobserve(en.target); } });
    }, { threshold: 0.15 });
    layered.forEach(({ el }, i) => {
      el.style.transitionDelay = (el.closest('.hero-art') ? (i % 3) * 140 : 0) + 'ms';
      imgIO.observe(el);
    });
  } else {
    layered.forEach(({ el }) => el.classList.add('shown'));
  }

  // 3) Reveal direction variants
  $$('.about-media, .consult-feature').forEach(el => el.classList.add('from-left'));
  $$('.energy-banner, .form').forEach(el => el.classList.add('zoom'));
  $$('.about-copy .reveal, .contact-copy .reveal').forEach(el => el.classList.add('from-right'));

  // 5) Count-up numbers in the hero facts
  $$('.hero-facts strong').forEach(el => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target) || String(target) !== el.textContent.trim() || reduceMotion) return;
    el.textContent = '0';
    const run = () => {
      const t0 = performance.now();
      const tick = t => {
        const p = Math.min(1, (t - t0) / 1400);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const o = new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { run(); ob.disconnect(); } }, { threshold: .4 });
      o.observe(el);
    } else { run(); }
  });

  // 6) Scroll progress bar + gentle image parallax (one rAF-throttled handler)
  const bar = $('#scroll-progress');
  const parallaxEls = layered.filter(({ el }) => !el.closest('.hero-art') && !el.classList.contains('panel-media'));
  let rafPending = false;
  function motionFrame() {
    rafPending = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    if (reduceMotion) return;
    parallaxEls.forEach(({ el, layer }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      layer.style.setProperty('--py', (p * -14).toFixed(1) + 'px');
    });
  }
  addEventListener('scroll', () => { if (!rafPending) { rafPending = true; requestAnimationFrame(motionFrame); } }, { passive: true });
  addEventListener('resize', motionFrame);
  motionFrame();

  /* ---------- Footer year ---------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
}
