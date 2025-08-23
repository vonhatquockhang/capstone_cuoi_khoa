'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getChiTietLoaiCongViecList } from "@/application/service/chiTietLoaiCongViecService";
import { ChiTietLoaiCongViec } from "@/types/chiTietLoaiCongViec";
import FormDialog from "./ChiTietLoaiCongViecFormDialog";

export default function ChiTietLoaiCongViecListPage() {
  const [list, setList] = useState<ChiTietLoaiCongViec[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ChiTietLoaiCongViec | null>(null);

  const fetchData = async () => {
    const data = await getChiTietLoaiCongViecList(search);
    setList(data);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Tìm theo tên công việc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Button onClick={() => { setSelected(null); setOpen(true); }}>
          + Thêm mới
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {list.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{item.tenNhom}</h3>
            <p>ID: {item.id}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => { setSelected(item); setOpen(true); }}
            >
              Sửa
            </Button>
          </div>
        ))}
      </div>

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        selected={selected}
        onSuccess={fetchData}
      />
    </div>
  );
}
