import axios from 'axios';
import { JobType } from '@/types/jobType';

const BASE_URL = 'https://your-api.com/job-types'; // Thay bằng URL thực tế

export async function getJobTypeList(page = 1, search = ''): Promise<JobType[]> {
  const response = await axios.get(`${BASE_URL}?page=${page}&search=${search}`);
  return response.data;
}

export async function createJobType(data: { name: string }) {
  await axios.post(BASE_URL, data);
}

export async function updateJobType(id: string, data: { name: string }) {
  await axios.put(`${BASE_URL}/${id}`, data);
}

export async function deleteJobType(id: string) {
  await axios.delete(`${BASE_URL}/${id}`);
}
