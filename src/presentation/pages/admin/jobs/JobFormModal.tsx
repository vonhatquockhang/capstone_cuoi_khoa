'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { createJob, updateJob } from '@/application/service/JobService';

interface Props {
  job: Job | null;
  onClose: () => void;
}

export default function JobFormModal({ job, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setPrice(job.price.toString());
    }
  }, [job]);

  const handleSubmit = async () => {
    const jobData = {
      title,
      description,
      price: Number(price),
    };

    if (job) {
      await updateJob(job.id, jobData);
    } else {
      await createJob(jobData);
    }

    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{job ? 'Cập nhật công việc' : 'Thêm công việc'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="Tên công việc" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input placeholder="Giá" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>Huỷ</Button>
            <Button onClick={handleSubmit}>Lưu</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
