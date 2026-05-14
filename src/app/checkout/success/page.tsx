"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-forest-900/5 max-w-lg w-full text-center border border-forest-900/10">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="text-green-500 w-12 h-12" />
        </div>
      </div>
      
      <h1 className="font-cormorant text-4xl text-forest-900 font-bold mb-4">Đặt Hàng Thành Công!</h1>
      
      <p className="text-forest-700/80 mb-8 leading-relaxed">
        Cảm ơn bạn đã mua sắm tại Aura. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý. Chúng tôi sẽ gửi email xác nhận ngay cho bạn.
      </p>

      {orderId && (
        <div className="bg-ivory-100 p-4 rounded-xl mb-8 border border-forest-900/10">
          <p className="text-sm text-forest-700/60 uppercase tracking-widest font-semibold mb-1">Mã đơn hàng</p>
          <p className="font-mono text-xl text-forest-900 font-bold">#{orderId.slice(-8).toUpperCase()}</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Link 
          href="/shop" 
          className="w-full bg-forest-900 hover:bg-forest-800 text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-colors"
        >
          Tiếp Tục Mua Sắm
        </Link>
        <Link 
          href="/" 
          className="w-full bg-white border border-forest-900/20 text-forest-900 hover:bg-forest-50 py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-colors"
        >
          Trở Về Trang Chủ
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-4 pt-20">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
