import React, { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import MetricCards from './components/MetricCards';
import LeadsTable from './components/LeadsTable';
import LeadDetailModal from './components/LeadDetailModal';
import MapView from './components/MapView';
import { fetchProviders, fetchLeadStats, fetchLeads } from './services/api';

export default function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'about' | 'portal'

  // Portal States
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'map'
  const [providers, setProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState('');

  const [stats, setStats] = useState({ total: 128, hot: 32, warm: 58, education: 38 });
  const [tierFilter, setTierFilter] = useState('All Lead Tiers');
  const [searchTerm, setSearchTerm] = useState('');

  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ total: 128, page: 1, limit: 6, pages: 22 });
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load providers on mount
  useEffect(() => {
    async function loadProviders() {
      try {
        const res = await fetchProviders();
        if (res.success && res.data.length > 0) {
          setProviders(res.data);
          setSelectedProviderId(res.data[0]._id);
        }
      } catch (err) {
        console.error('Provider fetch error:', err);
      }
    }
    loadProviders();
  }, []);

  // Load stats and leads whenever provider, tier filter, page, or search term changes
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, leadsRes] = await Promise.all([
        fetchLeadStats(selectedProviderId),
        fetchLeads({
          providerId: selectedProviderId,
          tier: tierFilter,
          search: searchTerm,
          page: pagination.page,
          limit: 6,
        }),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (leadsRes.success) {
        setLeads(leadsRes.data);
        setPagination(leadsRes.pagination);
      }
    } catch (err) {
      console.error('Data load error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedProviderId, tierFilter, searchTerm, pagination.page]);

  useEffect(() => {
    if (viewMode === 'portal') {
      loadData();
    }
  }, [viewMode, loadData]);

  const currentProvider = providers.find((p) => p._id === selectedProviderId);

  const handleLeadUpdated = (updatedLead) => {
    setSelectedLead(updatedLead);
    loadData();
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onLaunchPortal={() => setViewMode('portal')}
        onOpenAbout={() => setViewMode('about')}
      />
    );
  }

  if (viewMode === 'about') {
    return <AboutPage onGoHome={() => setViewMode('landing')} />;
  }

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentProvider={currentProvider}
        onGoHome={() => setViewMode('landing')}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Header Bar */}
        <HeaderBar
          providers={providers}
          selectedProviderId={selectedProviderId}
          onSelectProvider={(id) => {
            setSelectedProviderId(id);
            setPagination((prev) => ({ ...prev, page: 1 }));
          }}
          onBackToLanding={() => setViewMode('landing')}
        />

        <div className="content-body">
          {/* Main Title & Action Bar */}
          <div className="page-header">
            <div className="page-title-area">
              <h1>Leads</h1>
              <p>Manage and follow up with your solar leads.</p>
            </div>
            {activeTab === 'leads' && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Search lead or location..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    fontSize: '14px',
                  }}
                />
                <select
                  className="tier-select-dropdown"
                  value={tierFilter}
                  onChange={(e) => {
                    setTierFilter(e.target.value);
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                >
                  <option value="All Lead Tiers">All Lead Tiers</option>
                  <option value="Hot">Hot Leads</option>
                  <option value="Warm">Warm Leads</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            )}
          </div>

          {/* Metric Overview Cards */}
          <MetricCards stats={stats} />

          {/* Tab View Switcher */}
          {activeTab === 'leads' ? (
            <>
              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                  Loading leads dataset...
                </div>
              ) : (
                <>
                  <LeadsTable leads={leads} onSelectLead={(lead) => setSelectedLead(lead)} />

                  {/* Pagination Footer */}
                  <div className="table-pagination">
                    <div className="pagination-info">
                      {pagination.total > 0
                        ? `${(pagination.page - 1) * pagination.limit + 1} - ${Math.min(
                            pagination.page * pagination.limit,
                            pagination.total
                          )} of ${pagination.total}`
                        : '0 of 0'}
                    </div>
                    <div className="pagination-controls">
                      <button
                        className="page-btn"
                        disabled={pagination.page <= 1}
                        onClick={() =>
                          setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                        }
                      >
                        &lt;
                      </button>
                      {[...Array(Math.min(5, pagination.pages || 1)).keys()].map((i) => {
                        const pNum = i + 1;
                        return (
                          <button
                            key={pNum}
                            className={`page-btn ${pagination.page === pNum ? 'active' : ''}`}
                            onClick={() => setPagination((prev) => ({ ...prev, page: pNum }))}
                          >
                            {pNum}
                          </button>
                        );
                      })}
                      {pagination.pages > 5 && (
                        <>
                          <span style={{ margin: '0 4px', color: '#94A3B8' }}>...</span>
                          <button
                            className={`page-btn ${
                              pagination.page === pagination.pages ? 'active' : ''
                            }`}
                            onClick={() =>
                              setPagination((prev) => ({ ...prev, page: prev.pages }))
                            }
                          >
                            {pagination.pages}
                          </button>
                        </>
                      )}
                      <button
                        className="page-btn"
                        disabled={pagination.page >= pagination.pages}
                        onClick={() =>
                          setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                        }
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <MapView leads={leads} onSelectLead={(lead) => setSelectedLead(lead)} />
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onLeadUpdated={handleLeadUpdated}
        />
      )}
    </div>
  );
}
