'use client';

import { useEffect, useState } from 'react';
import { UserAPI } from '@/infrastructure/api/user.api';
import { User } from '@/domain/models/user.model';
import { Button } from '@/components/ui/button';

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'USER',
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await UserAPI.getAllUsers(page, keyword);
      setUsers(response.data.content || []);
    } catch (error) {
      console.error('Lỗi lấy danh sách user', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, keyword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      role: user.role ?? 'USER',
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', phone: '', role: 'USER' });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await UserAPI.updateUser(editingUser.id, form);
      } else {
        await UserAPI.createUser(form);
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi lưu user', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xoá user này?')) return;
    try {
      await UserAPI.deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi xoá user', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Quản lý người dùng</h1>

      {/* Search + Add */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        <Button onClick={openCreateModal}>Thêm người dùng</Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">SĐT</th>
              <th className="border px-4 py-2">Vai trò</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Button variant="outline" onClick={() => openEditModal(user)}>
                    Sửa
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(user.id)}>
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Không tìm thấy người dùng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Trang trước</Button>
        <span>Trang {page}</span>
        <Button onClick={() => setPage((prev) => prev + 1)}>Trang sau</Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">
              {editingUser ? 'Sửa người dùng' : 'Thêm người dùng'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Họ tên"
                value={form.name}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <div className="flex justify-end space-x-2">
                <Button type="submit">{editingUser ? 'Cập nhật' : 'Tạo'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Hủy
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
