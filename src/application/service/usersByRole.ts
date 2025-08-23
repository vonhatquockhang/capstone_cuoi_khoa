import axiosInstance from "../core/api";
import { UsersByRole } from "@/types/usersByRole";

export const getUsersByRole = async (): Promise<UsersByRole[]> => {
  const response = await axiosInstance.get("/users-by-role");
  return response.data;
};
