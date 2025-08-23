'use client';

import { useState, useEffect } from 'react';
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
import Pagination from '@/components/common/Pagination';
import JobTypeFormModal from '@/presentation/pages/admin/job-types/JobTypeFormModal';

import { getJobTypeList, deleteJobType } from '@/application/service/jobTypeService';
import { JobType } from '@/types/jobType';

export default function JobTypeListPage() {
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null);

  useEffect(() => {
    fetchJobTypes();
  }, [currentPage, searchTerm]);

  const fetchJobTypes = async () => {
    try {
      const res = await getJobTypeList(currentPage, searchTerm);
      setJobTypes(res);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách loại công việc:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xoá loại công việc này không?')) return;
    try {
      await deleteJobType(id);
      fetchJobTypes();
    } catch (error) {
      console.error('Lỗi khi xoá loại công việc:', error);
    }
  };

  const openModal = (jobType?: JobType) => {
    setSelectedJobType(jobType || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý loại công việc</h1>
        <Button onClick={() => openModal()}>+ Thêm loại</Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Tìm kiếm loại công việc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobTypes.map((type) => (
            <TableRow key={type.id}>
              <TableCell>{type.id}</TableCell>
              <TableCell>{type.name}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" onClick={() => openModal(type)}>
                  Sửa
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(type.id)}>
                  Xoá
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Modal */}
      {isModalOpen && (
        <JobTypeFormModal
          jobType={selectedJobType}
          onClose={() => {
            setIsModalOpen(false);
            fetchJobTypes();
          }}
        />
      )}
    </div>
  );
}
