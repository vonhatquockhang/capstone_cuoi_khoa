import axios from 'axios';
import { Job } from '@/types/job';

export const getJobList = async (page: number, keyword: string) => {
  const res = await axios.get(`/api/cong-viec/phan-trang-tim-kiem`, {
    params: {
      page,
      keyword,
    },
  });
  return res.data.content;
};

export const createJob = async (data: Omit<Job, 'id'>) => {
  return axios.post(`/api/cong-viec`, data);
};

export const updateJob = async (id: string, data: Omit<Job, 'id'>) => {
  return axios.put(`/api/cong-viec/${id}`, data);
};

export const deleteJob = async (id: string) => {
  return axios.delete(`/api/cong-viec/${id}`);
};
