// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface LoaiCongViec {
  id: number;
  tenLoaiCongViec: string;
}

export default function HomePage() {
  const [data, setData] = useState<LoaiCongViec[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-menu-loai-cong-viec",
          {
            headers: {
              TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8",
            },
          }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Lỗi API");
        setData(json.content);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Lỗi không xác định.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">
        <div className="text-green-700 font-bold text-2xl">fiverr</div>
        <div className="hidden md:flex gap-6 text-gray-700">
          <a href="#" className="hover:text-green-600">Dịch vụ</a>
          <a href="#" className="hover:text-green-600">Khám phá</a>
          <a href="#" className="hover:text-green-600">Doanh nghiệp</a>
        </div>
        <div className="space-x-4">
          <a href="/login" className="text-gray-700 hover:text-green-600">
            Đăng nhập
          </a>
          <a
            href="/register"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Đăng ký
          </a>
        </div>
      </nav>

      {/* Hero section */}
      <section
        className="relative bg-cover bg-center text-white py-24 px-6"
        style={{ backgroundImage: "url(/banner.jpg)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Tìm freelancer cho mọi nhu cầu công việc
          </h1>
          <p className="text-xl mb-6">Nhanh chóng - Linh hoạt - Chất lượng</p>

          <div className="flex items-center bg-white rounded overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Tìm dịch vụ..."
              className="w-full px-4 py-3 text-gray-800 focus:outline-none"
            />
            <button className="bg-green-600 text-white px-6 py-3 hover:bg-green-700">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Danh sách loại công việc */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Danh mục nổi bật</h2>
          {error && <p className="text-red-600">{error}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden text-center p-4 border"
              >
                <div className="h-24 w-full bg-gray-100 flex items-center justify-center text-4xl text-gray-400 mb-3">
                  📁
                </div>
                <p className="text-gray-800 font-semibold">
                  {item.tenLoaiCongViec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-6 px-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} FiverrClone. All rights reserved.
      </footer>
    </div>
  );
}
