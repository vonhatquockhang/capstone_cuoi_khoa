// src/presentation/pages/admin/services/ServiceListPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Pagination from '@/components/common/Pagination';
import { getServiceList, deleteService } from '@/application/service/serviceService';
import { Service } from '@/types/service';
import ServiceFormModal from './ServiceFormModal';

export default function ServiceListPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, [currentPage, searchTerm]);

  const fetchServices = async () => {
    const data = await getServiceList(currentPage, searchTerm);
    setServices(data);
  };

  const handleDelete = async (id: number) => {
    await deleteService(id);
    fetchServices();
  };

  const openModal = (service?: Service) => {
    setSelectedService(service || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quản lý dịch vụ</h2>
        <Button onClick={() => openModal()}>+ Thêm dịch vụ</Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Tìm kiếm dịch vụ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.id}</TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>
                <img src={service.image} alt="service" className="w-16 h-16 object-cover rounded" />
              </TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>
                <Button onClick={() => openModal(service)}>Sửa</Button>
                <Button variant="destructive" onClick={() => handleDelete(service.id)}>Xoá</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />

      {isModalOpen && (
        <ServiceFormModal
          service={selectedService}
          onClose={() => {
            setIsModalOpen(false);
            fetchServices();
          }}
        />
      )}
    </div>
  );
}
