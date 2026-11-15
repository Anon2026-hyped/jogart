import type { Metadata } from 'next';
import PageIntro from '../page-intro';
import { getPageContent } from '../site-content';

export const metadata: Metadata = {
  title: 'About | JOGAT Green Inc.',
  description: 'Learn how JOGAT Green and JOGAT Consulting combine environmental and financial expertise.',
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageIntro
        eyebrow="About"
        title="Innovation. Sustainability. Excellence."
        description="We help organizations turn environmental and financial challenges into opportunities for operational efficiency, cost savings and long-term sustainability."
      />
      <div dangerouslySetInnerHTML={{ __html: getPageContent('about') }} />
    </main>
  );
}
