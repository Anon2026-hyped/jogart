const IMAGES = {
  hero: '/images/jogat-green-truck-under-steel-bridge.png',
  res: '/images/jogat-green-recycling-day.png',
  com1: '/images/jogat-green-recycling-bins-offices-institutions.png',
  com2: '/images/jogat-green-dumpsters-plaza.png',
  com3: '/images/jogat-green-dumpster-drive-thru.png',
  ind1: '/images/jogat-green-industrial-recycling-bins.png',
  road: '/images/mountain-highway-green-collection-truck.png',
  rec: '/images/jogat-green-recycling-facility-operations.png',
  bio1: '/images/aerial-jogat-green-biogas-facility.png',
  bio2: '/images/aerial-biogas-facility-farmland.png',
  esc: '/images/esc-image.png',
  card: '/images/jogat-consulting-card.jpg',
  acc: '/images/jogat-consulting-accounting.jpg',
  tax: '/images/jogat-consulting-tax.jpg',
  fin: '/images/jogat-consulting-financial-advisory.jpg',
  trn: '/images/jogat-consulting-training.jpg',
};

const SERVICES = {
  env: [
    'Residential Waste Management',
    'Commercial and Institutional Waste Management',
    'Industrial Waste Management',
    'Recycling and Waste Diversion',
    'Biogas and Waste-to-Energy',
    'Environmental Sustainability Consulting',
    'Not sure yet',
  ],
  business: [
    'Accounting and Bookkeeping',
    'Tax Planning, Preparation and Compliance',
    'Financial Management and Business Advisory',
    'Professional Training and Capacity Development',
    'Sustainability Reporting',
    'Not sure yet',
  ],
};

export function initializeSite() {
  const root = document.documentElement;
  if (root.dataset.jogatInitialized === 'true') return;
  root.dataset.jogatInitialized = 'true';

  document.querySelectorAll('[data-img]').forEach((image) => {
    const src = IMAGES[image.dataset.img];
    if (src) image.src = src;
  });

  const themeButton = document.getElementById('theme');
  if (!root.dataset.theme) {
    root.dataset.theme = 'light';
  }
  const syncThemeLabel = () => {
    themeButton?.setAttribute(
      'aria-label',
      root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
    );
  };
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    syncThemeLabel();
  });
  syncThemeLabel();

  const header = document.getElementById('header');
  const menu = document.getElementById('menu');
  const links = document.getElementById('links');
  let menuOpen = false;
  const updateHeader = () => header.classList.toggle('solid', window.scrollY > 40 || menuOpen);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  document.querySelectorAll('.links a[href^="/"]').forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    const active =
      linkPath === window.location.pathname ||
      (linkPath !== '/' && window.location.pathname.startsWith(`${linkPath}/`));
    link.classList.toggle('on', active);
    if (linkPath === window.location.pathname) link.setAttribute('aria-current', 'page');
    else if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  const setMenu = (open) => {
    menuOpen = open;
    links.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    updateHeader();
  };
  menu.addEventListener('click', () => setMenu(!menuOpen));
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) {
      setMenu(false);
      menu.focus();
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (menuOpen && !header.contains(event.target)) setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1060) setMenu(false);
  });

  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const mainImage = gallery.querySelector('figure img');
    const caption = gallery.querySelector('figcaption');
    gallery.querySelectorAll('.thumbs button').forEach((button) => {
      button.addEventListener('click', () => {
        const src = IMAGES[button.dataset.src];
        if (!src) return;
        mainImage.src = src;
        mainImage.dataset.img = button.dataset.src;
        mainImage.alt = button.dataset.alt;
        caption.textContent = button.dataset.cap;
        gallery.querySelectorAll('.thumbs button').forEach((thumb) => {
          thumb.setAttribute('aria-pressed', String(thumb === button));
        });
      });
    });
  });

  const form = document.getElementById('form');
  const topic = document.getElementById('f-topic');
  if (form && topic) {
    const fillTopics = (practice, selectedTopic = '') => {
      topic.replaceChildren(new Option('Choose a service', ''));
      SERVICES[practice].forEach((service) => {
        topic.add(new Option(service, service, false, service === selectedTopic));
      });
    };
    const setPractice = (practice, selectedTopic) => {
      const input = form.querySelector(`input[name="practice"][value="${practice}"]`);
      if (input) input.checked = true;
      fillTopics(practice, selectedTopic);
    };
    form.querySelectorAll('input[name="practice"]').forEach((input) => {
      input.addEventListener('change', () => fillTopics(input.value));
    });
    const params = new URLSearchParams(window.location.search);
    const requestedPractice = params.get('practice') === 'business' ? 'business' : 'env';
    setPractice(requestedPractice, params.get('topic') || '');

    const rules = {
      name: (value) => (value.trim() ? '' : 'Enter your name.'),
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ''
          : 'Enter an email address like name@company.com.',
      topic: (value) => (value ? '' : 'Choose the service you’re interested in.'),
      msg: (value) =>
        value.trim().length >= 10 ? '' : 'Add a few details so we can prepare (at least 10 characters).',
    };
    const checkField = (name) => {
      const input = form.elements[name];
      const message = rules[name](input.value);
      document.getElementById(`e-${name}`).textContent = message;
      input.closest('.field').classList.toggle('bad', Boolean(message));
      input.setAttribute('aria-invalid', String(Boolean(message)));
      return !message;
    };
    Object.keys(rules).forEach((name) => {
      form.elements[name].addEventListener('blur', () => {
        if (form.elements[name].value) checkField(name);
      });
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const invalidFields = Object.keys(rules).filter((name) => !checkField(name));
      const status = document.getElementById('status');
      if (invalidFields.length) {
        form.elements[invalidFields[0]].focus();
        status.classList.remove('show');
        return;
      }
      const practice =
        form.querySelector('input[name="practice"]:checked').value === 'env'
          ? 'JOGAT Green'
          : 'JOGAT Consulting';
      status.textContent = `Inquiry ready to send. In the live site, ${practice} would receive your request about “${topic.value}” and reply to ${form.elements.email.value.trim()}.`;
      status.classList.add('show');
    });
  }

  document.getElementById('yr').textContent = new Date().getFullYear();
}
