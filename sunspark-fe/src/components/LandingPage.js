import React, { useState } from 'react';
import PartnerModal from './PartnerModal';

const APP_DOWNLOAD_URL =
  'https://drive.usercontent.google.com/download?id=1mtqnQAoDSGv-k2pfyFWkOyY6sGDfjClD&export=download&confirm=t';

export default function LandingPage({ onLaunchPortal }) {
  const [activeInstallerTab, setActiveInstallerTab] = useState('dashboard'); // 'dashboard' | 'map'
  const [menuOpen, setMenuOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goHome = () => {
    setMenuOpen(false);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const launchPortal = () => {
    setMenuOpen(false);
    onLaunchPortal();
  };

  const openPartnerModal = () => {
    setMenuOpen(false);
    setPartnerModalOpen(true);
  };

  return (
    <div className="landing-wrapper">
      {/* 1. Header / Navbar */}
      <header className="landing-navbar">
        <div className="landing-nav-container">
          <a
            className="brand-logo"
            href="/"
            aria-label="Sunspark home"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
          >
            <img src="/assets/logo.svg" alt="Sunspark Logo" />
          </a>

          <button
            className="nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`nav-toggle-bars ${menuOpen ? 'open' : ''}`} />
          </button>

          <div className={`nav-collapse ${menuOpen ? 'open' : ''}`}>
            <nav className="nav-menu">
              <button onClick={() => scrollToSection('how-it-works')}>How it Works</button>
              <button onClick={() => scrollToSection('pillars')}>Why Sunspark</button>
              <button onClick={() => scrollToSection('installers')}>For Installers & Banks</button>
            </nav>

            <div className="nav-actions">
              <button className="btn-secondary" onClick={launchPortal}>
                Installer Portal ➔
              </button>
              <button className="btn-primary" onClick={() => scrollToSection('how-it-works')}>
                Get Free Assessment
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-text-content">
            <h1 className="hero-title">
              Solar Energy Made <span className="highlight-text">Accessible</span>, <span className="highlight-text">Affordable</span> & <span className="highlight-text">Secure</span>
            </h1>
            <p className="hero-subtitle">
              Sunspark empowers Philippine households to seamlessly evaluate solar potential, connect with verified, trusted solar developers, and secure easy bank financing—all in one place.
            </p>
            <div className="hero-cta-group">
              <a
                className="btn-primary-large"
                href={APP_DOWNLOAD_URL}
                download="Sunspark.apk"
                rel="noopener"
              >
                Get Free Solar Assessment
              </a>
              <button className="btn-outline-large" onClick={openPartnerModal}>
                Partner as Installer ➔
              </button>
            </div>
            <p className="app-download-note">
              Downloads the Sunspark Android app (.apk, 111 MB). On Android, allow installs from your
              browser when prompted.
            </p>
            <div className="trust-metrics">
              <div className="trust-item">
                <strong>100%</strong> Verified Developers
              </div>
              <div className="trust-divider">•</div>
              <div className="trust-item">
                <strong>Zero</strong> Upfront Confusion
              </div>
              <div className="trust-divider">•</div>
              <div className="trust-item">
                <strong>Direct</strong> Bank Loan Match
              </div>
            </div>
          </div>

          {/* Hero App Preview Card */}
          <div className="hero-visual">
            <div className="hero-card-frame">
              <img
                src="/assets/mobile/screen_5.png"
                alt="Sunspark App Overview"
                className="hero-app-screen"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars / Why Sunspark Section */}
      <section id="pillars" className="pillars-section">
        <div className="section-container">
          <div className="pillars-header">
            <div className="section-tag">THE SUNSPARK SOLUTION</div>
            <h2>Solving Security, Affordability & Uncertainty</h2>
            <p>
              Switching to solar shouldn't feel risky or overwhelming. We bring transparency to homeowners and high-intent leads to trusted installers.
            </p>
          </div>

          <div className="pillars-grid-wrapper">
            <div className="people-image-card">
              <img
                src="/assets/sunspark_people.png"
                alt="Sunspark Community and Installers"
                className="people-img"
              />
            </div>

            <div className="pillars-list">
              {/* Pillar 1 */}
              <div className="pillar-card">
                <div className="pillar-content">
                  <h3>100% Security & Trust</h3>
                  <p>
                    We strictly vet and feature only licensed, accredited, and top-rated solar developers. Say goodbye to fraudulent quotes and unverified contractors.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="pillar-card">
                <div className="pillar-content">
                  <h3>Affordable Bank Financing</h3>
                  <p>
                    We partner directly with leading financial institutions to offer hassle-free solar mortgages and low-interest monthly installment plans.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="pillar-card">
                <div className="pillar-content">
                  <h3>Uncertainty Eliminated</h3>
                  <p>
                    Upload your electric bill to instantly calculate your solar readiness score, recommended kWp system size, monthly savings, and exact payback period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section (4-Step Flow with Arrows) */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <div className="section-title-center">
            <div className="section-tag">HOW IT WORKS</div>
            <h2>4 Simple Steps to Solar Energy Independence</h2>
            <p>From scanning your electric bill to installation & grid connection.</p>
          </div>

          <div className="steps-flow-container">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number-badge">1</div>
              <div className="step-card-header">
                <h3>Assess</h3>
                <span className="step-subtext">Scan bill & score readiness</span>
              </div>
              <div className="step-image-frame">
                <img src="/assets/mobile/screen_1.png" alt="Step 1: Assess" />
              </div>
              <p className="step-desc">
                Upload your electric bill to generate an instant 0–100 Readiness Score with system size & savings estimates.
              </p>
            </div>

            {/* Connecting Arrow 1 */}
            <div className="flow-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12H34M34 12L24 2M34 12L24 22" stroke="#59C23C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-number-badge">2</div>
              <div className="step-card-header">
                <h3>Connect</h3>
                <span className="step-subtext">Browse verified developers</span>
              </div>
              <div className="step-image-frame">
                <img src="/assets/mobile/screen_2.png" alt="Step 2: Connect" />
              </div>
              <p className="step-desc">
                Match with vetted, top-rated solar developers in your city (Cagayan de Oro, Iligan, Tagoloan, Opol).
              </p>
            </div>

            {/* Connecting Arrow 2 */}
            <div className="flow-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12H34M34 12L24 2M34 12L24 22" stroke="#59C23C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number-badge">3</div>
              <div className="step-card-header">
                <h3>Finance</h3>
                <span className="step-subtext">Compare loan options</span>
              </div>
              <div className="step-image-frame">
                <img src="/assets/mobile/screen_3.png" alt="Step 3: Finance" />
              </div>
              <p className="step-desc">
                Review ready-to-apply solar mortgages and low monthly financing multipliers tailored to your system size.
              </p>
            </div>

            {/* Connecting Arrow 3 */}
            <div className="flow-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12H34M34 12L24 2M34 12L24 22" stroke="#59C23C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <div className="step-number-badge">4</div>
              <div className="step-card-header">
                <h3>Install</h3>
                <span className="step-subtext">Track live progress</span>
              </div>
              <div className="step-image-frame">
                <img src="/assets/mobile/screen_4.png" alt="Step 4: Install" />
              </div>
              <p className="step-desc">
                Follow real-time status updates from quote approval and financing to rooftop installation & grid launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. For Installers & Banks Section */}
      <section id="installers" className="installer-showcase-section">
        <div className="section-container">
          <div className="installer-showcase-card">
            <div className="installer-text">
              <div className="section-tag-gold">FOR SOLAR DEVELOPERS & BANKS</div>
              <h2>Manage Leads & Track Geographic Demand in Real-Time</h2>
              <p>
                Sunspark provides solar installers with high-intent qualified leads, complete electric bill analytics, and geographical clustering insights.
              </p>

              <div className="installer-tab-buttons">
                <button
                  className={`tab-btn ${activeInstallerTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveInstallerTab('dashboard')}
                >
                  Leads Dashboard
                </button>
                <button
                  className={`tab-btn ${activeInstallerTab === 'map' ? 'active' : ''}`}
                  onClick={() => setActiveInstallerTab('map')}
                >
                  Geographic Map View
                </button>
              </div>
            </div>

            <div className="installer-preview-frame">
              {activeInstallerTab === 'dashboard' ? (
                <img
                  src="/assets/solar-installer-dashboard.svg"
                  alt="Sunspark Installer Dashboard Preview"
                  className="preview-img"
                />
              ) : (
                <img
                  src="/assets/solar-installer-map.svg"
                  alt="Sunspark Geographic Map Preview"
                  className="preview-img"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <img
                src="/assets/logo.svg"
                alt="Sunspark"
                className="footer-logo"
              />
              <p className="footer-motto">Bringing solar, one home at a time.</p>
              <p className="footer-bio">
                Connecting Philippine households, verified solar installers, and leading banks to accelerate clean energy adoption.
              </p>
            </div>

            <div className="footer-links-grid">
              <div className="footer-col">
                <h4>Platform</h4>
                <ul>
                  <li><button onClick={() => scrollToSection('how-it-works')}>How it Works</button></li>
                  <li><button onClick={() => scrollToSection('pillars')}>Why Sunspark</button></li>
                  <li><button onClick={launchPortal}>Installer Portal</button></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about" onClick={(e) => { e.preventDefault(); alert('About Us: Sunspark is a PhilDev innovation team driving solar accessibility across the Philippines.'); }}>About Us</a></li>
                  <li><a href="#careers" onClick={(e) => { e.preventDefault(); alert('Careers: We are hiring full-stack developers, solar engineers, and partnership managers!'); }}>Careers</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Sunspark Inc. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: All customer bill & contact data is protected under RA 10173 Data Privacy Act.'); }}>Privacy Policy</a>
              <span>•</span>
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Sunspark provides quote matching services between consumers and accredited solar installers.'); }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <PartnerModal open={partnerModalOpen} onClose={() => setPartnerModalOpen(false)} />
    </div>
  );
}
