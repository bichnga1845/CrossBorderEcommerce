"use client";

import { motion } from "framer-motion";
import { Droplets, ShieldCheck, Sparkles, ArrowLeft, Activity, Leaf, Brain } from "lucide-react";
import Link from "next/link";

export default function Wellness() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-20 overflow-hidden" suppressHydrationWarning={true}>
      <div className="max-w-5xl mx-auto px-4">
        <header className="mb-16">
          <Link href="/account/dashboard" className="inline-flex items-center gap-2 text-forest-900/40 text-xs font-bold uppercase tracking-widest hover:text-forest-900 transition-colors mb-6">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <h1 className="font-cormorant text-5xl text-forest-900 font-bold">HiAn Wellness AI</h1>
          </div>
          <p className="text-forest-900/50 text-sm italic max-w-2xl">
            Cá nhân hóa lộ trình sức khỏe của bạn thông qua phân tích dữ liệu tiêu dùng và tinh hoa từ thiên nhiên Tây Nguyên.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           {[
             { title: "Thể trạng hiện tại", value: "Tốt", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
             { title: "Năng lượng xanh", value: "85%", icon: Leaf, color: "text-forest-900", bg: "bg-forest-50" },
             { title: "Chỉ số tập trung", value: "Trung bình", icon: Brain, color: "text-indigo-600", bg: "bg-indigo-50" },
           ].map((stat, idx) => (
             <motion.div 
               key={idx}
               whileHover={{ y: -5 }}
               className="bg-white p-8 rounded-[2.5rem] border border-forest-900/5 shadow-sm"
             >
               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                 <stat.icon size={24} />
               </div>
               <p className="text-[10px] uppercase tracking-widest font-bold text-forest-900/30 mb-1">{stat.title}</p>
               <h3 className="text-2xl font-bold text-forest-900">{stat.value}</h3>
             </motion.div>
           ))}
        </div>

        <div className="bg-forest-900 text-ivory-100 rounded-[3rem] p-12 relative overflow-hidden mb-12 group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10">
            <h2 className="font-serif text-3xl mb-6">Phân tích liệu trình tuần tới</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <ShieldCheck className="text-champagne-dark shrink-0" size={24} />
                <p className="text-sm leading-relaxed text-white/80">
                  Dựa trên thói quen sử dụng <b>Hạt Mắc Ca VIP</b> của bạn, AI gợi ý tăng cường uống thêm <b>Mật Ong Rừng</b> vào buổi sáng để tối ưu hệ miễn dịch.
                </p>
              </div>
              <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <Droplets className="text-blue-400 shrink-0" size={24} />
                <p className="text-sm leading-relaxed text-white/80">
                  Cơ thể bạn cần thêm các chất chống oxy hóa. Hãy thử kết hợp <b>Trái Cây Sấy Thăng Hoa</b> vào bữa xế để duy trì năng lượng.
                </p>
              </div>
            </div>
            <button className="mt-10 px-10 py-5 bg-champagne-dark text-forest-900 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-2xl shadow-black/20">
              Đặt lịch tư vấn chuyên gia
            </button>
          </div>
        </div>

        <div className="text-center py-10">
          <p className="text-xs text-forest-900/30 italic">Hệ thống AI Wellness đang liên tục cập nhật dựa trên hành vi mua sắm thực tế của bạn.</p>
        </div>
      </div>
    </div>
  );
}
