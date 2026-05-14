"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, ShieldCheck, Sun, Star, Heart } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function HoneyCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?category=Mật Ong")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#FFFDF7] min-h-screen font-sans text-forest-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/images/honey.png" 
            alt="Wild Honey Forest" 
            fill 
            className="object-cover brightness-75 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 via-transparent to-[#FFFDF7]"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-amber-700 uppercase tracking-[0.3em] text-xs font-bold mb-6 block"
          >
            Mật Ngọt Từ Đại Ngàn Hùng Vĩ
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-cormorant text-7xl md:text-9xl text-white font-bold leading-tight mb-8"
          >
            Mật Ong <br />
            <span className="italic font-light text-amber-200">Đại Ngàn</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Những giọt mật vàng óng ả, được chắt lọc từ hàng triệu bông hoa rừng, mang trong mình hương vị hoang sơ và tinh khiết của núi rừng Tây Nguyên.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-2xl"
            >
              Thưởng Thức Ngay
            </button>
          </motion.div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-[12px] border-white">
              <Image 
                src="/images/honey_premium.png" 
                alt="Premium Wild Honey" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-100 rounded-full -z-0 opacity-40 blur-3xl"></div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-amber-800/60 uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-800/20"></span> Tinh Túy Rừng Già
            </span>
            <h2 className="font-cormorant text-5xl md:text-6xl text-forest-900 font-semibold mb-8 leading-tight">
              Giọt Vàng Rơi <br />
              <span className="text-amber-600 italic font-light">Giữa Đại Ngàn</span>
            </h2>
            <div className="space-y-6 text-forest-700/80 font-light leading-loose text-lg text-justify">
              <p>
                Sâu trong những cánh rừng nguyên sinh, nơi con người chưa chạm tới, những đàn ong rừng cần mẫn tìm hoa, dâng mật. Mật ong rừng của HiAn không phải sản phẩm của quy trình công nghiệp, mà là quà tặng quý giá của thiên nhiên sau hàng tháng trời chờ đợi.
              </p>
              <p>
                Mỗi giọt mật là một bản giao hưởng của hương thơm hoa dại, vị ngọt thanh tao và nguồn năng lượng dồi dào. Chúng tôi thu hoạch mật bằng phương pháp bền vững, đảm bảo không làm hại đến đàn ong và hệ sinh thái rừng.
              </p>
              <p className="font-serif italic text-amber-900 font-medium text-center border-y border-amber-100 py-6 my-10">
                "Mật ong HiAn - Kết tinh từ sự kiên nhẫn và lòng biết ơn đối với rừng già."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-32 bg-[#2D2A24] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-cormorant text-5xl font-semibold mb-6 italic text-amber-400 text-center">Quy Trình Khép Kín</h2>
            <p className="text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
              Từ tổ ong đến thành phẩm, mọi bước đều được kiểm soát nghiêm ngặt để giữ trọn vẹn tinh túy thiên nhiên.
            </p>
          </div>
          
          <div className="relative aspect-video max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-white shadow-2xl border-8 border-white/10">
            <Image 
              src="/images/honey_process_diagram.png" 
              alt="Honey Production Process Diagram" 
              fill 
              className="object-contain p-4 lg:p-12"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-amber-700 uppercase tracking-widest text-xs font-bold mb-4 block">Nguồn Dinh Dưỡng Vàng</span>
            <h2 className="font-cormorant text-5xl md:text-6xl text-forest-900 font-semibold mb-6">Sản Phẩm Nổi Bật</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-amber-100 rounded-full mb-8 scale-90"></div>
                  <div className="h-6 bg-amber-50 rounded-full w-2/3 mx-auto mb-4"></div>
                  <div className="h-4 bg-amber-50 rounded-full w-1/3 mx-auto"></div>
                </div>
              ))
            ) : (
              products.map((product) => (
                <Link key={product._id} href={`/shop/${product._id}`} className="group text-center">
                  <div className="relative aspect-square overflow-hidden rounded-full border-8 border-white shadow-2xl mb-8 group-hover:rotate-3 transition-transform duration-500 max-w-[320px] mx-auto">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors duration-500"></div>
                  </div>
                  <h3 className="font-serif text-2xl text-forest-900 mb-2 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2 text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-forest-900/60 font-bold text-lg">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: "Tự Nhiên 100%", icon: <Heart className="text-amber-600" /> },
                { title: "Không Pha Tạp", icon: <Droplets className="text-amber-600" /> },
                { title: "Giàu Men Sống", icon: <Sun className="text-amber-600" /> },
                { title: "Truy Xuất Nguồn Gốc", icon: <ShieldCheck className="text-amber-600" /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-amber-100">
                  <div className="mb-4">{item.icon}</div>
                  <span className="font-bold text-forest-900 text-sm uppercase tracking-wider">{item.title}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Inspirational Footer */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-cormorant text-4xl md:text-5xl text-forest-900 font-light italic leading-relaxed mb-12">
              "Thưởng thức mật ong rừng HiAn là thưởng thức sự ngọt ngào thanh khiết nhất của tự nhiên, là bồi bổ sức khỏe bằng món quà tuyệt diệu nhất từ Tây Nguyên."
            </h2>
            <Link 
              href="/shop" 
              className="inline-block bg-amber-600 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-amber-700 transition-all shadow-xl hover:-translate-y-1"
            >
              Ghé Thăm Cửa Hàng
            </Link>
        </div>
      </section>

    </div>
  );
}
