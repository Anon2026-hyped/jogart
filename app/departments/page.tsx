import type { Metadata } from 'next';
import PageIntro from '../page-intro';

export const metadata: Metadata = {
  title: 'Departments | JOGAT Green Inc.',
  description: 'Learn about the two specialist practices that make up JOGAT Green Inc.',
};

export default function DepartmentsPage() {
  return (
    <main id="main">
      <PageIntro
        eyebrow="Departments"
        title="Two specialist practices. One purpose."
        description="Our environmental and business advisory practices work independently and together to help organizations operate responsibly and grow with confidence."
      />
      <section className="sec">
        <div className="wrap department-cards">
          <article className="department-card">
            <span className="kicker">JOGAT Green Inc.</span>
            <h2>Environmental services</h2>
            <p>Waste management, recycling, biogas and sustainability consulting for homes, businesses, institutions and industry.</p>
            <a className="btn btn-green" href="/services">Explore environmental services</a>
          </article>
          <article className="department-card biz-card">
            <span className="kicker">JOGAT Consulting</span>
            <h2>Business advisory</h2>
            <p>Accounting, tax planning, financial management and professional training for businesses and organizations.</p>
            <a className="btn btn-green" href="/services/accounting">Explore business advisory</a>
          </article>
        </div>
      </section>
    </main>
  );
}
