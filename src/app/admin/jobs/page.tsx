'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Job {
  id: number;
  name: string;
  creator: {
    email: string;
  };
  createdAt: string;
}

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // 👈 thêm state tìm kiếm

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fakeData: Job[] = [
          {
            id: 1,
            name: 'Thiết kế website',
            creator: { email: 'admin1@gmail.com' },
            createdAt: '2025-07-29',
          },
          {
            id: 2,
            name: 'Lập trình ứng dụng mobile',
            creator: { email: 'admin2@gmail.com' },
            createdAt: '2025-07-28',
          },
        ];
        setJobs(fakeData);
        // Thực tế: const res = await axios.get('/api/jobs'); setJobs(res.data);
      } catch (err) {
        console.error('Lỗi khi tải jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 👇 lọc công việc theo từ khóa tìm kiếm
  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý Công việc</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Tìm kiếm công việc..."
          className="border border-gray-300 rounded px-3 py-2 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          + Thêm công việc
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên Công việc</th>
              <th className="p-2 border">Người đăng</th>
              <th className="p-2 border">Ngày tạo</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id}>
                <td className="p-2 border">{job.id}</td>
                <td className="p-2 border">{job.name}</td>
                <td className="p-2 border">{job.creator.email}</td>
                <td className="p-2 border">{job.createdAt}</td>
                <td className="p-2 border">
                  <button className="text-blue-600 mr-2">Sửa</button>
                  <button className="text-red-600">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
