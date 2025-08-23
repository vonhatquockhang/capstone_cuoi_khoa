'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number; // Optional: nếu bạn muốn dùng tổng số trang
}

export default function Pagination({ currentPage, onPageChange, totalPages }: Props) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!totalPages || currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-6 gap-4">
      <Button variant="outline" onClick={handlePrev} disabled={currentPage === 1}>
        Trang trước
      </Button>
      <span className="self-center">Trang {currentPage}</span>
      <Button variant="outline" onClick={handleNext}>
        Trang sau
      </Button>
    </div>
  );
}
