import axios from 'axios';

// Base URL - change this to your deployed backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menu API calls
export const menuAPI = {
  // Get all menu items with optional filters
  getAll: (params = {}) => api.get('/menu', { params }),
  
  // Search menu items
  search: (query) => api.get('/menu/search', { params: { q: query } }),
  
  // Get single menu item
  getById: (id) => api.get(`/menu/${id}`),
  
  // Create new menu item
  create: (data) => api.post('/menu', data),
  
  // Update menu item
  update: (id, data) => api.put(`/menu/${id}`, data),
  
  // Delete menu item
  delete: (id) => api.delete(`/menu/${id}`),
  
  // Toggle availability
  toggleAvailability: (id) => api.patch(`/menu/${id}/availability`),
};

// Order API calls
export const orderAPI = {
  // Get all orders with pagination and filters
  getAll: (params = {}) => api.get('/orders', { params }),
  
  // Get single order
  getById: (id) => api.get(`/orders/${id}`),
  
  // Create new order
  create: (data) => api.post('/orders', data),
  
  // Update order status
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  
  // Get top sellers
  getTopSellers: () => api.get('/orders/analytics/top-sellers'),
};

export default api;
