'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Review } from '@/types/review';
import { createReview, updateReview } from '@/application/service/reviewService';

interface Props {
  review: Review | null;
  onClose: () => void;
}

export default function ReviewFormModal({ review, onClose }: Props) {
  const [userId, setUserId] = useState('');
  const [jobId, setJobId] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (review) {
      setUserId(review.user?.id || '');
      setJobId(review.job?.id || '');
      setRating(review.rating);
      setContent(review.content);
    } else {
      setUserId('');
      setJobId('');
      setRating(5);
      setContent('');
    }
  }, [review]);

  const handleSubmit = async () => {
    const data = {
      userId,
      jobId,
      rating,
      content,
    };

    if (review?.id) {
      await updateReview(review.id, data);
    } else {
      await createReview(data);
    }

    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{review ? 'Sửa đánh giá' : 'Thêm đánh giá'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <Input placeholder="Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)} />
          <Input
            type="number"
            placeholder="Số sao (1-5)"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min={1}
            max={5}
          />
          <Input placeholder="Nội dung" value={content} onChange={(e) => setContent(e.target.value)} />

          <Button onClick={handleSubmit}>
            {review ? 'Cập nhật' : 'Thêm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
