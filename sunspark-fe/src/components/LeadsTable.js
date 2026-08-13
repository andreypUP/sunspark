import React from 'react';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatPeso(val) {
  if (!val) return '₱0';
  return `₱${Math.round(val).toLocaleString()}`;
}

export default function LeadsTable({ leads, onSelectLead }) {
  return (
    <div className="table-card">
      <table className="data-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Location</th>
            <th>Readiness Score</th>
            <th>Lead Tier</th>
            <th>Est. System Size</th>
            <th>Monthly Savings</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                No leads found matching your criteria.
              </td>
            </tr>
          ) : (
            leads.map((lead) => {
              const tierLower = lead.leadTier.toLowerCase();
              return (
                <tr key={lead._id}>
                  <td>
                    <div className="lead-name-cell">
                      <span className="name">{lead.customerName}</span>
                      <span className="email">{lead.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="location-cell">
                      <span className="city">{lead.location?.cityOrMunicipality}</span>
                      <span className="province">{lead.location?.province}</span>
                    </div>
                  </td>
                  <td>
                    <div className="score-cell">
                      <span className="score-num">{lead.readinessScore}</span>
                      <div className="score-bar-bg">
                        <div
                          className={`score-bar-fill ${tierLower}`}
                          style={{ width: `${lead.readinessScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`tier-badge ${tierLower}`}>
                      {lead.leadTier}
                    </span>
                  </td>
                  <td>
                    <strong>{lead.solarEstimate?.recommendedSystemSizeKwp ?? 3.5} kWp</strong>
                  </td>
                  <td>
                    <strong>{formatPeso(lead.solarEstimate?.estimatedMonthlySavings)}</strong>
                  </td>
                  <td style={{ color: '#64748B' }}>
                    {formatDate(lead.submittedAt)}
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => onSelectLead(lead)}>
                      View
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
