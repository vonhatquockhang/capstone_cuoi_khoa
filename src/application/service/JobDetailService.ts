import axios from 'axios';
import { JobDetail } from '@/types/jobDetail';

const BASE_URL = '/api/job-detail';

export const getJobDetailList = async (page: number, search: string) => {
  const res = await axios.get(`${BASE_URL}?page=${page}&search=${search}`);
  return res.data;
};

export const createJobDetail = async (data: { image: string; jobId: string }) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateJobDetail = async (id: string, data: { image: string; jobId: string }) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteJobDetail = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
