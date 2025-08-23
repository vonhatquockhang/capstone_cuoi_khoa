import { fetcher } from "@/lib/fetcher";
import { User } from "@/domain/models/user.model";

export const UserAPI = {
  getAllUsers: (page = 1, keyword = "") =>
    fetcher.get(`/api/users/phan-trang-tim-kiem?page=${page}&keyword=${keyword}`),

  createUser: (data: Partial<User>) =>
    fetcher.post("/api/users", data),

  updateUser: (id: string, data: Partial<User>) =>
    fetcher.put(`/api/users/${id}`, data),

  deleteUser: (id: string) =>
    fetcher.delete(`/api/users/${id}`),
};
