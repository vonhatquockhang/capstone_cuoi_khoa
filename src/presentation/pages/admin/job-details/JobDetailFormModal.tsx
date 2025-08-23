'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { JobDetail } from '@/types/jobDetail';
import { createJobDetail, updateJobDetail } from '@/application/service/JobDetailService';
import { getJobList } from '@/application/service/JobService';

interface Props {
  jobDetail: JobDetail | null;
  onClose: () => void;
}

export default function JobDetailFormModal({ jobDetail, onClose }: Props) {
  const [image, setImage] = useState('');
  const [jobId, setJobId] = useState('');
  const [jobOptions, setJobOptions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (jobDetail) {
      setImage(jobDetail.image || '');
      setJobId(jobDetail.job?.id || '');
    }
  }, [jobDetail]);

  useEffect(() => {
    getJobList(1, '').then((res) => {
      setJobOptions(res);
    });
  }, []);

  const handleSubmit = async () => {
    const payload = { image, jobId };

    if (jobDetail) {
      await updateJobDetail(jobDetail.id, payload);
    } else {
      await createJobDetail(payload);
    }

    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{jobDetail ? 'Cập nhật' : 'Thêm'} chi tiết công việc</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <label className="block">
            Hình ảnh:
            <Input value={image} onChange={(e) => setImage(e.target.value)} />
          </label>

          <label className="block">
            Công việc:
            <select
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">-- Chọn công việc --</option>
              {jobOptions.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Huỷ
            </Button>
            <Button onClick={handleSubmit}>
              {jobDetail ? 'Cập nhật' : 'Thêm'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
