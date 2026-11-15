import { readFileSync } from 'node:fs';
import path from 'node:path';
import SiteInteractions from './site-interactions-client';

const CONTACT_DETAILS = {
  phoneLabel: '204-960-4045',
  phoneHref: '+12049604045',
  greenWebsite: 'www.jogatgreen.com',
  consultingAddress: '45 Hughes Crescent, Winnipeg, MB',
  consultingEmail: 'consultancy@jogatgreenconsult.com',
  consultingWebsite: 'www.jogatgreenconsult.com',
};

const pageContent = Object.entries(CONTACT_DETAILS).reduce(
  (content, [key, value]) => content.replaceAll(`{{${key}}}`, value),
  readFileSync(path.join(process.cwd(), 'public', 'site-content.html'), 'utf8'),
);

export default function Home() {
  return (
    <>
      <div
        id="site-content"
        dangerouslySetInnerHTML={{ __html: pageContent }}
      />
      <SiteInteractions />
    </>
  );
}