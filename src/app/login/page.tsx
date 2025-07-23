"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DangNhapPage() {
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");

      alert("✅ Đăng nhập thành công!");
      // 👉 Có thể lưu user vào localStorage/sessionStorage nếu cần
      router.push("/"); // Chuyển về trang chủ (hoặc dashboard)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Lỗi không xác định.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
      {error && <p className="text-red-600">{error}</p>}
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}
