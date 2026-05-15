"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Wishlist() {
  const { data: session, status } = useSession();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchWishlist();
    }
  }, [status]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/user/wishlist");
      const data = await res.json();
      if (data.success) {
        setWishlist(data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const res = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(prev => prev.filter(item => item._id !== productId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-20" suppressHydrationWarning={true}>
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-12 text-center">
          <Link href="/account/dashboard" className="inline-flex items-center gap-2 text-forest-900/40 text-xs font-bold uppercase tracking-widest hover:text-forest-900 transition-colors mb-6">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <h1 className="font-cormorant text-5xl text-forest-900 font-bold mb-4">Danh Sách Yêu Thích</h1>
          <p className="text-forest-900/50 text-sm italic">Nơi lưu giữ những lựa chọn tinh tế cho sức khỏe và gia đình.</p>
        </header>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-forest-900/10 border-t-forest-900 rounded-full animate-spin"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-forest-900/5 shadow-sm">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart size={40} className="text-red-200" />
            </div>
            <h2 className="text-2xl font-serif text-forest-900 mb-4">Danh sách còn trống</h2>
            <p className="text-forest-900/40 max-w-sm mx-auto mb-10">Hãy khám phá bộ sưu tập nông sản cao cấp và chọn cho mình những món đồ ưng ý nhất.</p>
            <Link href="/shop" className="inline-flex items-center gap-3 px-10 py-4 bg-forest-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-forest-800 transition-all">
              Đi đến cửa hàng <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item, idx) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-forest-900/5 shadow-sm group hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                  <button 
                    onClick={() => removeFromWishlist(item._id)}
                    className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-8">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-forest-900/30 mb-2">{item.category}</p>
                  <h3 className="font-serif text-xl text-forest-900 font-bold mb-4">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-forest-900 font-bold">{item.price?.toLocaleString()} ₫</p>
                    <button className="p-4 bg-ivory-50 text-forest-900 rounded-2xl hover:bg-forest-900 hover:text-white transition-all">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
