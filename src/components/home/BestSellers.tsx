"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  tag?: string;
  rating: number;
  reviews: number;
}

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetch('/api/products?limit=4')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
      });
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-3 block">Bảo Chứng Chất Lượng</span>
            <h2 className="font-cormorant text-4xl text-forest-900 mb-4 font-semibold">Sản Phẩm Nổi Bật</h2>
          </motion.div>
          <Link
            href="/shop"
            className="hidden md:inline-block border-b border-forest-900 pb-1 text-forest-900 uppercase tracking-widest text-xs font-bold hover:text-champagne-dark hover:border-champagne-dark transition-colors"
          >
            Xem Tất Cả
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              key={product._id} 
              className="group flex flex-col transform-gpu [perspective:1000px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ivory-100 mb-6 rounded-2xl [transform-style:preserve-3d] group-hover:[transform:rotateX(2deg)_rotateY(-2deg)] transition-all duration-700 shadow-sm hover:shadow-[var(--shadow-luxury-hover)] border border-forest-900/5">
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-forest-900 rounded-sm shadow-sm [transform:translateZ(10px)]">
                    {product.tag}
                  </div>
                )}
                <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-forest-900 hover:text-red-500 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 [transform:translateZ(10px)] shadow-lg">
                  <Heart size={16} />
                </button>
                <Link href={`/shop/${product._id}`} className="block w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="absolute bottom-0 left-0 w-full bg-forest-900/90 backdrop-blur-md text-white py-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center justify-center space-x-2 hover:bg-forest-900 [transform:translateZ(20px)] border-t border-white/10"
                >
                  <ShoppingBag size={18} />
                  <span className="uppercase tracking-widest text-xs font-semibold">Thêm Vào Giỏ</span>
                </button>
              </div>
              <div className="flex-grow flex flex-col">
                <div className="flex items-center space-x-1 mb-2">
                  <Star size={12} className="text-champagne-dark fill-champagne-dark" />
                  <span className="text-xs text-forest-900 font-medium">{product.rating}</span>
                  <span className="text-xs text-forest-700/50">({product.reviews})</span>
                </div>
                <h3 className="font-serif text-lg text-forest-900 mb-1 leading-snug">
                  <Link href={`/shop/${product._id}`} className="hover:text-champagne-dark transition-colors">{product.name}</Link>
                </h3>
                <p className="text-forest-700/70 text-sm font-light mb-3 flex-grow">{product.desc}</p>
                <p className="text-forest-900 font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <Link
            href="/shop"
            className="inline-block bg-forest-900 px-8 py-4 text-white uppercase tracking-widest text-xs font-semibold w-full rounded-full"
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
