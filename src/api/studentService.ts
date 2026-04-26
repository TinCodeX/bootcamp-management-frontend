import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface BootcampResource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'handout';
  url: string;
  createdAt: string;
}

export const studentService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await axiosInstance.get(ENDPOINTS.AUTH.ME);
    return response.data;
  },

  getResources: async (bootcampId: string): Promise<BootcampResource[]> => {
    const response = await axiosInstance.get(ENDPOINTS.BOOTCAMPS.RESOURCES(bootcampId));
    return response.data;
  },

  getResourceDetail: async (bootcampId: string, resourceId: string): Promise<BootcampResource> => {
    const response = await axiosInstance.get(ENDPOINTS.BOOTCAMPS.RESOURCE_DETAIL(bootcampId, resourceId));
    return response.data;
  },

  downloadResource: async (bootcampId: string, resourceId: string, fileName: string) => {
    const response = await axiosInstance.get(
      ENDPOINTS.BOOTCAMPS.RESOURCE_DOWNLOAD(bootcampId, resourceId),
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  getAttendance: async (bootcampId: string) => {
    const response = await axiosInstance.get(ENDPOINTS.BOOTCAMPS.ATTENDANCE(bootcampId));
    return response.data;
  },

  getAttendanceStats: async (bootcampId: string) => {
    const response = await axiosInstance.get(ENDPOINTS.BOOTCAMPS.ATTENDANCE_STATS(bootcampId));
    return response.data;
  }
};
