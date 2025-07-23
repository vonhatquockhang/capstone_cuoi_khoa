"use client";

import { useState } from "react";

export default function DangKyPage() {
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    xacNhanMatKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Validation chi tiết
    if (form.taiKhoan.length < 6) {
      setError("Tài khoản phải có ít nhất 6 ký tự.");
      return;
    }

    if (form.matKhau.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (form.matKhau !== form.xacNhanMatKhau) {
      setError("Mật khẩu không khớp.");
      return;
    }

    if (!form.hoTen.trim()) {
      setError("Họ tên không được để trống.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Email không hợp lệ.");
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(form.soDt)) {
      setError("Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.");
      return;
    }

    // ✅ Gửi dữ liệu nếu hợp lệ
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Lỗi không xác định");

      setSuccess("Đăng ký thành công!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Đăng ký</h1>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="taiKhoan"
          placeholder="Tài khoản"
          value={form.taiKhoan}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="matKhau"
          placeholder="Mật khẩu"
          value={form.matKhau}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="xacNhanMatKhau"
          placeholder="Nhập lại mật khẩu"
          value={form.xacNhanMatKhau}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="hoTen"
          placeholder="Họ tên"
          value={form.hoTen}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="soDt"
          placeholder="Số điện thoại"
          value={form.soDt}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng ký
        </button>
      </form>

      {/* 🔗 Link chuyển đến trang đăng nhập */}
      <div className="mt-4 text-center">
        <p>
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
