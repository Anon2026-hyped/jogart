import { readFileSync } from 'node:fs';
import path from 'node:path';

const CONTACT_DETAILS = {
  phoneLabel: '204-960-4045',
  phoneHref: '+12049604045',
  greenWebsite: 'www.jogatgreen.com',
  consultingAddress: '45 Hughes Crescent, Winnipeg, MB',
  consultingEmail: 'consultancy@jogatgreenconsult.com',
  consultingWebsite: 'www.jogatconsult.com',
};

const source = Object.entries(CONTACT_DETAILS).reduce(
  (content, [key, value]) => content.replaceAll(`{{${key}}}`, value),
  readFileSync(path.join(process.cwd(), 'app', 'site-content-source.html'), 'utf8'),
);

const ROUTES: Record<string, string> = {
  top: '/',
  environmental: '/services',
  consulting: '/consulting',
  energy: '/services/biogas',
  sustainability: '/services/sustainability',
  business: '/departments',
  about: '/about',
  contact: '/contact',
  residential: '/services/residential-waste',
  commercial: '/services/commercial-waste',
  industrial: '/services/industrial-waste',
  recycling: '/services/recycling-and-diversion',
  accounting: '/services/accounting',
  tax: '/services/tax',
  advisory: '/services/financial-advisory',
  training: '/services/professional-training',
};

function extractElementAt(start: number, tag: string) {
  const tokenPattern = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  tokenPattern.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(source))) {
    const closing = /^<\//.test(match[0]);
    const selfClosing = /\/>$/.test(match[0]);
    if (closing) depth -= 1;
    else if (!selfClosing) depth += 1;

    if (depth === 0) return source.slice(start, tokenPattern.lastIndex);
  }
  return '';
}

function extractById(id: string) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const openingTag = new RegExp(
    `<([a-z][\\w:-]*)\\b(?=[^>]*\\bid=["']${escapedId}["'])[^>]*>`,
    'i',
  );
  const match = openingTag.exec(source);
  return match ? extractElementAt(match.index, match[1]) : '';
}

function rewriteLinks(html: string) {
  return html.replace(/<a\b[^>]*>/gi, (anchor) => {
    const href = anchor.match(/\bhref=(["'])#([^"']*)\1/i);
    if (!href) return anchor;

    const route = ROUTES[href[2]];
    if (!route) return anchor;

    let destination = route;
    if (href[2] === 'contact') {
      const params = new URLSearchParams();
      const topic = anchor.match(/\bdata-topic=(["'])(.*?)\1/i)?.[2];
      const practice = anchor.match(/\bdata-practice=(["'])(.*?)\1/i)?.[2];
      if (topic) params.set('topic', topic);
      if (practice) params.set('practice', practice);
      const query = params.toString();
      if (query) destination += `?${query}`;
    }

    return anchor.replace(href[0], `href="${destination}"`);
  });
}

export function getPageContent(id: string, panel = false) {
  let html = extractById(id);
  if (panel) {
    html = html
      .replace(/\s+hidden(?=[\s>])/g, '')
      .replace(/\s+role="tabpanel"/g, '')
      .replace(/\s+aria-labelledby="[^"]*"/g, '')
      .replace(/\s+tabindex="[^"]*"/g, '');
  }
  return rewriteLinks(html);
}

export function getHomeContent() {
  const marker = source.indexOf('<!-- ===== GROUP STATEMENT ===== -->');
  const sectionStart = source.indexOf('<section', marker);
  const group = sectionStart >= 0 ? extractElementAt(sectionStart, 'section') : '';
  return `${getPageContent('top')}${rewriteLinks(group)}`;
}

export function getSiteSymbols() {
  return source.match(/<svg width="0"[\s\S]*?<\/svg>/)?.[0] ?? '';
}

export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  sectionId: string;
  practice: 'JOGAT Green' | 'JOGAT Consulting';
  panel?: boolean;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'residential-waste',
    title: 'Residential waste management',
    description: 'Reliable waste collection, recycling and removal for homes and multi-family communities.',
    sectionId: 'residential',
    practice: 'JOGAT Green',
    panel: true,
  },
  {
    slug: 'commercial-waste',
    title: 'Commercial and institutional waste management',
    description: 'Customized waste services for offices, retail, hospitality, schools and institutions.',
    sectionId: 'commercial',
    practice: 'JOGAT Green',
    panel: true,
  },
  {
    slug: 'industrial-waste',
    title: 'Industrial waste management',
    description: 'Waste collection, recovery and compliance support for industrial and construction operations.',
    sectionId: 'industrial',
    practice: 'JOGAT Green',
    panel: true,
  },
  {
    slug: 'recycling-and-diversion',
    title: 'Recycling and waste diversion',
    description: 'Practical recycling, composting and resource-recovery programs that reduce landfill waste.',
    sectionId: 'recycling',
    practice: 'JOGAT Green',
    panel: true,
  },
  {
    slug: 'biogas',
    title: 'Biogas and waste-to-energy',
    description: 'Project planning and advisory for turning suitable organic waste into renewable energy.',
    sectionId: 'energy',
    practice: 'JOGAT Green',
  },
  {
    slug: 'sustainability',
    title: 'Environmental sustainability consulting',
    description: 'Emissions, waste and resource-efficiency strategies with measurable environmental results.',
    sectionId: 'sustainability',
    practice: 'JOGAT Green',
  },
  {
    slug: 'accounting',
    title: 'Accounting and bookkeeping',
    description: 'Accurate financial records and clear reporting for informed business decisions.',
    sectionId: 'accounting',
    practice: 'JOGAT Consulting',
    panel: true,
  },
  {
    slug: 'tax',
    title: 'Tax planning and compliance',
    description: 'Tax preparation, planning and compliance support for businesses and individuals.',
    sectionId: 'tax',
    practice: 'JOGAT Consulting',
    panel: true,
  },
  {
    slug: 'financial-advisory',
    title: 'Financial management and business advisory',
    description: 'Financial planning, performance analysis and strategic guidance for sustainable growth.',
    sectionId: 'advisory',
    practice: 'JOGAT Consulting',
    panel: true,
  },
  {
    slug: 'professional-training',
    title: 'Professional training and capacity development',
    description: 'Practical accounting, project management and business skills development.',
    sectionId: 'training',
    practice: 'JOGAT Consulting',
    panel: true,
  },
];
