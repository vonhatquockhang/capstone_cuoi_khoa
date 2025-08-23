// components/admin/usersByRole/UsersByRoleListPage.tsx
"use client";

import { useEffect, useState } from "react";
import { getUsersByRole } from "@/application/service/usersByRole";
import { UsersByRole } from "@/types/usersByRole";

export default function UsersByRoleListPage() {
  const [users, setUsers] = useState<UsersByRole[]>([]);

  useEffect(() => {
    getUsersByRole().then(setUsers);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Users by Role</h2>
      <div className="overflow-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="p-4 text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
}
