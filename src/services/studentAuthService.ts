import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const studentAuthService = {
  login: async (username: string, password: string) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, {
      username,
      password,
    });

    return response.data;
  },

  logout: async () => {
    return axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
  },

  refresh: async (refreshToken: string) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get(ENDPOINTS.AUTH.ME);
    return response.data;
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
  }) => {
    const response = await axiosInstance.put(ENDPOINTS.AUTH.ME, data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return axiosInstance.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  requestPasswordReset: async (email: string) => {
    return axiosInstance.post(ENDPOINTS.AUTH.REQUEST_RESET, {
      email,
    });
  },

  confirmPasswordReset: async (data: {
    token: string;
    newPassword: string;
  }) => {
    return axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },
};
