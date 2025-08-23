'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { JobByHirer } from '@/types/jobByHirer';

interface JobByHirerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: JobByHirer) => void;
  initialData?: JobByHirer | null;
}

export default function JobByHirerFormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: JobByHirerFormDialogProps) {
  const [jobId, setJobId] = useState('');
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (initialData) {
      setJobId(initialData.jobId);
      setUserId(initialData.userId);
    } else {
      setJobId('');
      setUserId(0);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ id: initialData?.id ?? Date.now(), jobId, userId });
    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Chỉnh sửa' : 'Thêm'} Job By Hirer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            placeholder="Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          />
          <Input
            placeholder="User ID"
            type="number"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
