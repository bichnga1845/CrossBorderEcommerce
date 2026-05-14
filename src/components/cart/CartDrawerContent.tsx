"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function CartDrawerContent() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  // Client-side only: don't render on server
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-forest-900/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-forest-900/10 bg-ivory-100">
          <h2 className="font-serif text-2xl text-forest-900 font-semibold flex items-center gap-2">
            <ShoppingBag className="text-champagne-dark" /> Giỏ Hàng
          </h2>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-forest-900/5 rounded-full transition-colors text-forest-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag size={48} className="text-forest-900/20" />
              <p className="text-forest-700/70">Giỏ hàng của bạn đang trống</p>
              <button 
                onClick={toggleCart}
                className="mt-4 px-8 py-3 bg-forest-900 text-white rounded-full uppercase tracking-widest text-xs font-bold hover:bg-forest-800 transition-colors"
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 items-start pb-6 border-b border-forest-900/5">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-ivory-100 border border-forest-900/10 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-forest-900 text-sm leading-snug pr-4">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="text-forest-900/40 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <p className="text-forest-900 font-bold text-sm mb-3">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </p>
                    
                    <div className="flex items-center border border-forest-900/20 rounded-full w-24">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-forest-900 hover:bg-forest-900/5 rounded-l-full transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="flex-1 text-center text-forest-900 text-sm font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-forest-900 hover:bg-forest-900/5 rounded-r-full transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-forest-900/10 bg-ivory-100/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-forest-900 font-semibold uppercase tracking-wider text-sm">Tổng cộng</span>
              <span className="text-2xl font-bold text-forest-900">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getTotalPrice())}
              </span>
            </div>
            <Link 
              href="/checkout"
              onClick={toggleCart}
              className="w-full flex items-center justify-center bg-forest-900 hover:bg-forest-800 text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-colors shadow-lg shadow-forest-900/20"
            >
              Thanh Toán Ngay
            </Link>
          </div>
        )}
        
      </div>
    </>
  );
}
