import SiteInteractions from './site-interactions-client';
import { getSiteSymbols } from './site-content';

export default function SiteChrome({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: getSiteSymbols() }} />
      <a className="skip" href="#main">Skip to content</a>
      <header className="header" id="header">
        <div className="wrap nav">
          <a className="brand" href="/" aria-label="JOGAT Green Inc. home">
            <svg className="mono" aria-hidden="true"><use href="#mono-g" /></svg>
            <span className="brand-text"><b>JOGAT Green</b><small>Environmental services &amp; business advisory</small></span>
          </a>
          <nav className="links" id="links" aria-label="Main">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/consulting">Consulting</a>
            <a href="/about">About</a>
            <a href="/contact" className="btn btn-lime">Contact</a>
          </nav>
          <div className="tools">
            <button className="icon-btn" id="theme" type="button" aria-label="Switch colour theme">
              <svg className="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
              <svg className="i-sun" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g></svg>
            </button>
            <button className="icon-btn menu-btn" id="menu" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="links">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="brand" href="/"><svg className="mono" aria-hidden="true"><use href="#mono-g" /></svg><span className="brand-text"><b>JOGAT Green</b><small>Environmental services &amp; business advisory</small></span></a>
              <p className="motto">Turning waste into resources for a greener tomorrow.</p>
            </div>
            <nav aria-label="Environmental services"><h4>Environmental services</h4><ul>
              <li><a href="/services">All services</a></li><li><a href="/services/residential-waste">Residential waste</a></li><li><a href="/services/commercial-waste">Commercial &amp; institutional</a></li><li><a href="/services/industrial-waste">Industrial waste</a></li><li><a href="/services/recycling-and-diversion">Recycling &amp; diversion</a></li><li><a href="/services/biogas">Biogas &amp; waste-to-energy</a></li><li><a href="/services/sustainability">Sustainability consulting</a></li>
            </ul></nav>
            <nav aria-label="Business advisory"><h4>Business advisory</h4><ul>
              <li><a href="/consulting">Consulting overview</a></li><li><a href="/services/accounting">Accounting &amp; bookkeeping</a></li><li><a href="/services/tax">Tax planning &amp; compliance</a></li><li><a href="/services/financial-advisory">Financial management</a></li><li><a href="/services/professional-training">Training &amp; development</a></li>
            </ul></nav>
            <div><h4>Company</h4><ul><li><a href="/about">About us</a></li><li><a href="/contact">Contact both practices</a></li></ul></div>
          </div>
          <div className="foot-base"><span>© <span id="yr"></span> JOGAT Green Inc. All rights reserved.</span><span>Innovation. Sustainability. Environmental excellence.</span></div>
        </div>
      </footer>
      <SiteInteractions />
    </>
  );
}
