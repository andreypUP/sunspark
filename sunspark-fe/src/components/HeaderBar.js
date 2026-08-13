import React from 'react';

export default function HeaderBar({ providers, selectedProviderId, onSelectProvider, onBackToLanding }) {
  return (
    <header className="top-header">
      <button className="btn-secondary" onClick={onBackToLanding}>
        ⬅ Back to Landing Page
      </button>

      <select
        className="provider-select-dropdown"
        value={selectedProviderId}
        onChange={(e) => onSelectProvider(e.target.value)}
      >
        {providers.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} ({p.role})
          </option>
        ))}
      </select>
    </header>
  );
}
