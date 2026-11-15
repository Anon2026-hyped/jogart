import type { Metadata } from 'next';
import PageIntro from '../page-intro';
import { getPageContent } from '../site-content';

export const metadata: Metadata = {
  title: 'Contact | JOGAT Green Inc.',
  description: 'Contact JOGAT Green or JOGAT Consulting to discuss your service needs.',
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageIntro
        eyebrow="Contact"
        title="Let’s talk about your needs"
        description="Tell us about your property, project or business and the JOGAT practice that can help."
      />
      <div dangerouslySetInnerHTML={{ __html: getPageContent('contact') }} />
    </main>
  );
}
