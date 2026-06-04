// Create src/services/menuService.js
import { apiRequest } from './api';

export const menuService = {
  getAll: () => apiRequest('/menu'),
  
  create: (data) => apiRequest('/menu', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  update: (id, data) => apiRequest(`/menu/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  delete: (id) => apiRequest(`/menu/${id}`, {
    method: 'DELETE'
  }),

  search: (query) => apiRequest(`/menu?search=${query}`),
};