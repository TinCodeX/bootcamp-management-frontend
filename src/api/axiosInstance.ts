import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vanguard_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('vanguard_refresh_token');

      if (refreshToken) {
        try {
          // Attempt to refresh the token
          // Note: We use axios directly here to avoid the interceptor loop
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem('vanguard_token', accessToken);
          localStorage.setItem('vanguard_refresh_token', newRefreshToken);

          // Update the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear tokens and redirect to login
          localStorage.removeItem('vanguard_token');
          localStorage.removeItem('vanguard_refresh_token');
          window.location.href = '/student';
          return Promise.reject(refreshError);
        }
      }
    }

    // Standard 401 handling if no refresh token or refresh failed
    if (error.response?.status === 401) {
      localStorage.removeItem('vanguard_token');
      localStorage.removeItem('vanguard_refresh_token');
      if (window.location.pathname !== '/student') {
        window.location.href = '/student';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
