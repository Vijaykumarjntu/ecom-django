// Create src/services/menuService.js
import { apiRequest } from './api';

export const menuService = {
  // getAll: () => apiRequest('/menu'),
  
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.is_available !== undefined) params.append('is_available', filters.is_available);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    console.log(queryString);
    return apiRequest(`/menu${queryString ? `?${queryString}` : ''}`);
  },

  create: (data) => apiRequest('/menu/', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  update: (id, data) => apiRequest(`/menu/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  delete: (id) => apiRequest(`/menu/${id}/`, {
    method: 'DELETE'
  })

  // search: (query) => apiRequest(`/menu?search=${query}`),
};