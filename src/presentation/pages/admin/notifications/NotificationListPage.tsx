// /components/admin/notifications/NotificationListPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { getAllNotifications } from '@/application/service/notificationService';
import { Notification } from '@/types/notification';

export default function NotificationListPage() {
  const [data, setData] = useState<Notification[]>([]);

  useEffect(() => {
    getAllNotifications().then(setData);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Content</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.content}</td>
              <td className="px-4 py-2">{new Date(item.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
