'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import JobDetailFormModal from './JobDetailFormModal';
import { getJobDetailList, deleteJobDetail } from '@/application/service/JobDetailService';
import { JobDetail } from '@/types/jobDetail';
import Pagination from '@/components/common/Pagination';

export default function JobDetailListPage() {
  const [jobDetails, setJobDetails] = useState<JobDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobDetail, setSelectedJobDetail] = useState<JobDetail | null>(null);

  useEffect(() => {
    fetchJobDetails();
  }, [currentPage, searchTerm]);

  const fetchJobDetails = async () => {
    const res = await getJobDetailList(currentPage, searchTerm);
    setJobDetails(res);
  };

  const handleDelete = async (id: number) => {
    await deleteJobDetail(id);
    fetchJobDetails();
  };

  const openModal = (jobDetail?: JobDetail) => {
    setSelectedJobDetail(jobDetail || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý Chi Tiết Công Việc</h1>
        <Button onClick={() => openModal()}>+ Thêm chi tiết</Button>
      </div>

      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Job ID</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobDetails.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell>{detail.id}</TableCell>
              <TableCell>{detail.jobId}</TableCell>
              <TableCell>{detail.description}</TableCell>
              <TableCell>{detail.price}</TableCell>
              <TableCell>
                <Button onClick={() => openModal(detail)}>Sửa</Button>
                <Button variant="destructive" onClick={() => handleDelete(detail.id)}>Xoá</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />

      {isModalOpen && (
        <JobDetailFormModal
          jobDetail={selectedJobDetail}
          onClose={() => {
            setIsModalOpen(false);
            fetchJobDetails();
          }}
        />
      )}
    </div>
  );
}
