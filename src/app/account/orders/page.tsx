"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, ChevronRight, Clock, CheckCircle2, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderHistory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/user/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-20 overflow-hidden" suppressHydrationWarning={true}>
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-12">
          <Link href="/account/dashboard" className="inline-flex items-center gap-2 text-forest-900/40 text-xs font-bold uppercase tracking-widest hover:text-forest-900 transition-colors mb-6">
            <ArrowLeft size={14} /> Trở về Dashboard
          </Link>
          <h1 className="font-cormorant text-5xl text-forest-900 font-bold mb-4">Lịch Sử Mua Hàng</h1>
          <p className="text-forest-900/50 text-sm italic">Theo dõi hành trình của những tinh hoa nông sản bạn đã chọn.</p>
        </header>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-forest-900/10 border-t-forest-900 rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-forest-900/5 shadow-sm">
            <Package size={48} className="mx-auto text-forest-900/10 mb-6" />
            <p className="text-forest-900/40 font-medium">Bạn chưa có đơn hàng nào.</p>
            <Link href="/shop" className="mt-8 inline-block px-10 py-4 bg-forest-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-forest-800 transition-all">
              Bắt đầu mua sắm
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-6 border border-forest-900/5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-ivory-50 rounded-2xl flex items-center justify-center text-forest-900 group-hover:bg-forest-900 group-hover:text-white transition-colors duration-500">
                      <Package size={32} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-forest-900/30 mb-1">Mã đơn: #{order._id.toString().slice(-8).toUpperCase()}</p>
                      <h3 className="font-bold text-forest-900 text-lg mb-2">{order.items.length} sản phẩm</h3>
                      <p className="text-xs text-forest-900/50">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col justify-between items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status === 'delivered' ? 'Đã hoàn thành' : 'Đang xử lý'}
                    </span>
                    <p className="text-xl font-serif font-bold text-forest-900">{order.totalAmount?.toLocaleString()} ₫</p>
                    <Link href={`/account/orders/${order._id}`} className="text-[10px] font-bold uppercase tracking-widest text-forest-900/40 hover:text-forest-900 transition-colors flex items-center gap-1">
                      Chi tiết <ChevronRight size={14} />
                    </Link>
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
