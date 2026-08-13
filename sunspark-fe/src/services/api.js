const API_BASE = 'http://localhost:5000/api';

export const fetchProviders = async () => {
  const res = await fetch(`${API_BASE}/providers`);
  if (!res.ok) throw new Error('Failed to fetch providers');
  return res.json();
};

export const fetchLeadStats = async (providerId = '') => {
  const res = await fetch(`${API_BASE}/leads/stats?providerId=${providerId}`);
  if (!res.ok) throw new Error('Failed to fetch lead stats');
  return res.json();
};

export const fetchLeads = async ({ providerId = '', tier = 'All Lead Tiers', search = '', page = 1, limit = 6 }) => {
  const params = new URLSearchParams({
    providerId,
    tier,
    search,
    page,
    limit,
  });
  const res = await fetch(`${API_BASE}/leads?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch leads');
  return res.json();
};

export const updateLeadStatus = async (id, status) => {
  const res = await fetch(`${API_BASE}/leads/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
};

export const addLeadNote = async (id, text, author = 'SolarLife Developer') => {
  const res = await fetch(`${API_BASE}/leads/${id}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, text }),
  });
  if (!res.ok) throw new Error('Failed to add note');
  return res.json();
};
