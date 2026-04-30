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
  },

  getPendingFeedback: async () => {
    const response = await axiosInstance.get(ENDPOINTS.STUDENT.FEEDBACK_PENDING);
    return response.data;
  },

  submitFeedback: async (sessionId: string, data: any) => {
    const response = await axiosInstance.post(ENDPOINTS.STUDENT.FEEDBACK_SUBMIT(sessionId), data);
    return response.data;
  },

  updateFeedback: async (sessionId: string, data: any) => {
    const response = await axiosInstance.put(ENDPOINTS.STUDENT.FEEDBACK_SUBMIT(sessionId), data);
    return response.data;
  },

  getMyFeedback: async (sessionId: string) => {
    const response = await axiosInstance.get(ENDPOINTS.STUDENT.FEEDBACK_MY(sessionId));
    return response.data;
  },

  getSubmissions: async () => {
    const response = await axiosInstance.get(ENDPOINTS.STUDENT.SUBMISSIONS);
    return response.data;
  },

  getSubmissionDetails: async (submissionId: string) => {
    const response = await axiosInstance.get(ENDPOINTS.STUDENT.SUBMISSION_DETAIL(submissionId));
    return response.data;
  },

  resubmitWork: async (submissionId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.put(ENDPOINTS.STUDENT.SUBMISSION_DETAIL(submissionId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getTasks: async () => {
    const response = await axiosInstance.get(ENDPOINTS.STUDENT.TASKS);
    return response.data;
  },

  getTaskDetails: async (taskId: string) => {
    const response = await axiosInstance.get(ENDPOINTS.STUDENT.TASK_DETAIL(taskId));
    return response.data;
  },

  submitTask: async (taskId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post(ENDPOINTS.STUDENT.TASK_SUBMIT(taskId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getBootcamps: async () => {
    const response = await axiosInstance.get(ENDPOINTS.STUDENT.BOOTCAMPS);
    return response.data;
  },

  getSessions: async (bootcampId: string) => {
    const response = await axiosInstance.get(ENDPOINTS.SESSIONS.BASE(bootcampId));
    return response.data;
  }
};
