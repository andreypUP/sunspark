import React from 'react';

export default function HeaderBar({ providers, selectedProviderId, onSelectProvider }) {
  return (
    <header className="top-header">
      <select
        className="provider-select-dropdown"
        value={selectedProviderId}
        onChange={(e) => onSelectProvider(e.target.value)}
      >
        {providers.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
    </header>
  );
}
