// src/presentation/pages/admin/services/ServiceFormModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createService, updateService } from '@/application/service/serviceService';
import { Service } from '@/types/service';

interface Props {
  service: Service | null;
  onClose: () => void;
}

export default function ServiceFormModal({ service, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        image: service.image,
        description: service.description
      });
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (service) {
      await updateService(service.id, formData);
    } else {
      await createService(formData);
    }
    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose}>
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {service ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}
        </h3>
        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Tên dịch vụ"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="image"
            placeholder="URL hình ảnh"
            value={formData.image}
            onChange={handleChange}
          />
          <Input
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Huỷ</Button>
            <Button onClick={handleSubmit}>
              {service ? 'Lưu' : 'Thêm'}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
