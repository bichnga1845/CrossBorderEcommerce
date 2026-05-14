"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, ShoppingBag, ChevronRight } from "lucide-react";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <div className="min-h-screen bg-ivory-100 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-forest-900 mb-12">Giỏ Hàng của Bạn</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-forest-900/10">
            <ShoppingBag size={64} className="mx-auto text-forest-900/20 mb-6" />
            <h2 className="text-2xl font-cormorant font-semibold text-forest-900 mb-4">Giỏ Hàng Trống</h2>
            <p className="text-forest-700/70 mb-8">Hãy thêm một số sản phẩm để tiếp tục mua sắm</p>
            <Link href="/shop" className="inline-block px-8 py-3 bg-forest-900 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-forest-800 transition-colors">
              Tiếp Tục Mua Sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-forest-900/10 overflow-hidden">
                {items.map((item, index) => (
                  <div key={item.productId} className={`p-6 flex gap-6 ${index !== items.length - 1 ? 'border-b border-forest-900/10' : ''}`}>
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-ivory-100 border border-forest-900/10 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-forest-900 font-semibold mb-2">{item.name}</h3>
                      <p className="text-forest-900 font-bold text-lg mb-4">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-forest-900/20 rounded-full w-32">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-forest-900 hover:bg-forest-900/5 rounded-l-full transition-colors text-lg"
                          >
                            −
                          </button>
                          <span className="flex-1 text-center text-forest-900 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-forest-900 hover:bg-forest-900/5 rounded-r-full transition-colors text-lg"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-500 hover:text-red-600 transition-colors p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-forest-900/10 p-6 sticky top-32">
                <h2 className="font-serif text-2xl font-semibold text-forest-900 mb-6">Đơn Hàng</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-forest-900/10">
                  <div className="flex justify-between text-forest-700">
                    <span>Số lượng:</span>
                    <span className="font-semibold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-forest-900 font-bold text-lg">
                    <span>Tổng Cộng:</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getTotalPrice())}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-white py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-colors">
                  Thanh Toán Ngay
                  <ChevronRight size={18} />
                </Link>

                <Link href="/shop" className="w-full text-center px-6 py-3 border border-forest-900 text-forest-900 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-forest-900/5 transition-colors">
                  Tiếp Tục Mua Sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
