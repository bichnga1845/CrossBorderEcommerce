"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Lock,
  Unlock,
  Edit3
} from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Fetch users error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
      }
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái!");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý Khách hàng</h1>
          <p className="text-sm text-slate-500">Xem và quản lý thông tin, quyền hạn của người dùng.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Filter size={16} /> Bộ lọc
          </button>
          <button className="px-4 py-2 bg-forest-900 text-white rounded-xl text-sm font-semibold hover:bg-forest-800 transition-all">Thêm người dùng</button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm theo tên hoặc email..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-forest-900/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Tổng cộng: <span className="text-slate-900">{users.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
              <tr>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Liên lạc</th>
                <th className="px-6 py-4">Địa chỉ</th>
                <th className="px-6 py-4">Hạng / Điểm</th>
                <th className="px-6 py-4">Ngày gia nhập</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold overflow-hidden">
                        {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5"><Phone size={10} className="text-slate-400" /> {user.phone || 'N/A'}</p>
                      <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5"><Mail size={10} className="text-slate-400" /> {user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-600 max-w-[200px] leading-relaxed truncate" title={user.address}>
                      {user.address ? `${user.address}, ${user.ward || ''}, ${user.district || ''}, ${user.city || ''}` : 'Chưa cập nhật'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${user.membershipTier === 'platinum' ? 'text-indigo-600' : user.membershipTier === 'gold' ? 'text-amber-600' : 'text-slate-600'}`}>
                        {user.membershipTier || 'silver'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{user.rewardPoints || 0} pts</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '15/05/2026'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.status === 'active' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => toggleStatus(user._id, user.status)}
                        className={`p-2 hover:bg-slate-100 rounded-lg transition-all ${user.status === 'active' ? 'text-slate-400 hover:text-red-600' : 'text-red-600 hover:text-emerald-600'}`}
                      >
                        {user.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 text-sm italic">Chưa có người dùng nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          <button className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all disabled:opacity-50" disabled>Trước</button>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-forest-900 text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-50 text-slate-400 text-xs font-bold">2</button>
          </div>
          <button className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all">Tiếp</button>
        </div>
      </div>
    </div>
  );
}
