"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Activity, 
  User, 
  Database, 
  ShieldCheck, 
  AlertTriangle,
  Search,
  Filter
} from "lucide-react";

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/admin/logs");
        const data = await res.json();
        if (data.success) {
          setLogs(data.logs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nhật ký Hệ thống</h1>
          <p className="text-sm text-slate-500">Theo dõi toàn bộ lịch sử thao tác và sự kiện trên hệ thống quản trị.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
          <Database size={16} /> Dọn dẹp nhật ký
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm theo hành động hoặc người dùng..." 
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-forest-900/5 transition-all"
            />
          </div>
          <div className="flex gap-2">
             <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {logs.map((log, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 flex items-start gap-6 hover:bg-slate-50/50 transition-all group"
            >
              <div className={`p-3 rounded-2xl ${
                log.action === 'CREATE' ? 'bg-indigo-50 text-indigo-600' :
                log.action === 'UPDATE' ? 'bg-emerald-50 text-emerald-600' :
                log.action === 'DELETE' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {log.action === 'CREATE' ? <Plus size={20} /> : <Activity size={20} />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-forest-900 transition-colors">
                    {log.details || `${log.action} trên ${log.resource}`}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} /> {new Date(log.createdAt).toLocaleString('vi-VN')}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                      {log.userId?.name?.charAt(0) || 'S'}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{log.userId?.name || 'Hệ thống'}</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-xs text-slate-400">Resource ID: <span className="font-mono text-[10px]">{log.resourceId?.toString().slice(-12)}</span></span>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 hover:bg-white rounded-lg shadow-sm text-slate-400 hover:text-forest-900">
                  <ShieldCheck size={18} />
                 </button>
              </div>
            </motion.div>
          ))}
          {logs.length === 0 && (
            <div className="p-20 text-center opacity-30">
              <Clock size={48} className="mx-auto mb-4" />
              <p className="font-bold uppercase tracking-widest text-sm">Chưa có dữ liệu nhật ký</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
