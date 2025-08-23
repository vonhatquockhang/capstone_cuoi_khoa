// /services/dashboardService.ts
import axios from 'axios';
import { DashboardStats } from '@/types/dashBoard';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axios.get('/api/dashboard/stats');
  return response.data;
};
