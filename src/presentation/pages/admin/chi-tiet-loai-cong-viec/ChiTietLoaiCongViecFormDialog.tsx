'use client';

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChiTietLoaiCongViec } from "@/types/chiTietLoaiCongViec";
import { createChiTietLoaiCongViec, updateChiTietLoaiCongViec } from "@/application/service/chiTietLoaiCongViecService";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: ChiTietLoaiCongViec | null;
  onSuccess: () => void;
}

export default function FormDialog({
  open,
  onOpenChange,
  selected,
  onSuccess,
}: Props) {
  const [tenNhom, setTenNhom] = useState("");

  useEffect(() => {
    if (selected) {
      setTenNhom(selected.tenNhom);
    } else {
      setTenNhom("");
    }
  }, [selected]);

  const handleSubmit = async () => {
    if (selected) {
      await updateChiTietLoaiCongViec(selected.id, { tenNhom });
    } else {
      await createChiTietLoaiCongViec({ tenNhom });
    }
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <h2 className="text-lg font-bold mb-4">
          {selected ? "Sửa" : "Thêm"} Chi Tiết Loại Công Việc
        </h2>
        <Input
          placeholder="Tên nhóm"
          value={tenNhom}
          onChange={(e) => setTenNhom(e.target.value)}
        />
        <Button onClick={handleSubmit} className="mt-4">
          {selected ? "Cập nhật" : "Thêm mới"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
