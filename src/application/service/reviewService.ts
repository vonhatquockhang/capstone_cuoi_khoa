import axiosInstance from '../core/api';
import { Review } from '@/types/review';

export const getReviewList = async (page: number, searchTerm: string): Promise<Review[]> => {
  const res = await axiosInstance.get('/reviews', {
    params: { page, keyword: searchTerm }
  });
  return res.data.content;
};

export const createReview = async (data: {
  userId: string;
  jobId: string;
  rating: number;
  content: string;
}) => {
  return axiosInstance.post('/reviews', data);
};

export const updateReview = async (
  id: string,
  data: {
    userId: string;
    jobId: string;
    rating: number;
    content: string;
  }
) => {
  return axiosInstance.put(`/reviews/${id}`, data);
};

export const deleteReview = async (id: string) => {
  return axiosInstance.delete(`/reviews/${id}`);
};
