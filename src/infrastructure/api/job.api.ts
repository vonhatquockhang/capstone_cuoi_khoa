import { JobListResponse } from "@/types/job";
import axios from "axios";


const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8"; // bạn có thể dùng `Bearer token` từ localStorage sau này

export async function fetchJobsByKeyword(
  keyword: string
): Promise<JobListResponse> {
  const res = await axios.get(
    `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`,
    {
      headers: {
        tokenCybersoft: token,
      },
    }
  );
  return res.data;
}
export async function fetchJobCategories() {
  const res = await fetch(
    "https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-menu-loai-cong-viec",
    {
      headers: {
        tokenCybersoft: token,
      },
    }
  );
  return await res.json();
}
export async function fetchJobsByChiTietLoai(
  maChiTietLoai: number
): Promise<JobListResponse> {
  const res = await axios.get(
    `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${maChiTietLoai}`,
    {
      headers: {
        tokenCybersoft: token,
      },
    }
  );
  return res.data;
}
export async function fetchJobsByDetailCategory(maChiTietLoai: string) {
  const res = await axios.get(
    `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${maChiTietLoai}`,
    {
      headers: {
        tokenCybersoft: token,
      },
    }
  );
  return res.data;
}