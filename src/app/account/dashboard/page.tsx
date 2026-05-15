"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, Package, Clock, ShieldCheck, ChevronRight, Droplets, Gift, Edit3, X, Save, MapPin, Phone, Mail, User as UserIcon, ArrowRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export default function CustomerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account/dashboard");
    } else if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
        setEditForm({
          name: data.user.name || "",
          phone: data.user.phone || "",
          address: data.user.address || "",
          city: data.user.city || "",
          district: data.user.district || "",
          ward: data.user.ward || ""
        });
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };



  if (!mounted || status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#fcfaf7] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-forest-900/10 border-t-forest-900 rounded-full animate-spin mb-4"></div>
        <p className="font-cormorant text-xl text-forest-900/60 italic">Đang chuẩn bị không gian riêng của bạn...</p>
      </div>
    );
  }

  const userTier = userData?.membershipTier || "silver";
  const userPoints = userData?.rewardPoints || 0;
  const nextTierPoints = userTier === "silver" ? 1000 : (userTier === "gold" ? 5000 : 10000);
  const nextTierName = userTier === "silver" ? "Gold" : (userTier === "gold" ? "Platinum" : "Elite");
  const progress = Math.min(100, (userPoints / nextTierPoints) * 100);

  const tierStyles = {
    silver: "from-slate-400 to-slate-600 shadow-slate-200",
    gold: "from-amber-400 via-amber-500 to-amber-700 shadow-amber-200",
    platinum: "from-zinc-600 via-zinc-800 to-black shadow-zinc-400",
    elite: "from-indigo-900 via-purple-900 to-black shadow-indigo-500"
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-champagne/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-forest-900/5 rounded-full blur-[150px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs uppercase tracking-[0.3em] text-forest-900/40 font-bold mb-3"
            >
              Hệ thống khách hàng thân thiết HiAn
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-cormorant text-5xl lg:text-6xl text-forest-900 font-bold leading-tight"
            >
              Chào mừng, <span className="text-forest-800 italic">{userData?.name?.split(' ').pop()}</span>
            </motion.h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-forest-900/5 shadow-sm flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-forest-900 text-ivory-100 rounded-full flex items-center justify-center font-bold">
                {userData?.purchaseStreaks || 0}
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-forest-900/40 tracking-widest">Chuỗi mua hàng</p>
                <p className="text-sm font-bold text-forest-900">Liên tục {userData?.purchaseStreaks || 0} lần</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                clearCart();
                signOut({ callbackUrl: '/' });
              }}
              className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl border border-red-100 shadow-sm flex items-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <LogOut size={18} />
              Đăng xuất
            </motion.button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (4/12): User Profile & Tier */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Membership Card Luxury */}
            <motion.div 
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl transition-all duration-500 bg-gradient-to-br ${tierStyles[userTier as keyof typeof tierStyles]}`}
            >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 mb-1">Thành viên</p>
                    <h3 className="font-serif text-3xl font-bold tracking-tight capitalize">{userTier}</h3>
                  </div>
                  <Award size={40} className="text-white/20" />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{userPoints}</span>
                      <span className="text-xs font-medium text-white/60 uppercase tracking-widest">điểm</span>
                    </div>
                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{nextTierPoints} điểm</span>
                  </div>
                  <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-white/40 via-white to-white/40"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-medium text-white/70 max-w-[150px] leading-relaxed italic">
                    {userTier === 'platinum' ? 'Vị thế thượng lưu của bạn' : `Chỉ còn ${nextTierPoints - userPoints} điểm để thăng hạng ${nextTierName}`}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Info Boutique */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-forest-900/5 relative group">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="absolute top-6 right-6 p-2 rounded-full bg-ivory-100 text-forest-900/40 hover:bg-forest-900 hover:text-white transition-all duration-300"
              >
                <Edit3 size={16} />
              </button>

              <h3 className="font-serif text-xl text-forest-900 mb-8 flex items-center gap-3">
                <UserIcon size={20} className="text-forest-900/20" />
                Thông Tin Cá Nhân
              </h3>

              <div className="space-y-6">
                {[
                  { label: "Họ tên", value: userData?.name, icon: UserIcon },
                  { label: "Email", value: userData?.email, icon: Mail },
                  { label: "Số điện thoại", value: userData?.phone || "Chưa cập nhật", icon: Phone },
                  { label: "Địa chỉ", value: userData?.address ? `${userData.address}, ${userData.ward || ''}, ${userData.district || ''}, ${userData.city || ''}` : "Chưa cập nhật", icon: MapPin },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-ivory-50 flex items-center justify-center text-forest-900/30 group-hover/item:bg-forest-900 group-hover/item:text-white transition-colors duration-300 shrink-0">
                      <item.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-forest-900/30 font-bold mb-1">{item.label}</p>
                      <p className="text-sm text-forest-900 font-medium leading-relaxed break-words">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (8/12): Main Content Areas */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Lịch sử mua hàng", sub: "Theo dõi đơn hàng của bạn", icon: Package, href: "/account/orders" },
                { label: "Sản phẩm yêu thích", sub: "Danh sách quà tặng của bạn", icon: Gift, href: "/account/wishlist" },
                { label: "Liệu trình sức khỏe", sub: "AI phân tích sức khỏe", icon: Droplets, href: "/account/wellness" },
                { label: "Bảo mật & Ưu tiên", sub: "Cài đặt thông báo", icon: ShieldCheck, href: "/account/preferences" },
              ].map((action, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => router.push(action.href)}
                  className="bg-white p-6 rounded-[1.5rem] border border-forest-900/5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-ivory-50 flex items-center justify-center text-forest-900 group-hover:bg-forest-900 group-hover:text-white transition-all duration-300">
                      <action.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-forest-900 mb-0.5">{action.label}</h4>
                      <p className="text-xs text-forest-700/50">{action.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>





            {/* AI Recommendation Preview */}
            <div className="relative rounded-[2.5rem] overflow-hidden group h-[300px]">
              <Image 
                src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=2038&auto=format&fit=crop" 
                alt="Wellness Background" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-champagne-dark/90 rounded-full text-[10px] font-bold text-forest-900 uppercase tracking-widest mb-4">
                    <Droplets size={12} /> Gợi ý từ HiAn AI
                  </div>
                  <h3 className="font-serif text-3xl text-ivory-100 mb-4 font-bold">Tối ưu hóa sức khỏe với HiAn</h3>
                  <p className="text-ivory-100/60 text-sm mb-8 leading-relaxed">
                    Khám phá những gợi ý sản phẩm phù hợp nhất với thể trạng và lối sống của bạn được phân tích bởi AI.
                  </p>
                  <Link href="/wellness" className="inline-flex items-center gap-3 text-ivory-100 text-xs font-bold uppercase tracking-[0.2em] group/btn">
                    Khám phá ngay <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-forest-900/60 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[3.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(15,45,36,0.2)] overflow-hidden border border-white"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-forest-900/5 rounded-full blur-3xl" />
              
              <div className="flex justify-between items-center mb-12 relative z-10">
                <div>
                  <h3 className="font-serif text-4xl text-forest-900 font-bold mb-2">Thông Tin Cá Nhân</h3>
                  <p className="text-forest-900/40 text-xs uppercase tracking-[0.2em] font-bold">Cập nhật không gian riêng của bạn</p>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="w-12 h-12 flex items-center justify-center bg-ivory-50 text-forest-900/30 hover:bg-forest-900 hover:text-white rounded-full transition-all duration-500">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest-900/30 ml-2">Danh xưng / Họ tên</label>
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-ivory-50/50 border border-forest-900/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-forest-900/10 focus:bg-white transition-all font-medium text-forest-900 placeholder:text-forest-900/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest-900/30 ml-2">Số điện thoại liên lạc</label>
                    <input 
                      type="text" 
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="09xx xxx xxx"
                      className="w-full bg-ivory-50/50 border border-forest-900/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-forest-900/10 focus:bg-white transition-all font-medium text-forest-900 placeholder:text-forest-900/20"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest-900/30 ml-2">Địa chỉ giao hàng (Số nhà, Tên đường)</label>
                  <input 
                    type="text" 
                    value={editForm.address}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                    placeholder="123 Nguyễn Huệ"
                    className="w-full bg-ivory-50/50 border border-forest-900/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-forest-900/10 focus:bg-white transition-all font-medium text-forest-900"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest-900/30 ml-2">Thành phố / Tỉnh</label>
                    <input 
                      type="text" 
                      value={editForm.city}
                      onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                      className="w-full bg-ivory-50/50 border border-forest-900/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-forest-900/10 focus:bg-white transition-all font-medium text-forest-900"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest-900/30 ml-2">Quận / Huyện</label>
                    <input 
                      type="text" 
                      value={editForm.district}
                      onChange={(e) => setEditForm({...editForm, district: e.target.value})}
                      className="w-full bg-ivory-50/50 border border-forest-900/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-forest-900/10 focus:bg-white transition-all font-medium text-forest-900"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest-900/30 ml-2">Phường / Xã</label>
                    <input 
                      type="text" 
                      value={editForm.ward}
                      onChange={(e) => setEditForm({...editForm, ward: e.target.value})}
                      className="w-full bg-ivory-50/50 border border-forest-900/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-forest-900/10 focus:bg-white transition-all font-medium text-forest-900"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full bg-forest-900 text-white py-5 rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-forest-900/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Save size={18} /> Lưu Thay Đổi</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
