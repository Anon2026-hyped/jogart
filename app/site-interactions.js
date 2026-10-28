/* ==========================================================
   JOGAT Green Inc. — prototype interactions
   ========================================================== */

/* ---------- 1. IMAGE SOURCES — replace these to swap images ----------
   Leave a value empty ('') to show the labelled placeholder.
   Use a local path (e.g. 'assets/hero.jpg') or any image URL you have the right to use. */
const svg=(a,b,x)=>'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient><pattern id="w" width="26" height="30" patternUnits="userSpaceOnUse"><rect x="6" y="8" width="14" height="16" fill="#9fc5d6"/></pattern></defs><rect width="800" height="600" fill="url(#g)"/><circle cx="650" cy="120" r="64" fill="#fff" opacity=".6"/><path d="M0 460Q200 400 400 450T800 430V600H0Z" fill="#2a9d62" opacity=".3"/><rect y="500" width="800" height="100" fill="#1b4d38"/><rect y="500" width="800" height="8" fill="#c8e86b" opacity=".7"/>'+x+'</svg>');
const bin=(x,c,s=1)=>`<g transform="translate(${x} 500) scale(${s})"><path d="M-40-110h80l-8 110h-64z" fill="${c}"/><rect x="-46" y="-126" width="92" height="18" rx="6" fill="${c}"/><path d="M-12-62l12-16 12 16m-12-16v36" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const house=x=>`<g transform="translate(${x} 500)"><rect x="-70" y="-120" width="140" height="120" fill="#f6f1e6"/><path d="M-86-116L0-190 86-116z" fill="#c9553d"/><rect x="-18" y="-70" width="36" height="70" fill="#7a5a3a"/><rect x="-55" y="-98" width="26" height="26" fill="#bfe3f2"/><rect x="29" y="-98" width="26" height="26" fill="#bfe3f2"/></g>`;
const tower=(x,w,h)=>`<g transform="translate(${x} 500)"><rect y="${-h}" width="${w}" height="${h}" fill="#e6edf0"/><rect y="${-h}" width="${w}" height="${h}" fill="url(#w)"/></g>`;
const truck=x=>`<g transform="translate(${x} 505)"><rect x="-150" y="-125" width="190" height="105" rx="8" fill="#2a9d62"/><path d="M48-95h58l30 42v33H48z" fill="#c8e86b"/><rect x="62" y="-82" width="36" height="28" fill="#bfe3f2"/><circle cx="-90" cy="-12" r="22" fill="#12261d"/><circle cx="85" cy="-12" r="22" fill="#12261d"/><path d="M-82-60l14-22 14 22m-14-22v46" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(-6 8)"/></g>`;
const plant=x=>`<g transform="translate(${x} 500)"><rect x="-130" y="-120" width="260" height="120" fill="#e3eae6"/><path d="M-130-120l65-45v45l65-45v45l65-45v45z" fill="#cfd9d4"/><rect x="70" y="-250" width="34" height="130" fill="#b4c3ba"/><circle cx="90" cy="-270" r="24" fill="#fff" opacity=".8"/><rect x="-100" y="-80" width="44" height="80" fill="#1b4d38"/></g>`;
const dome=x=>`<g transform="translate(${x} 500)"><path d="M-110 0v-80a110 100 0 0 1 220 0v80z" fill="#eef3ef"/><path d="M-110-80h220" stroke="#b4c3ba" stroke-width="6"/><path d="M10-150L-24-90h26l-10 56 40-70H6z" fill="#e3b93c"/></g>`;
const tank=x=>`<g transform="translate(${x} 500)"><rect x="-60" y="-130" width="120" height="130" rx="14" fill="#cfe6d8"/><rect x="-60" y="-70" width="120" height="8" fill="#2a9d62"/></g>`;
const crate=(x,y,c)=>`<rect x="${x}" y="${y}" width="60" height="44" rx="6" fill="${c}"/>`;
const IMAGES = {
  'hero': svg('#cdeedd','#f1faf4', tower(60,110,230)+tower(190,90,150)+bin(350,'#2a9d62')+bin(420,'#2f78b7')+truck(620)),
  'residential': svg('#d6efe0','#f6fbf7', house(200)+house(500)+bin(350,'#2a9d62',1.1)+bin(690,'#2f78b7')),
  'residential-2': svg('#e0f0e6','#f7fbf8', house(170)+truck(540)+crate(300,456,'#c99a5b')+crate(300,412,'#b7864a')),
  'commercial': svg('#d8eaf2','#f3f9fb', tower(70,130,260)+tower(230,110,190)+tower(370,150,300)+bin(600,'#2a9d62')+bin(670,'#e3b93c')),
  'industrial': svg('#dfe8e2','#f4f8f5', plant(250)+truck(620)+crate(80,456,'#c99a5b')),
  'recycling': svg('#d4eedd','#f3faf5', bin(200,'#2f78b7',1.6)+bin(400,'#2a9d62',1.6)+bin(600,'#e3b93c',1.6)),
  'energy': svg('#cfe8f0','#f1f9f4', dome(260)+tank(470)+tank(610)),
  'about': svg('#d6efe0','#f6fbf7', truck(280)+house(580)+bin(710,'#2f78b7',.8)),
  'consulting': svg('#e3f1e6','#f7fbf8', '<g transform="translate(260 500)"><rect y="-100" width="50" height="100" fill="#8fd3ac"/><rect x="70" y="-170" width="50" height="170" fill="#2a9d62"/><rect x="140" y="-250" width="50" height="250" fill="#1f7a4d"/><rect x="210" y="-330" width="50" height="330" fill="#c8e86b"/></g>')
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
  function selectTab(btn, focus) {
    tabBtns.forEach(b => {
      const on = b === btn;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      $('#' + b.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) btn.focus();
  }
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
      status.textContent = 'Thanks — your inquiry looks good. (Prototype only: no message was sent.)';
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
