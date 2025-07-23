"use client";
import { useEffect, useState } from "react";

interface LoaiCongViec {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: {
    id: number;
    tenNhom: string;
    danhSachChiTietLoai: {
      id: number;
      tenChiTiet: string;
    }[];
  }[];
}

export default function DanhSachLoaiCongViec() {
  const [data, setData] = useState<LoaiCongViec[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-menu-loai-cong-viec",
          {
            headers: {
              TokenCybersoft:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8", // dán token thật
            },
          }
        );
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Lỗi gọi API");

        setData(json.content);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Đã xảy ra lỗi không xác định.");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách loại công việc</h1>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="p-3 border rounded shadow">
            <strong>{item.tenLoaiCongViec}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
