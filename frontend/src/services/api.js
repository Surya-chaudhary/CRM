import axios from 'axios';

const getApiUrl = () => {
  const { protocol, hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:8000/api`;
  }
  return `${protocol}//${hostname}/api`;
};

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      
      switch (error.response.status) {
        case 400:
          console.error('Bad request:', error.response.data);
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
    } else if (error.request) {
      console.error('No response from server. Is the backend running?');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default API;