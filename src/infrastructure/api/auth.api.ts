import { SignupData, SigninData, User } from '@/domain/models/user.model';
import { fetcher } from '@/lib/fetcher';

interface ApiResponse<T> {
  user: T;
  message?: string;
  error?: string;
}

export const AuthApi = {
  signup: async (data: SignupData): Promise<User> => {
    const res = await fetcher.post("/api/auth/signup", data);
    console.log("signup response:", res.data);
    return res.data.user; // kiểm tra ở đây có user không
  },

  signin: async (data: SigninData): Promise<User> => {
    const res = await fetcher.post("/api/auth/signin", data);
    console.log("signin response:", res.data);
    return res.data.user; // kiểm tra ở đây có user không
  },
   logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
