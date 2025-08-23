'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Booking } from '@/types/booking';
import { createBooking, updateBooking } from '@/application/service/bookingService';

interface Props {
  booking?: Booking | null;
  onClose: () => void;
}

export default function BookingFormModal({ booking, onClose }: Props) {
  const [formData, setFormData] = useState({
    maCongViec: '',
    maNguoiThue: '',
    ngayThue: '',
    hoanThanh: false,
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        maCongViec: booking.maCongViec.toString(),
        maNguoiThue: booking.maNguoiThue.toString(),
        ngayThue: booking.ngayThue,
        hoanThanh: booking.hoanThanh,
      });
    }
  }, [booking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      maCongViec: +formData.maCongViec,
      maNguoiThue: +formData.maNguoiThue,
      ngayThue: formData.ngayThue,
      hoanThanh: formData.hoanThanh,
    };

    if (booking) {
      await updateBooking(booking.id, data);
    } else {
      await createBooking(data);
    }
    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose}>
      <DialogContent>
        <DialogHeader>{booking ? 'Cập nhật đặt lịch' : 'Thêm đặt lịch'}</DialogHeader>
        <Input name="maCongViec" placeholder="Mã công việc" value={formData.maCongViec} onChange={handleChange} />
        <Input name="maNguoiThue" placeholder="Mã người thuê" value={formData.maNguoiThue} onChange={handleChange} />
        <Input name="ngayThue" type="date" value={formData.ngayThue} name="ngayThue" onChange={handleChange} />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="hoanThanh" checked={formData.hoanThanh} onChange={handleChange} />
          <span>Hoàn thành</span>
        </label>
        <Button onClick={handleSubmit}>{booking ? 'Lưu' : 'Tạo mới'}</Button>
      </DialogContent>
    </Dialog>
  );
}
