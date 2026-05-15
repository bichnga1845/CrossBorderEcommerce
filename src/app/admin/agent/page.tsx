"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Clock, 
  Users, 
  BarChart,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminAIAgent() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      if (data.success) {
        setStats(data.aiInsights);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useState(() => {
    fetchStats();
  }, []);

  const runAgent = async () => {
    setIsProcessing(true);
    setStatus({ message: "Đang phân tích hành vi khách hàng...", type: "info" });
    
    try {
      const res = await fetch("/api/admin/agent/emails", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setStatus({ message: `Đã xử lý thành công!`, type: "success" });
        fetchStats();
      }
    } catch (err) {
      setStatus({ message: "Lỗi khi khởi chạy Agent.", type: "error" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Marketing Agent</h1>
          <p className="text-sm text-slate-500">Hệ thống tự động hóa nội dung và tối ưu hóa chuyển đổi từ HiAn AI.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100">
          <Zap size={14} className="fill-current" /> Hệ thống đang sẵn sàng
        </div>
      </div>

      {/* Hero Control Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-slate-900 to-indigo-950 p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Sparkles size={240} />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-6 leading-tight">Khởi chạy quy trình <span className="text-indigo-400 italic">Tối ưu hóa Email</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              AI Agent sẽ tự động phân tích lịch sử mua hàng, hạng thành viên và sở thích của từng khách hàng để tạo ra nội dung email cá nhân hóa với tỷ lệ chuyển đổi cao nhất.
            </p>
            <button 
              onClick={runAgent}
              disabled={isProcessing}
              className={`px-10 py-5 rounded-3xl font-bold text-lg flex items-center gap-3 transition-all ${
                isProcessing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-900 hover:scale-105 shadow-xl shadow-white/5'
              }`}
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              ) : <Sparkles size={24} className="text-indigo-600" />}
              {isProcessing ? 'Đang xử lý...' : 'Kích hoạt AI Agent'}
            </button>
          </div>

          <div className="space-y-4">
             <div className="p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Đang chờ xử lý</span>
                  <Clock size={16} className="text-indigo-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Newsletter mới</span>
                    <span className="font-bold">{stats?.pendingNewsletter || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Tài khoản mới (đợi 1p)</span>
                    <span className="font-bold">{stats?.pendingWelcome || 0}</span>
                  </div>
                </div>
             </div>
             <div className="p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Tỷ lệ chuyển đổi dự kiến</span>
                  <BarChart size={16} className="text-emerald-400" />
                </div>
                <h4 className="text-2xl font-bold">+18.5% <span className="text-xs font-normal text-slate-500 ml-2">Conversion Lift</span></h4>
             </div>
          </div>
        </div>

        {status && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-4 rounded-2xl flex items-center gap-3 border ${
              status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
              status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
            }`}
          >
            {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-bold">{status.message}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Personalization', desc: 'AI tạo ra tiêu đề và nội dung dành riêng cho từng khách hàng.', icon: Users },
          { title: 'Smart Timing', desc: 'Gửi email vào khung giờ khách hàng có khả năng mở cao nhất.', icon: Clock },
          { title: 'Safe Delivery', desc: 'Đảm bảo email không rơi vào thư rác với cấu hình SPF/DKIM.', icon: ShieldCheck },
        ].map((feat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-6 border border-slate-100">
              <feat.icon size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
