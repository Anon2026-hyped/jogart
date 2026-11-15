import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageIntro from '../../page-intro';
import { getPageContent, SERVICE_PAGES } from '../../site-content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | JOGAT Green Inc.`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main id="main">
      <PageIntro
        eyebrow={`${service.practice} · Services`}
        title={service.title}
        description={service.description}
      />
      <div dangerouslySetInnerHTML={{ __html: getPageContent(service.sectionId, service.panel) }} />
    </main>
  );
}
