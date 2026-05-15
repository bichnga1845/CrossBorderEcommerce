"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  ShoppingCart, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  X,
  Activity,
  FileText,
  Calendar,
  ChevronDown
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    ordersCount: 0,
    usersCount: 0,
    productsCount: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [dateRange, setDateRange] = useState("all"); // today, week, month, all
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/stats?range=${dateRange}`);
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
      }
      
      const logRes = await fetch("/api/admin/logs");
      const logData = await logRes.json();
      if (logData.success) {
        setLogs(logData.logs);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [dateRange]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setRecentOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
        alert("Cập nhật trạng thái thành công!");
      }
    } catch (err) {
      alert("Lỗi khi cập nhật!");
    } finally {
      setIsUpdating(false);
    }
  };

  const exportReport = () => {
    window.open("/api/admin/reports/export", "_blank");
  };

  const cards = [
    { label: "Tổng doanh thu", value: `${stats.totalRevenue.toLocaleString()} ₫`, change: "+12.5%", trend: "up", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Đơn hàng", value: stats.ordersCount, change: "Tất cả", trend: "up", icon: ShoppingCart, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Khách hàng", value: stats.usersCount, change: "Đã đăng ký", trend: "up", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Sản phẩm", value: stats.productsCount, change: "Đang kinh doanh", trend: "up", icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
  ];



  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tổng quan hệ thống</h1>
          <p className="text-sm text-slate-500">Chào mừng trở lại, đây là những gì đang diễn ra hôm nay.</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-forest-900/5 transition-all"
          >
            <option value="all">Tất cả thời gian</option>
            <option value="today">Hôm nay</option>
            <option value="week">7 ngày qua</option>
            <option value="month">30 ngày qua</option>
          </select>
          <button 
            onClick={exportReport}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <FileText size={16} /> Xuất báo cáo
          </button>
          <button className="px-4 py-2 bg-forest-900 text-white rounded-xl text-sm font-semibold hover:bg-forest-800 transition-all">Tạo sản phẩm mới</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                <card.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${card.trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {card.change}
                {card.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Growth Chart Simulation */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Phân tích tăng trưởng</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Dữ liệu doanh thu & Đơn hàng</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-forest-900" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Doanh thu</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Đơn hàng</span>
            </div>
          </div>
        </div>
        
        <div className="h-48 w-full flex items-end gap-3 px-2">
          {[40, 70, 45, 90, 65, 80, 100, 50, 75, 85, 60, 95].map((height, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.05, duration: 1 }}
              className="flex-1 bg-gradient-to-t from-forest-900/10 to-forest-900 rounded-t-lg relative group/bar"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                {height * 10}tr
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-6 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <span>Tháng 1</span>
           <span>Tháng 6</span>
           <span>Tháng 12</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Đơn hàng gần đây</h3>
            <button className="text-xs font-bold text-forest-900 uppercase tracking-widest">Xem tất cả</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                <tr>
                  <th className="px-6 py-4">Mã đơn</th>
                  <th className="px-6 py-4">Khách hàng</th>
                  <th className="px-6 py-4">Thời gian</th>
                  <th className="px-6 py-4">Giá trị</th>
                  <th className="px-6 py-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order, idx) => (
                  <tr 
                    key={idx} 
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <td className="px-6 py-5 text-sm font-bold text-forest-900 group-hover:text-indigo-600 transition-colors">
                      #{order._id.toString().slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 font-medium">{order.customer?.firstName} {order.customer?.lastName}</td>
                    <td className="px-6 py-5 text-sm text-slate-400 font-medium">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-900">{order.totalAmount.toLocaleString()} ₫</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'delivered' ? 'text-emerald-600 bg-emerald-50' : 
                        order.status === 'pending' ? 'text-amber-600 bg-amber-100/50' : 
                        order.status === 'cancelled' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400 text-sm italic">
                      <div className="flex flex-col items-center gap-2 opacity-40">
                        <ShoppingCart size={48} />
                        Chưa có đơn hàng nào trong khoảng thời gian này
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Logs Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Hoạt động hệ thống</h3>
            <Clock size={16} className="text-slate-400" />
          </div>
          <div className="p-6 space-y-6">
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`p-2 h-fit rounded-lg ${
                  log.action === 'CREATE' ? 'text-indigo-600 bg-indigo-50' : 
                  log.action === 'UPDATE' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-50'
                } shrink-0`}>
                  {log.resource === 'Order' ? <ShoppingCart size={16} /> : <Activity size={16} />}
                </div>
                <div>
                  <p className="text-sm text-slate-700 leading-tight mb-1">{log.details || `${log.action} ${log.resource}`}</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                    {new Date(log.createdAt).toLocaleTimeString('vi-VN')} - {log.userId?.name || 'Hệ thống'}
                  </p>
                </div>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-center py-10 opacity-30">
                <Clock className="mx-auto mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">Chưa có hoạt động</p>
              </div>
            )}
          </div>
          <div className="p-6 border-t border-slate-100">
            <button className="w-full py-3 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">
              Xem toàn bộ nhật ký
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-slate-900">Chi tiết Đơn hàng</h2>
                    <span className="px-3 py-1 bg-forest-900/5 text-forest-900 text-xs font-bold rounded-lg uppercase tracking-widest">
                      #{selectedOrder._id.toString().slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Đặt ngày {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white rounded-xl shadow-sm text-slate-400 hover:text-slate-900 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                {/* Customer & Shipping */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Khách hàng</h4>
                    <p className="text-sm font-bold text-slate-900">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                    <p className="text-sm text-slate-500">{selectedOrder.customer.email}</p>
                    <p className="text-sm text-slate-500">{selectedOrder.customer.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Giao hàng</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedOrder.customer.address}, {selectedOrder.customer.ward}, {selectedOrder.customer.district}, {selectedOrder.customer.city}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Sản phẩm</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-400">Số lượng: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-slate-900">{(item.price * item.quantity).toLocaleString()} ₫</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="p-6 bg-forest-900 text-white rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">Tổng cộng (Đã bao gồm VAT)</p>
                    <h3 className="text-2xl font-serif">{selectedOrder.totalAmount.toLocaleString()} VNĐ</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">Phương thức</p>
                    <p className="text-sm font-bold uppercase">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">Cập nhật trạng thái</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['processing', 'shipped', 'delivered'].map((st) => (
                    <button 
                      key={st}
                      onClick={() => updateStatus(selectedOrder._id, st)}
                      disabled={selectedOrder.status === st || isUpdating}
                      className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        selectedOrder.status === st 
                        ? 'bg-forest-900 text-white' 
                        : 'bg-white border border-slate-200 text-slate-500 hover:border-forest-900 hover:text-forest-900'
                      } disabled:opacity-50`}
                    >
                      {st === 'processing' ? 'Đang xử lý' : st === 'shipped' ? 'Đang giao' : 'Hoàn thành'}
                    </button>
                  ))}
                  <button 
                    onClick={() => updateStatus(selectedOrder._id, 'cancelled')}
                    className="py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-100 transition-all"
                  >
                    Hủy đơn
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

