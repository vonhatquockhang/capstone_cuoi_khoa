// /services/notificationService.ts
import axios from 'axios';
import { Notification } from '@/types/notification';

export const getAllNotifications = async (): Promise<Notification[]> => {
  const response = await axios.get('/api/notifications');
  return response.data;
};
