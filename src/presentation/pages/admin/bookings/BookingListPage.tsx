'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { getBookingList, deleteBooking, createBooking, updateBooking } from '@/application/service/bookingService';
import BookingFormModal from './BookingFormModal';
import { Booking } from '@/types/booking';
import Pagination from '@/components/common/Pagination';

export default function BookingListPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [currentPage, searchTerm]);

  const fetchBookings = async () => {
    const res = await getBookingList(currentPage, searchTerm);
    setBookings(res);
  };

  const handleDelete = async (id: string) => {
    await deleteBooking(id);
    fetchBookings();
  };

  const handleSave = async (data: Partial<Booking>) => {
    if (data.id) {
      await updateBooking(data.id, data);
    } else {
      await createBooking(data);
    }
    fetchBookings();
  };

  const openModal = (booking?: Booking) => {
    setSelectedBooking(booking || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý Đặt công việc (Booking)</h1>
        <Button onClick={() => openModal()}>+ Thêm booking</Button>
      </div>

      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Tìm kiếm theo Job ID hoặc User ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Job ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.jobId}</TableCell>
              <TableCell>{booking.userId}</TableCell>
              <TableCell>{booking.status ? 'Hoàn thành' : 'Chưa xong'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button onClick={() => openModal(booking)}>Sửa</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Xoá
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <BookingFormModal
          booking={selectedBooking}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
}
