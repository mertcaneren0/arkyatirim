// Production'da same-origin, development'da localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : 
   window.location.origin + '/api');

export { API_BASE_URL }; 