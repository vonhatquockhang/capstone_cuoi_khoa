'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { getReviewList, deleteReview } from '@/application/service/reviewService';
import { Review } from '@/types/review';
import Pagination from '@/components/common/Pagination';
import ReviewFormModal from './ReviewFormModal';

export default function ReviewListPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [currentPage, searchTerm]);

  const fetchReviews = async () => {
    const res = await getReviewList(currentPage, searchTerm);
    setReviews(res);
  };

  const handleDelete = async (id: string) => {
    await deleteReview(id);
    fetchReviews();
  };

  const openModal = (review?: Review) => {
    setSelectedReview(review || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý đánh giá</h1>
        <Button onClick={() => openModal()}>+ Thêm đánh giá</Button>
      </div>

      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Tìm kiếm đánh giá..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Người dùng</TableHead>
            <TableHead>Job ID</TableHead>
            <TableHead>Sao</TableHead>
            <TableHead>Nội dung</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.user?.name}</TableCell>
              <TableCell>{r.job?.id}</TableCell>
              <TableCell>{r.rating}</TableCell>
              <TableCell>{r.content}</TableCell>
              <TableCell>
                <Button onClick={() => openModal(r)}>Sửa</Button>
                <Button variant="destructive" onClick={() => handleDelete(r.id)}>Xoá</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />

      {isModalOpen && (
        <ReviewFormModal
          review={selectedReview}
          onClose={() => {
            setIsModalOpen(false);
            fetchReviews();
          }}
        />
      )}
    </div>
  );
}
