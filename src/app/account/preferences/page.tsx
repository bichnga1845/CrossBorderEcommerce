"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Bell, Smartphone, Mail, ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Preferences() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    promotions: true
  });

  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-20" suppressHydrationWarning={true}>
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-12">
          <Link href="/account/dashboard" className="inline-flex items-center gap-2 text-forest-900/40 text-xs font-bold uppercase tracking-widest hover:text-forest-900 transition-colors mb-6">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <h1 className="font-cormorant text-5xl text-forest-900 font-bold mb-4">Bảo Mật & Ưu Tiên</h1>
          <p className="text-forest-900/50 text-sm italic">Quản lý cách chúng tôi bảo vệ và tương tác với không gian riêng của bạn.</p>
        </header>

        <div className="space-y-8">
          {/* Notification Settings */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-forest-900/5 shadow-sm">
            <h3 className="text-xl font-serif text-forest-900 mb-8 flex items-center gap-3">
              <Bell size={20} className="text-forest-900/20" /> Cài đặt thông báo
            </h3>
            <div className="space-y-6">
              {[
                { id: 'email', label: 'Thông báo qua Email', sub: 'Nhận cập nhật về đơn hàng và tin tức qua email', icon: Mail },
                { id: 'sms', label: 'Thông báo qua SMS', sub: 'Thông báo nhanh chóng qua tin nhắn điện thoại', icon: Smartphone },
                { id: 'promotions', label: 'Ưu đãi & Khuyến mãi', sub: 'Nhận các mã giảm giá đặc quyền từ AI Agent', icon: ShieldCheck },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-ivory-50 last:border-0">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-ivory-50 rounded-xl flex items-center justify-center text-forest-900/40">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-forest-900">{item.label}</p>
                      <p className="text-xs text-forest-900/40">{item.sub}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNotifications(prev => ({...prev, [item.id]: !prev[item.id as keyof typeof prev]}))}
                    className={`w-12 h-6 rounded-full transition-all relative ${notifications[item.id as keyof typeof prev] ? 'bg-forest-900' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications[item.id as keyof typeof prev] ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Security Settings */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-forest-900/5 shadow-sm">
            <h3 className="text-xl font-serif text-forest-900 mb-8 flex items-center gap-3">
              <Lock size={20} className="text-forest-900/20" /> Bảo mật tài khoản
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-ivory-50/50 rounded-3xl border border-forest-900/5">
                <p className="text-xs font-bold text-forest-900/40 uppercase tracking-widest mb-4">Thay đổi mật khẩu</p>
                <div className="space-y-4">
                   <div className="relative">
                      <input type="password" placeholder="Mật khẩu hiện tại" className="w-full bg-white border border-forest-900/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-forest-900/10 transition-all" />
                   </div>
                   <div className="relative">
                      <input type="password" placeholder="Mật khẩu mới" className="w-full bg-white border border-forest-900/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-forest-900/10 transition-all" />
                   </div>
                   <button className="w-full py-4 bg-forest-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-forest-800 transition-all">
                     Cập nhật bảo mật
                   </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
