export interface JobCategoryGroup {
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: {
    tenNhom: string;
    dsChiTietLoai: {
      id: number;
      tenChiTiet: string;
    }[];
  }[];
}
