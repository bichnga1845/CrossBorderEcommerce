"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  XCircle,
  FileText
} from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/stats?range=all"); // Reusing stats API but could have dedicated one
        const data = await res.json();
        if (data.success) {
          setOrders(data.recentOrders); // In a real app, this would be a full paginated list
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Danh sách Đơn hàng</h1>
          <p className="text-sm text-slate-500">Quản lý và xử lý đơn hàng từ tất cả khách hàng.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
          <FileText size={16} /> Xuất báo cáo CSV
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm theo mã đơn hoặc tên khách..." 
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-forest-900/5 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'processing', 'delivered'].map((st) => (
              <button key={st} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${st === 'all' ? 'bg-forest-900 text-white' : 'bg-white border border-slate-200 text-slate-400 hover:text-forest-900'}`}>
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
              <tr>
                <th className="px-6 py-4">Mã đơn hàng</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Tổng tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900">#{order._id.toString().slice(-8).toUpperCase()}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900">{order.customer.firstName} {order.customer.lastName}</p>
                    <p className="text-xs text-slate-400">{order.customer.email}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-600">{order.items.length} món</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-900">
                    {order.totalAmount.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'delivered' ? 'text-emerald-600 bg-emerald-50' : 
                      order.status === 'pending' ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-forest-900 transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
