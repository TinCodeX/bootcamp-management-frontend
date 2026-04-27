import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

export interface AdminQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface DivisionPayload {
  name: string;
  description?: string;
}

export interface BootcampPayload {
  name: string;
  description?: string;
  division_id?: string;
  isActive?: boolean;
}

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  password?: string;
}

const withData = async (promise: Promise<{ data: unknown }>) => {
  const response = await promise;
  return response.data;
};

export const adminService = {
  getDivisions: (params: AdminQuery = {}) => withData(axiosInstance.get(ENDPOINTS.DIVISIONS.BASE, { params })),
  createDivision: (payload: DivisionPayload) => withData(axiosInstance.post(ENDPOINTS.DIVISIONS.BASE, payload)),
  updateDivision: (id: string, payload: Partial<DivisionPayload>) =>
    withData(axiosInstance.put(ENDPOINTS.DIVISIONS.DETAIL(id), payload)),
  deleteDivision: (id: string) => withData(axiosInstance.delete(ENDPOINTS.DIVISIONS.DETAIL(id))),

  getBootcamps: (params: AdminQuery = {}) => withData(axiosInstance.get(ENDPOINTS.BOOTCAMPS.BASE, { params })),
  createBootcamp: (payload: BootcampPayload) => withData(axiosInstance.post(ENDPOINTS.BOOTCAMPS.BASE, payload)),
  updateBootcamp: (id: string, payload: Partial<BootcampPayload>) =>
    withData(axiosInstance.put(ENDPOINTS.BOOTCAMPS.DETAIL(id), payload)),
  deleteBootcamp: (id: string) => withData(axiosInstance.delete(ENDPOINTS.BOOTCAMPS.DETAIL(id))),

  getUsers: (params: AdminQuery = {}) => withData(axiosInstance.get(ENDPOINTS.USERS.BASE, { params })),
  createUser: (payload: UserPayload) => withData(axiosInstance.post(ENDPOINTS.USERS.BASE, payload)),
  updateUser: (id: string, payload: Partial<UserPayload>) => withData(axiosInstance.put(ENDPOINTS.USERS.DETAIL(id), payload)),
  toggleUserStatus: (id: string, isActive: boolean) => withData(axiosInstance.patch(ENDPOINTS.USERS.STATUS(id), { isActive })),
};
