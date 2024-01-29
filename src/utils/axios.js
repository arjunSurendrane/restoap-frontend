import axios from 'axios';
import { HOST_API_KEY } from '../config-global';

const API = axios.create({
  baseURL: HOST_API_KEY,
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from wherever you store it (e.g., localStorage, cookies)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Add the access token to the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access or expired token
      // For example, you might redirect the user to the login page
      if (!window.location.href.includes('login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
