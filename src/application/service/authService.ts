import { AuthApi } from "@/infrastructure/api/auth.api";
import { SignupData, SigninData, User } from "@/domain/models/user.model";

export const AuthService = {
  signup: async (data: SignupData): Promise<User> => {
    const user = await AuthApi.signup(data);
    return user;
  },

  signin: async (data: SigninData): Promise<User> => {
    const user = await AuthApi.signin(data);
    if (user.token) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user)); // ✅ Lưu user
      window.dispatchEvent(new Event("userChanged"));     // ✅ Gửi sự kiện cập nhật giao diện
    }
    return user;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged")); // ✅ Gửi sự kiện sau khi logout
  },
};
