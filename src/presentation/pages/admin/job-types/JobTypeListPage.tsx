'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { getJobTypeList, deleteJobType } from '@/application/service/jobTypeService';
import JobTypeFormModal from './JobTypeFormModal';
import Pagination from '@/components/common/Pagination';
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
    const res = await getJobTypeList(currentPage, searchTerm);
    setJobTypes(res);
  };

  const handleDelete = async (id: string) => {
    await deleteJobType(id);
    fetchJobTypes();
  };

  const openModal = (jobType?: JobType) => {
    setSelectedJobType(jobType || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý loại công việc</h1>
        <Button onClick={() => openModal()}>+ Thêm loại công việc</Button>
      </div>

      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Tìm kiếm loại công việc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobTypes.map((jobType) => (
            <TableRow key={jobType.id}>
              <TableCell>{jobType.id}</TableCell>
              <TableCell>{jobType.name}</TableCell>
              <TableCell>
                <Button onClick={() => openModal(jobType)}>Sửa</Button>
                <Button variant="destructive" onClick={() => handleDelete(jobType.id)}>Xoá</Button>
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
