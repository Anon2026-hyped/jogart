import { readFileSync } from 'node:fs';
import path from 'node:path';
import SiteInteractions from './site-interactions-client';

const pageContent = readFileSync(
  path.join(process.cwd(), 'public', 'site-content.html'),
  'utf8',
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