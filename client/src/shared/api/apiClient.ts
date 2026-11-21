import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15 second request timeout
});

// Response interceptor for extracting clean error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message === 'Network Error') {
      message = 'Unable to connect to server. Please check your internet connection.';
    } else if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. Please try again.';
    }

    return Promise.reject(new Error(message));
  }
);

