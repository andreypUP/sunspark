import React, { useState } from 'react';

const TEAM = [
  { name: 'Ian Jure Macasilang', role: 'Lead Engineer', photo: '/assets/team/ian-jure-macasilang.jpg' },
  { name: 'Loryjane Wallace Elison', role: 'Business Development Lead', photo: '/assets/team/loryjane-wallace-elison.jpg' },
  { name: 'Mark Andrey Acebu', role: 'Full-Stack Engineer', photo: '/assets/team/mark-andrey-acebu.jpg' },
  { name: 'Rexnardski Sumalinog', role: 'Product Designer', photo: '/assets/team/rexnardski-sumalinog.jpg' },
  { name: 'Cyrille Jae Tecson', role: 'Finance & Operations Lead', photo: '/assets/team/cyrille-jae-tecson.jpg' },
];

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

function TeamMember({ member }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="team-card">
      <div className="team-photo-frame">
        {photoFailed ? (
          <span className="team-initials">{initials(member.name)}</span>
        ) : (
          <img
            src={member.photo}
            alt={member.name}
            className="team-photo"
            onError={() => setPhotoFailed(true)}
          />
        )}
      </div>
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </div>
  );
}

export default function AboutPage({ onGoHome }) {
  const goHome = (e) => {
    e.preventDefault();
    onGoHome();
  };

  return (
    <div className="landing-wrapper">
      <header className="landing-navbar">
        <div className="landing-nav-container">
          <a className="brand-logo" href="/" aria-label="Sunspark home" onClick={goHome}>
            <img src="/assets/logo.svg" alt="Sunspark Logo" />
          </a>

          <div className="about-nav">
            <button className="btn-secondary" onClick={onGoHome}>
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <section className="about-hero">
        <div className="section-container">
          <span className="section-tag">About Us</span>
          <h1>The team bringing solar to every Filipino home</h1>
          <p>
            Sunspark is a Philippine team of engineers, designers, and finance specialists making
            rooftop solar simple to evaluate, easy to finance, and safe to buy — connecting
            households with verified installers and partner banks in one place.
          </p>
        </div>
      </section>

      <section className="about-team-section">
        <div className="section-container">
          <div className="section-title-center">
            <h2>Meet the Team</h2>
            <p>Five people behind the platform, the product, and the partnerships.</p>
          </div>

          <div className="team-grid">
            {TEAM.map((member) => (
              <TeamMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/assets/logo.svg" alt="Sunspark" className="footer-logo" />
              <p className="footer-motto">Bringing solar, one home at a time.</p>
              <p className="footer-bio">
                Connecting Philippine households, verified solar installers, and leading banks to
                accelerate clean energy adoption.
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Sunspark Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
