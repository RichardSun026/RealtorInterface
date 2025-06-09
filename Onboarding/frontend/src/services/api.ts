const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = {
  async createRealtor(data: import('../types').RealtorData) {
    const response = await fetch(`${API_BASE_URL}/realtor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create realtor');
    return response.json();
  },

  async getCalendarAuthUrl(realtorId: number) {
    const response = await fetch(`${API_BASE_URL}/calendar/oauth/${realtorId}`);
    if (!response.ok) throw new Error('Failed to get auth URL');
    return response.json();
  },

  async getLead(phone: string) {
    const response = await fetch(`${API_BASE_URL}/userreport/${encodeURIComponent(phone)}`);
    if (!response.ok) throw new Error('Failed to load lead');
    return response.json();
  },
};
