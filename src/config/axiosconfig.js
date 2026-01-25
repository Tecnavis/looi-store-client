import axios from 'axios';

// export const BASE_URL = 'https://looi-store-server-ypdx.onrender.com';
// export const BASE_URL = 'http://localhost:8000';
export const BASE_URL = 'https://api.looi.in';

const API_BASE =
  BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;

const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear any existing auth tokens
      localStorage.removeItem('token');
      // Redirect to login page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
