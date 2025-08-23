// src/application/service/serviceService.ts
import axiosInstance from '../core/api';
import { Service } from '@/types/service';

export const getServiceList = async (page: number, searchTerm: string): Promise<Service[]> => {
  const res = await axiosInstance.get('/api/services', {
    params: { page, keyword: searchTerm }
  });
  return res.data.content;
};

export const createService = async (data: Partial<Service>) => {
  const res = await axiosInstance.post('/api/services', data);
  return res.data;
};

export const updateService = async (id: number, data: Partial<Service>) => {
  const res = await axiosInstance.put(`/api/services/${id}`, data);
  return res.data;
};

export const deleteService = async (id: number) => {
  const res = await axiosInstance.delete(`/api/services/${id}`);
  return res.data;
};
