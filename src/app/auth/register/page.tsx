"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/application/service/authService";

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  email: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    username: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Vui lòng nhập tài khoản.";
    }

    if (!form.password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    } else if (!/[A-Z]/.test(form.password) || !/\d/.test(form.password)) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 1 chữ hoa và 1 số.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    if (!form.fullname.trim()) {
      newErrors.fullname = "Vui lòng nhập họ tên.";
    }

    if (!form.email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!form.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^0\d{9}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại phải bắt đầu bằng số 0 và đủ 10 chữ số.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await AuthService.signup(form);
      alert("Đăng ký thành công! Mời bạn đăng nhập.");
      router.push("/auth/login");
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng ký</h1>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "username", label: "Tài khoản", type: "text" },
            { name: "password", label: "Mật khẩu", type: "password" },
            { name: "confirmPassword", label: "Nhập lại mật khẩu", type: "password" },
            { name: "fullname", label: "Họ tên", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Số điện thoại", type: "tel" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name as keyof RegisterForm]}
                onChange={handleChange}
                placeholder={`Nhập ${field.label.toLowerCase()}`}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[field.name]
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors[field.name] && (
                <p className="mt-1 text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between gap-2 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Đăng ký
            </button>
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="w-full sm:w-auto border border-gray-400 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Đăng nhập →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
