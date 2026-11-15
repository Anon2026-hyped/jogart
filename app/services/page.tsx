import type { Metadata } from 'next';
import PageIntro from '../page-intro';
import { SERVICE_PAGES } from '../site-content';

export const metadata: Metadata = {
  title: 'Services | JOGAT Green Inc.',
  description: 'Explore environmental, sustainability and business advisory services from JOGAT Green and JOGAT Consulting.',
};

export default function ServicesPage() {
  const environmental = SERVICE_PAGES.filter((service) => service.practice === 'JOGAT Green');
  const consulting = SERVICE_PAGES.filter((service) => service.practice === 'JOGAT Consulting');

  return (
    <main id="main">
      <PageIntro
        eyebrow="Services"
        title="Practical services for a stronger future"
        description="Explore environmental services from JOGAT Green and financial expertise from JOGAT Consulting. Each service page explains what we offer and how to get started."
      />
      <section className="sec">
        <div className="wrap">
          <div className="service-group">
            <div className="head">
              <div><span className="kicker">JOGAT Green Inc.</span><h2>Environmental services</h2></div>
              <p>Waste management, recycling, renewable energy and sustainability support for homes, businesses, institutions and industry.</p>
            </div>
            <div className="service-cards">
              {environmental.map((service) => (
                <a className="service-card" href={`/services/${service.slug}`} key={service.slug}>
                  <span className="kicker">Environmental</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-card-link">Explore service <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>
          </div>
          <div className="service-group">
            <div className="head">
              <div><span className="kicker">JOGAT Consulting</span><h2>Business advisory</h2></div>
              <p>Accounting, tax, financial management and professional training to support confident business decisions.</p>
            </div>
            <div className="service-cards">
              {consulting.map((service) => (
                <a className="service-card biz-card" href={`/services/${service.slug}`} key={service.slug}>
                  <span className="kicker">Business advisory</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-card-link">Explore service <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
