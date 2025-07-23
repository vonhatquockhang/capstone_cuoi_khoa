import { fetchJobCategories, fetchJobsByChiTietLoai, fetchJobsByDetailCategory, fetchJobsByKeyword } from "@/infrastructure/api/job.api";


export const JobService = {
  getJobsByKeyword: async (keyword: string) => {
    return await fetchJobsByKeyword(keyword);
  },
  // domain/service/jobservice.ts
  getJobCategories: async () => {
    return await fetchJobCategories();
  },
  getJobsByChiTietLoai: async (id: number) => {
    return await fetchJobsByChiTietLoai(id);
  },
  getJobsByDetailCategory: async (id: string) => {
    return await fetchJobsByDetailCategory(id);
  },
};