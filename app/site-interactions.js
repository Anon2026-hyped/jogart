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
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!root.dataset.theme) {
    root.dataset.theme = prefersDark.matches ? 'dark' : 'light';
  }
  const syncThemeLabel = () => {
    themeButton.setAttribute(
      'aria-label',
      root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
    );
  };
  themeButton.addEventListener('click', () => {
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

  const navLinks = Array.from(
    document.querySelectorAll('.links a[href^="#"]:not(.btn)'),
  );
  const navSections = navLinks
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) =>
              link.classList.toggle('on', link.hash === `#${entry.target.id}`),
            );
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navSections.forEach((section) => navObserver.observe(section));
  }

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
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1060) setMenu(false);
  });

  const panelsById = new Map();
  document.querySelectorAll('[data-explorer]').forEach((explorer) => {
    const tabs = Array.from(explorer.querySelectorAll('[role="tab"]'));
    const selectTab = (selectedTab, focus = false) => {
      tabs.forEach((tab) => {
        const selected = tab === selectedTab;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (focus) selectedTab.focus();
    };

    tabs.forEach((tab, index) => {
      panelsById.set(tab.getAttribute('aria-controls'), () => selectTab(tab));
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (event) => {
        let nextIndex;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex !== undefined) {
          event.preventDefault();
          selectTab(tabs[nextIndex], true);
        }
      });
    });
  });

  const openTabFromHash = () => {
    const selectTab = panelsById.get(window.location.hash.slice(1));
    if (!selectTab) return;
    selectTab();
    const panel = document.getElementById(window.location.hash.slice(1));
    const tabs = panel?.closest('[data-explorer]')?.querySelector('.tabs');
    if (tabs) {
      window.requestAnimationFrame(() => {
        tabs.scrollIntoView({
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    }
  };
  window.addEventListener('hashchange', openTabFromHash);
  openTabFromHash();

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
  fillTopics('env');
  document
    .querySelectorAll('a[href="#contact"][data-topic], a[href="#contact"][data-practice]')
    .forEach((link) => {
      link.addEventListener('click', () => {
        setPractice(link.dataset.practice || 'env', link.dataset.topic);
      });
    });

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

  document.getElementById('yr').textContent = new Date().getFullYear();
}
