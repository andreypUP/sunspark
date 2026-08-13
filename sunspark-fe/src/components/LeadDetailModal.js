import React, { useState } from 'react';
import { updateLeadStatus, addLeadNote } from '../services/api';

function formatPeso(val) {
  if (!val) return '₱0';
  return `₱${Math.round(val).toLocaleString()}`;
}

export default function LeadDetailModal({ lead, onClose, onLeadUpdated }) {
  const [status, setStatus] = useState(lead.status || 'New');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(lead.notes || []);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!lead) return null;

  const handleStatusChange = async (e) => {
    const nextStatus = e.target.value;
    setStatus(nextStatus);
    try {
      setIsUpdating(true);
      const res = await updateLeadStatus(lead._id, nextStatus);
      if (res.success) {
        onLeadUpdated(res.data);
      }
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      const res = await addLeadNote(lead._id, newNote);
      if (res.success) {
        setNotes(res.data.notes);
        setNewNote('');
        onLeadUpdated(res.data);
      }
    } catch (err) {
      alert(`Error adding note: ${err.message}`);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-area">
            <h2>{lead.customerName}</h2>
            <p>
              📍 {lead.location?.barangay}, {lead.location?.cityOrMunicipality},{' '}
              {lead.location?.province}
            </p>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Status Update Control */}
          <div className="status-update-box">
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#D97706' }}>
                Installer Follow-up Pipeline
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Current Lead Status: <strong>{status}</strong>
              </div>
            </div>
            <select
              className="status-select"
              value={status}
              onChange={handleStatusChange}
              disabled={isUpdating}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Quote Sent">Quote Sent</option>
              <option value="Contract Signed">Contract Signed</option>
              <option value="Closed/Lost">Closed/Lost</option>
            </select>
          </div>

          {/* Electric Bill & Solar Overview */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '12px' }}>
              ⚡ Electric Bill & Solar System Estimates
            </h3>
            <div className="detail-grid">
              <div className="detail-card">
                <div className="label">Monthly Electric Bill</div>
                <div className="val">{formatPeso(lead.billDetails?.monthlyBill)}</div>
              </div>
              <div className="detail-card">
                <div className="label">Estimated Monthly Savings</div>
                <div className="val" style={{ color: '#16A34A' }}>
                  {formatPeso(lead.solarEstimate?.estimatedMonthlySavings)}
                </div>
              </div>
              <div className="detail-card">
                <div className="label">Recommended System Size</div>
                <div className="val">
                  {lead.solarEstimate?.recommendedSystemSizeKwp} kWp
                </div>
              </div>
              <div className="detail-card">
                <div className="label">Est. Project Cost</div>
                <div className="val">
                  {formatPeso(lead.solarEstimate?.estimatedInstallCost)}
                </div>
              </div>
            </div>
          </div>

          {/* 5 Assessment Answers */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '12px' }}>
              📝 Customer Assessment Responses
            </h3>
            <div className="detail-grid">
              <div className="detail-card">
                <div className="label">Home Ownership</div>
                <div className="val" style={{ fontSize: '14px' }}>
                  {lead.assessmentAnswers?.homeOwnership}
                </div>
              </div>
              <div className="detail-card">
                <div className="label">Sunlight Exposure</div>
                <div className="val" style={{ fontSize: '14px' }}>
                  {lead.assessmentAnswers?.sunlight}
                </div>
              </div>
              <div className="detail-card">
                <div className="label">Usable Roof Space</div>
                <div className="val" style={{ fontSize: '14px' }}>
                  {lead.assessmentAnswers?.roofSpace}
                </div>
              </div>
              <div className="detail-card">
                <div className="label">Payment Preference</div>
                <div className="val" style={{ fontSize: '14px' }}>
                  {lead.assessmentAnswers?.paymentPreference}
                </div>
              </div>
              <div className="detail-card" style={{ gridColumn: 'span 2' }}>
                <div className="label">Desired Installation Timeline</div>
                <div className="val" style={{ fontSize: '14px', color: '#EF4444' }}>
                  ⏰ {lead.assessmentAnswers?.installationTimeline}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '12px' }}>
              📞 Contact Information
            </h3>
            <div className="detail-grid">
              <div className="detail-card">
                <div className="label">Email Address</div>
                <div className="val" style={{ fontSize: '14px' }}>{lead.email}</div>
              </div>
              <div className="detail-card">
                <div className="label">Phone Number</div>
                <div className="val" style={{ fontSize: '14px' }}>{lead.phone}</div>
              </div>
            </div>
          </div>

          {/* Notes Log */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '12px' }}>
              💬 Installer Notes Log
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {notes.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#64748B', fontStyle: 'italic' }}>
                  No installer notes added yet.
                </div>
              ) : (
                notes.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: '#F8FAFC',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      borderLeft: '3px solid #F59E0B',
                    }}
                  >
                    <strong>{n.author}: </strong> {n.text}
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Add a follow-up note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                }}
              />
              <button
                type="submit"
                className="view-btn"
                style={{ backgroundColor: '#1E293B', color: '#FFFFFF' }}
              >
                Add Note
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
