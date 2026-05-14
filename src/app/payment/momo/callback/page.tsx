"use client";

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, LoaderCircle, XCircle } from 'lucide-react';
import { Suspense } from 'react';
import { useCartStore } from '@/store/useCartStore';

function formatMessage(resultCode: string | null) {
  if (resultCode === '0') return 'Thanh toán MoMo thành công. Đơn hàng của bạn đã được ghi nhận.';
  return 'Thanh toán chưa hoàn tất hoặc đã bị hủy. Bạn có thể quay lại checkout để thử lại.';
}

export default function MomoCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-ivory-100 text-forest-900">Đang tải kết quả thanh toán...</div>}>
      <MomoCallbackContent />
    </Suspense>
  );
}

function MomoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultCode = searchParams.get('resultCode');
  const orderId = searchParams.get('orderId');
  const message = searchParams.get('message');
  const clearCart = useCartStore((state) => state.clearCart);

  const isSuccess = useMemo(() => resultCode === '0', [resultCode]);

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess, clearCart]);

  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-4 pt-20">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-forest-900/5 max-w-lg w-full text-center border border-forest-900/10">
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
            {isSuccess ? <CheckCircle2 className="text-green-500 w-12 h-12" /> : <XCircle className="text-red-500 w-12 h-12" />}
          </div>
        </div>

        <h1 className="font-cormorant text-4xl text-forest-900 font-bold mb-4">
          {isSuccess ? 'Thanh Toán Thành Công!' : 'Thanh Toán Chưa Thành Công'}
        </h1>

        <p className="text-forest-700/80 mb-8 leading-relaxed">
          {message || formatMessage(resultCode)}
        </p>

        {orderId && (
          <div className="bg-ivory-100 p-4 rounded-xl mb-8 border border-forest-900/10">
            <p className="text-sm text-forest-700/60 uppercase tracking-widest font-semibold mb-1">Mã đơn hàng</p>
            <p className="font-mono text-xl text-forest-900 font-bold">#{orderId.slice(-8).toUpperCase()}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {isSuccess ? (
            <Link href="/account" className="w-full bg-forest-900 hover:bg-forest-800 text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-colors">
              Xem Đơn Hàng Của Tôi
            </Link>
          ) : (
            <button onClick={() => router.push('/checkout')} className="w-full bg-forest-900 hover:bg-forest-800 text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-colors">
              Quay Lại Thanh Toán
            </button>
          )}
          <Link 
            href="/shop" 
            className="w-full bg-white border border-forest-900/20 text-forest-900 hover:bg-forest-50 py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-colors"
          >
            Tiếp Tục Mua Sắm
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-forest-700/50">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          <span>Đang đồng bộ trạng thái đơn hàng...</span>
        </div>
      </div>
    </div>
  );
}
