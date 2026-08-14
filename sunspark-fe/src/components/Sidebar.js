import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, currentProvider, onGoHome }) {
  return (
    <aside className="sidebar">
      {/* Brand Logo */}
      <a
        className="sidebar-logo"
        href="/"
        aria-label="Sunspark home"
        onClick={(e) => {
          e.preventDefault();
          onGoHome();
        }}
      >
        <img src="/logo.svg" alt="Sunspark Logo" />
      </a>

      {/* Provider Card */}
      <div className="provider-profile-card">
        <div className="provider-avatar">
          {currentProvider ? currentProvider.name.substring(0, 2).toUpperCase() : 'SL'}
        </div>
        <div className="provider-info">
          <div className="provider-name">{currentProvider?.name || 'SolarLife'}</div>
          <div className="provider-role">{currentProvider?.role || 'Developer'}</div>
        </div>
      </div>

      {/* Navigation */}
      <ul className="nav-list">
        <li
          className={`nav-item ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          <span className="nav-item-icon">📋</span>
          <span>Leads</span>
        </li>
        <li
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <span className="nav-item-icon">📍</span>
          <span>Map</span>
        </li>
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => alert('Logged out successfully.')}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
