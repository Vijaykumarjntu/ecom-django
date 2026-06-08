// Create src/services/api.js
const API_BASE_URL = 'http://localhost:8000/api';

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  // DELETE requests (and other 204 responses) have no body
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};