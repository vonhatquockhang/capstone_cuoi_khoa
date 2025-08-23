import axiosInstance from "../core/api";
import { JobByHirer } from "@/types/jobByHirer";

export const getJobsByHirer = async (): Promise<JobByHirer[]> => {
  const response = await axiosInstance.get("/jobs-by-hirer");
  return response.data.content; // hoặc response.data tùy vào API
};
