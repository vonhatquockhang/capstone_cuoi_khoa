import { UserAPI } from "@/infrastructure/api/user.api";
import { User } from "@/domain/models/user.model";

export const UserService = {
  getUsers: async (page = 1, keyword = "") => {
    const res = await UserAPI.getAllUsers(page, keyword);
    return res.data;
  },

  createAdmin: async (data: Partial<User>) => {
    const res = await UserAPI.createUser({ ...data, role: "ADMIN" });
    return res.data;
  },

  updateUser: async (id: string, data: Partial<User>) => {
    const res = await UserAPI.updateUser(id, data);
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await UserAPI.deleteUser(id);
    return res.data;
  },
};
