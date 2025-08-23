import axiosInstance from '../core/api';
import { Booking } from '@/types/booking';

export const getBookingList = async (page: number, searchTerm: string): Promise<Booking[]> => {
  const res = await axiosInstance.get(`/dat-lich`, {
    params: { page, keyword: searchTerm }
  });
  return res.data.content;
};

export const createBooking = async (booking: Partial<Booking>) => {
  return await axiosInstance.post(`/dat-lich`, booking);
};

export const updateBooking = async (id: string, booking: Partial<Booking>) => {
  return await axiosInstance.put(`/dat-lich/${id}`, booking);
};

export const deleteBooking = async (id: string) => {
  return await axiosInstance.delete(`/dat-lich/${id}`);
};
