import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      apiClient.post('/auth/login', { email, password }),
    register: (data: any) =>
      apiClient.post('/auth/register', data),
    logout: () =>
      apiClient.post('/auth/logout'),
  },

  // Offers
  offers: {
    list: (params?: any) =>
      apiClient.get('/offers', { params }),
    get: (id: string) =>
      apiClient.get(`/offers/${id}`),
    create: (data: any) =>
      apiClient.post('/offers', data),
    update: (id: string, data: any) =>
      apiClient.put(`/offers/${id}`, data),
    delete: (id: string) =>
      apiClient.delete(`/offers/${id}`),
  },

  // Requests
  requests: {
    list: (params?: any) =>
      apiClient.get('/requests', { params }),
    get: (id: string) =>
      apiClient.get(`/requests/${id}`),
    create: (data: any) =>
      apiClient.post('/requests', data),
    update: (id: string, data: any) =>
      apiClient.put(`/requests/${id}`, data),
    delete: (id: string) =>
      apiClient.delete(`/requests/${id}`),
  },

  // Matching
  matching: {
    getMatches: (offerId?: string, requestId?: string) =>
      apiClient.get('/matching/matches', {
        params: { offer_id: offerId, request_id: requestId },
      }),
    getScore: (offerId: string, requestId: string) =>
      apiClient.get(`/matching/score/${offerId}/${requestId}`),
  },

  // Users
  users: {
    getProfile: () =>
      apiClient.get('/users/profile'),
    updateProfile: (data: any) =>
      apiClient.put('/users/profile', data),
    getUser: (id: string) =>
      apiClient.get(`/users/${id}`),
  },
};

export default apiClient;
