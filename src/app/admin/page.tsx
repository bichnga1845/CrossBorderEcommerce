"use client";

import { Users, QrCode, ShoppingBag, TrendingUp, RefreshCcw, Bell } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "24.5M ₫", icon: TrendingUp, trend: "+12%" },
    { label: "QR Verifications", value: "1,245", icon: QrCode, trend: "+34%" },
    { label: "Active Members", value: "856", icon: Users, trend: "+5%" },
    { label: "Refill Conversions", value: "32%", icon: RefreshCcw, trend: "+2%" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif text-forest-900 mb-1">Trust Platform Analytics</h1>
          <p className="text-sm text-gray-500">Welcome back to the HTA Control Center</p>
        </div>
        <button className="bg-white border border-gray-200 p-2 rounded-full text-gray-600 hover:text-forest-900 transition relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-forest-50 rounded-xl">
                <stat.icon className="text-forest-900" size={24} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-forest-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Map / Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
          <h3 className="font-serif text-lg text-forest-900 mb-6">QR Scan Locations & Frequency</h3>
          <div className="flex-1 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            [ Map / Chart Visualization Here ]
          </div>
        </div>

        {/* Recent Approvals */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-serif text-lg text-forest-900 mb-6">Pending Approvals</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-forest-900/20 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <QrCode className="text-yellow-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-forest-900">Batch B-0{i}X</p>
                    <p className="text-xs text-gray-500">Requires Staff Review</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary Icon Component to avoid import errors from missing lucide-react icons in scope
function ChevronRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
