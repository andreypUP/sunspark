import React from 'react';

export default function MetricCards({ stats }) {
  return (
    <div className="kpi-cards-grid">
      {/* Total Leads */}
      <div className="kpi-card">
        <div className="kpi-info">
          <div className="kpi-label">Total Leads</div>
          <div className="kpi-value">{stats.total ?? 128}</div>
        </div>
        <div className="kpi-icon-wrapper kpi-icon-total">👥</div>
      </div>

      {/* Hot Leads */}
      <div className="kpi-card">
        <div className="kpi-info">
          <div className="kpi-label">Hot Leads</div>
          <div className="kpi-value">{stats.hot ?? 32}</div>
        </div>
        <div className="kpi-icon-wrapper kpi-icon-hot">🔥</div>
      </div>

      {/* Warm Leads */}
      <div className="kpi-card">
        <div className="kpi-info">
          <div className="kpi-label">Warm Leads</div>
          <div className="kpi-value">{stats.warm ?? 58}</div>
        </div>
        <div className="kpi-icon-wrapper kpi-icon-warm">☀️</div>
      </div>

      {/* Education */}
      <div className="kpi-card">
        <div className="kpi-info">
          <div className="kpi-label">Education</div>
          <div className="kpi-value">{stats.education ?? 38}</div>
        </div>
        <div className="kpi-icon-wrapper kpi-icon-edu">📱</div>
      </div>
    </div>
  );
}
