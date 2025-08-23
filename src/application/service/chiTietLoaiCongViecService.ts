import { ChiTietLoaiCongViec } from "@/types/chiTietLoaiCongViec";

export const getChiTietLoaiCongViecList = async (search = ""): Promise<ChiTietLoaiCongViec[]> => {
  const res = await fetch(`/api/chi-tiet-loai-cong-viec?search=${search}`);
  return res.json();
};

export const createChiTietLoaiCongViec = async (data: Partial<ChiTietLoaiCongViec>) => {
  const res = await fetch(`/api/chi-tiet-loai-cong-viec`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const updateChiTietLoaiCongViec = async (
  id: number,
  data: Partial<ChiTietLoaiCongViec>
) => {
  const res = await fetch(`/api/chi-tiet-loai-cong-viec/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};
