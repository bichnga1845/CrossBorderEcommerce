"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Ticket, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Copy,
  TrendingUp
} from "lucide-react";

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch("/api/admin/promotions");
        const data = await res.json();
        if (data.success) {
          setPromotions(data.promotions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mã khuyến mãi</h1>
          <p className="text-sm text-slate-500">Quản lý các chương trình ưu đãi và mã giảm giá.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/10">
          <Plus size={18} /> Tạo mã mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Promotion Form / Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2rem] text-white shadow-2xl">
            <Ticket size={48} className="mb-6 opacity-40" />
            <h3 className="text-2xl font-serif mb-2">Chiến dịch Marketing</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
              Sử dụng mã giảm giá để kích thích mua sắm vào các dịp lễ hoặc tri ân khách hàng thân thiết.
            </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-indigo-100">Hiệu quả trung bình</span>
                <span className="text-xs font-bold text-emerald-300">+24%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-300 h-full w-[75%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Promotions List */}
        <div className="lg:col-span-2 space-y-4">
          {promotions.length > 0 ? promotions.map((promo, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-600/20 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${promo.isActive ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Ticket size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-lg font-bold text-slate-900 tracking-tight">{promo.code}</h4>
                    <button className="p-1 hover:bg-slate-50 rounded text-slate-300 hover:text-slate-600 transition-all">
                      <Copy size={12} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{promo.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Giảm giá</p>
                  <p className="text-sm font-bold text-slate-900">
                    {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `${promo.discountValue.toLocaleString()} ₫`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trạng thái</p>
                  <span className={`flex items-center gap-1 text-xs font-bold ${promo.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {promo.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {promo.isActive ? 'Đang chạy' : 'Đã dừng'}
                  </span>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
              <Ticket size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Chưa có mã khuyến mãi</h3>
              <p className="text-sm text-slate-500">Bắt đầu chiến dịch marketing bằng cách tạo mã mới.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
