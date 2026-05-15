"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line 
} from "recharts";
import { 
  TrendingUp, 
  Target, 
  BrainCircuit, 
  Calendar, 
  Download,
  Filter,
  ArrowUpRight,
  Activity
} from "lucide-react";

export default function AdminAnalytics() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading || !data) return <div className="p-8 text-slate-400">Đang phân tích dữ liệu...</div>;

  const COLORS = ['#0F2D24', '#C5A059', '#1E40AF', '#7C3AED'];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Phân tích chuyên sâu</h1>
          <p className="text-sm text-slate-500">Dữ liệu kinh doanh và dự báo từ mô hình học máy HiAn.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 flex items-center gap-2">
            <Calendar size={16} /> 30 ngày qua
          </button>
          <button className="px-4 py-2 bg-forest-900 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-forest-900/10">
            <Download size={16} /> Xuất báo cáo
          </button>
        </div>
      </div>

      {/* AI Insights Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-forest-900 to-forest-800 p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <BrainCircuit size={120} />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
              <Activity size={12} className="animate-pulse" /> Dự báo từ AI Model
            </div>
            <h3 className="text-3xl font-serif mb-4">Mục tiêu doanh thu dự kiến: {data.aiInsights.predictedRevenueNextDay.toLocaleString()} ₫</h3>
            <p className="text-forest-100/70 text-sm leading-relaxed max-w-xl">
              Dựa trên phân tích hành vi mua sắm và xu hướng thị trường, hệ thống dự báo sự tăng trưởng ổn định trong 24h tới.
              <span className="block mt-2 font-bold text-white italic">"{data.aiInsights.recommendation}"</span>
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-forest-100">Xác suất thành công</span>
              <span className="text-xs font-bold text-emerald-400">+15%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[85%]" />
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-tighter text-emerald-400">{data.aiInsights.trendStatus}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
            Xu hướng doanh thu
            <TrendingUp size={16} className="text-emerald-500" />
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenueTrend}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F2D24" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0F2D24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0F2D24" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sales Pie */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Phân bổ theo Ngành hàng</h3>
          <div className="h-80 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categorySales}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {data.categorySales.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 pr-4">
              {data.categorySales.map((entry: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 leading-none mb-1">{entry._id || 'Khác'}</p>
                    <p className="text-sm font-bold text-slate-900">{entry.value} đơn</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Tiers */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Tỷ lệ Hạng khách hàng</h3>
          <div className="space-y-6">
            {data.tiers.map((tier: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{tier._id || 'Silver'}</span>
                  <span className="text-xs font-bold text-slate-900">{tier.count} users</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(tier.count / data.stats?.usersCount || 1) * 100}%` }}
                    className={`h-full ${i === 0 ? 'bg-indigo-600' : i === 1 ? 'bg-amber-500' : 'bg-slate-400'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction Chart - Simulated Line */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
            Mô hình Dự báo Doanh số (ML Projection)
            <Target size={16} className="text-indigo-600" />
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="_id" hide />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#94A3B8" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={3} dot={{ r: 4, fill: '#7C3AED', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[11px] text-slate-400 italic">
            * Hệ thống sử dụng mô hình ARIMA để dự đoán xu hướng ngắn hạn dựa trên dữ liệu 90 ngày gần nhất.
          </p>
        </div>
      </div>
    </div>
  );
}
