'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Pagination from '@/components/common/Pagination';
import JobFormModal from './JobFormModal';
import { getJobList,  deleteJob } from '@/application/service/JobService';
import { Job } from '@/types/job';

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [currentPage, searchTerm]);

  const fetchJobs = async () => {
    const res = await getJobList(currentPage, searchTerm);
    setJobs(res);
  };

  const handleDelete = async (id: string) => {
    await deleteJob(id);
    fetchJobs();
  };

  const openModal = (job?: Job) => {
    setSelectedJob(job || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý công việc</h1>
        <Button onClick={() => openModal()}>+ Thêm công việc</Button>
      </div>

      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Tìm kiếm công việc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.description}</TableCell>
              <TableCell>{job.price}₫</TableCell>
              <TableCell>
                <Button onClick={() => openModal(job)}>Sửa</Button>
                <Button variant="destructive" onClick={() => handleDelete(job.id)}>Xoá</Button>
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
        <JobFormModal
          job={selectedJob}
          onClose={() => {
            setIsModalOpen(false);
            fetchJobs();
          }}
        />
      )}
    </div>
  );
}
