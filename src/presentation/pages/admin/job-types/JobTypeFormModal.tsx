'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { JobType } from '@/types/jobType';
import { createJobType, updateJobType } from '@/application/service/jobTypeService';

interface Props {
  jobType: JobType | null;
  onClose: () => void;
}

export default function JobTypeFormModal({ jobType, onClose }: Props) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (jobType) {
      setName(jobType.name);
    } else {
      setName('');
    }
  }, [jobType]);

  const handleSubmit = async () => {
    if (jobType) {
      await updateJobType(jobType.id, { name });
    } else {
      await createJobType({ name });
    }
    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{jobType ? 'Sửa loại công việc' : 'Thêm loại công việc'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Tên loại công việc"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleSubmit}>
            {jobType ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
