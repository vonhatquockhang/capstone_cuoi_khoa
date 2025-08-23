"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { AuthService } from "@/application/service/authService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await AuthService.signin(form);

      // ✅ Lưu user vào localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Thông báo và chuyển hướng
      alert("Đăng nhập thành công!");
      router.push("/");
    } catch (err) {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Tài khoản</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Nhập tài khoản"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            Đăng nhập
          </button>
          <div className="text-center mt-6 text-sm">
            <span className="text-gray-600">Chưa có tài khoản? </span>
            <button
              onClick={() => router.push("/auth/register")}
              className="text-blue-600 font-medium hover:underline"
              type="button"
            >
              Đăng ký ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
