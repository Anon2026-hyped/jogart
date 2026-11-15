import type { Metadata } from 'next';
import PageIntro from '../page-intro';

export const metadata: Metadata = {
  title: 'Consulting | JOGAT Green Inc.',
  description:
    'Explore JOGAT Consulting services in accounting, tax, financial advisory and professional development.',
};

const consultingServices = [
  {
    title: 'Accounting and bookkeeping',
    description: 'Accurate financial records, disciplined reporting and practical support for better business management.',
    href: '/services/accounting',
  },
  {
    title: 'Tax planning and compliance',
    description: 'Forward-looking tax guidance and compliant planning that helps clients manage risk and opportunity.',
    href: '/services/tax',
  },
  {
    title: 'Financial management and advisory',
    description: 'Decision support, performance analysis and strategic guidance for confident growth.',
    href: '/services/financial-advisory',
  },
  {
    title: 'Professional training and capacity development',
    description: 'Targeted learning that strengthens teams, systems and leadership effectiveness.',
    href: '/services/professional-training',
  },
];

const processPoints = [
  'We start by understanding your challenges, goals and operating realities.',
  'We translate complex financial and operational issues into clear, actionable priorities.',
  'We support implementation with responsive guidance, practical systems and measurable follow-through.',
];

export default function ConsultingPage() {
  return (
    <main id="main">
      <PageIntro
        eyebrow="Consulting"
        title="Practical advisory for resilient organizations."
        description="JOGAT Consulting helps businesses and organizations improve their financial foundation, sharpen decision-making and build the capabilities needed for sustainable growth."
      />

      <section className="sec">
        <div className="wrap group">
          <div>
            <h2>Finance, planning and operational clarity under one advisory partner.</h2>
          </div>
          <div className="group-text">
            <p>
              We bring together practical accounting, tax expertise, strategic advisory and professional development to help businesses manage complexity with confidence.
            </p>
            <ul className="reach">
              <li><b>Businesses</b>Operational support and financial discipline</li>
              <li><b>Founders</b>Clear planning and reporting for growth</li>
              <li><b>Teams</b>Confidence, capability and accountability</li>
              <li><b>Leaders</b>Decisions grounded in real numbers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-tint">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="kicker">JOGAT Consulting</span>
              <h2>Advisory services built around your goals.</h2>
            </div>
            <p>
              Our consulting work supports organizations that need better information, sharper planning and stronger internal capability.
            </p>
          </div>

          <div className="service-cards">
            {consultingServices.map((service) => (
              <a className="service-card biz-card" href={service.href} key={service.title}>
                <span className="kicker">Consulting</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-card-link">Explore service <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap esc">
          <div className="esc-media">
            <figure>
              <img data-img="card" alt="JOGAT Consulting advisors reviewing client financial information" />
            </figure>
          </div>
          <div>
            <span className="kicker">How we work</span>
            <h2>Practical engagement. Measurable value.</h2>
            <ul className="esc-list">
              {processPoints.map((point) => (
                <li key={point}>
                  <b>Step</b>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <ul className="commit">
              <li><b>Focused</b>Advice tailored to your organization, not generic templates.</li>
              <li><b>Actionable</b>Clear next steps, working priorities and accountability.</li>
              <li><b>Long-term</b>Support that improves day-to-day confidence and forward planning.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-tint">
        <div className="wrap benefits">
          <h4>Why organizations choose JOGAT Consulting</h4>
          <ul>
            <li><i className="tick"><svg aria-hidden="true"><use href="#i-check" /></svg></i><div><b>Clear financial visibility</b>Strong reporting foundations that support confident decisions.</div></li>
            <li><i className="tick"><svg aria-hidden="true"><use href="#i-check" /></svg></i><div><b>Smarter planning</b>Tax, cash flow and strategic guidance designed around operational realities.</div></li>
            <li><i className="tick"><svg aria-hidden="true"><use href="#i-check" /></svg></i><div><b>Team enablement</b>Training and process support that lift performance over time.</div></li>
            <li><i className="tick"><svg aria-hidden="true"><use href="#i-check" /></svg></i><div><b>Practical problem-solving</b>Advice grounded in what your business needs to do next.</div></li>
            <li><i className="tick"><svg aria-hidden="true"><use href="#i-check" /></svg></i><div><b>Reliable partnership</b>Responsive support from a team focused on sustainable progress.</div></li>
            <li><i className="tick"><svg aria-hidden="true"><use href="#i-check" /></svg></i><div><b>Balanced growth</b>Financial discipline alongside long-term organizational resilience.</div></li>
          </ul>
        </div>
      </section>

      <section className="band">
        <img data-img="hero" alt="JOGAT Green trucks on a highway" />
        <div className="wrap">
          <div className="band-copy">
            <h2>Need advisory support that fits your business?</h2>
            <p>
              Discuss your goals with JOGAT Consulting and identify the financial or operational support that can move your organization forward.
            </p>
            <div className="hero-actions">
              <a className="btn btn-lime" href="/contact?practice=business">Talk to consulting <svg aria-hidden="true"><use href="#i-arrow" /></svg></a>
              <a className="btn btn-line" href="/services">Explore all services</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
