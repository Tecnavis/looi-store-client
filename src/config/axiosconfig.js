import axios from 'axios';

export const BASE_URL = 'https://looi-store-server-izvs.onrender.com/api';
// export const BASE_URL = 'http://localhost:8000/api';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// ✅ Attach JWT token to every request automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle 401 - session expired (but never on auth endpoints — a wrong
// password/OTP returns 401 too, and we don't want that to redirect the user
// away before the error message has a chance to show).
const AUTH_ENDPOINTS = ['/user-login', '/user-register', '/admin-login', '/send-otp', '/verify-otp', '/forgot-password', '/reset-password'];

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response && error.response.status;
    const requestUrl = (error.config && error.config.url) || '';
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => requestUrl.includes(path));

    if (status === 401 && !isAuthEndpoint) {
      const hadToken = !!localStorage.getItem('token');
      localStorage.removeItem('token');
      // Only force a redirect if there was an active session that just expired,
      // and we're not already on the login page.
      if (hadToken && window.location.pathname !== '/login-register') {
        window.location.href = '/login-register';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
