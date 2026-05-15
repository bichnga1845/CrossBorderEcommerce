"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  MapPin, 
  CreditCard, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Home 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/user/orders/${id}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7]">
      <div className="w-8 h-8 border-4 border-forest-900/10 border-t-forest-900 rounded-full animate-spin"></div>
    </div>
  );

  if (!order) return <div className="text-center py-20">Không tìm thấy đơn hàng.</div>;

  const steps = [
    { label: 'Đã đặt hàng', status: 'pending', icon: Clock },
    { label: 'Đang xử lý', status: 'processing', icon: Package },
    { label: 'Đang giao hàng', status: 'shipped', icon: Truck },
    { label: 'Đã giao hàng', status: 'delivered', icon: Home },
  ];

  const currentStepIdx = steps.findIndex(s => s.status === order.status);

  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-20" suppressHydrationWarning={true}>
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-12">
          <Link href="/account/orders" className="inline-flex items-center gap-2 text-forest-900/40 text-xs font-bold uppercase tracking-widest hover:text-forest-900 transition-colors mb-6">
            <ArrowLeft size={14} /> Trở lại danh sách
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-forest-900/40 mb-1">Chi tiết đơn hàng</p>
              <h1 className="font-serif text-3xl text-forest-900 font-bold">#{order._id.toString().slice(-8).toUpperCase()}</h1>
            </div>
            <p className="text-sm font-bold text-forest-900">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
          </div>
        </header>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-forest-900/5 shadow-sm mb-8">
          <div className="relative flex justify-between">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-forest-900 -translate-y-1/2 -z-10 transition-all duration-1000" 
              style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={idx} className="flex flex-col items-center gap-4 bg-white px-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isCompleted ? 'bg-forest-900 border-forest-900 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-300'
                  } ${isCurrent ? 'scale-110 ring-4 ring-forest-900/10' : ''}`}>
                    {isCompleted && idx < currentStepIdx ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-forest-900' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Products */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-forest-900/5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-forest-900/30 mb-6">Sản phẩm</h3>
              <div className="divide-y divide-ivory-100">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="py-6 flex items-center gap-6">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-forest-900">{item.name}</h4>
                      <p className="text-xs text-forest-900/40">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-forest-900">{(item.price * item.quantity).toLocaleString()} ₫</p>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-forest-900/5 mt-2 flex justify-between items-center">
                <span className="text-lg font-serif font-bold text-forest-900">Tổng cộng</span>
                <span className="text-2xl font-serif font-bold text-forest-900">{order.totalAmount.toLocaleString()} ₫</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Delivery Info */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-forest-900/5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-forest-900/30 mb-6 flex items-center gap-2">
                <MapPin size={14} /> Giao hàng
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-forest-900">{order.customer.firstName} {order.customer.lastName}</p>
                  <p className="text-xs text-forest-900/50 leading-relaxed mt-2">
                    {order.customer.address}, {order.customer.ward}, {order.customer.district}, {order.customer.city}
                  </p>
                  <p className="text-xs text-forest-900/50 mt-2">{order.customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-forest-900/5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-forest-900/30 mb-6 flex items-center gap-2">
                <CreditCard size={14} /> Thanh toán
              </h3>
              <p className="text-sm font-bold text-forest-900 uppercase tracking-widest">{order.paymentMethod}</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase mt-2">Đã thanh toán</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
