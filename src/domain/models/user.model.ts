export interface User {
  id: string;
  username: string;
  fullname: string; // ✅ sửa từ "name" → "fullname"
  email: string;
  phone: string;
  role: "ADMIN" | "USER";
  token?: string;
}

export interface SignupData {
  username: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  email: string;
  phone: string;
}

export interface SigninData {
  username: string;
  password: string;
}
