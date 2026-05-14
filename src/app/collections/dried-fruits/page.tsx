"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sun, Thermometer, Zap, ShoppingBag, CheckCircle2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function DriedFruitsCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?category=Trái Cây Sấy")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#FCF9F2] min-h-screen font-sans text-forest-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/images/dried_fruits.png" 
            alt="Dried Fruits Collection" 
            fill 
            className="object-cover brightness-75 transition-all duration-1000 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/30 via-transparent to-[#FCF9F2]"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-orange-700 uppercase tracking-[0.3em] text-xs font-bold mb-6 block"
          >
            Hương Vị Trái Cây Miền Nhiệt Đới
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-cormorant text-7xl md:text-9xl text-white font-bold leading-tight mb-8"
          >
            Trái Cây <br />
            <span className="italic font-light text-orange-200">Sấy Dẻo</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Công nghệ sấy lạnh tiên tiến giúp giữ trọn màu sắc, hương vị tự nhiên và hàm lượng vitamin quý giá từ những vườn trái cây tươi ngon nhất.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-2xl"
            >
              Xem Bộ Sưu Tập
            </button>
          </motion.div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-xl transform -rotate-3">
                  <Image src="/images/fruits_story.png" alt="Fresh Fruit Orchard" fill className="object-cover" />
               </div>
               <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-xl transform rotate-3 mt-12">
                  <Image src="https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1974&auto=format&fit=crop" alt="Sun Dried Fruits" fill className="object-cover" />
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col order-1 lg:order-2"
          >
            <span className="text-orange-800/60 uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-orange-800/20"></span> Vị Ngọt Tự Nhiên
            </span>
            <h2 className="font-cormorant text-5xl md:text-6xl text-forest-900 font-semibold mb-8 leading-tight">
              Gói Trọn <br />
              <span className="text-orange-600 italic font-light">Nắng Vàng Miền Tây</span>
            </h2>
            <div className="space-y-6 text-forest-700/80 font-light leading-loose text-lg">
              <p>
                Trái cây sấy dẻo của HiAn bắt nguồn từ những vườn cây ăn quả lâu năm tại miền Tây Nam Bộ và các vùng nông sản đặc thù. Mỗi lát quả đều được tuyển chọn khi vừa chín tới, ở độ ngọt và độ mọng nước hoàn hảo nhất.
              </p>
              <p>
                Khác với phương pháp sấy truyền thống ở nhiệt độ cao thường làm mất đi hương vị và dưỡng chất, HiAn áp dụng công nghệ sấy lạnh (Freeze Drying) hiện đại. Quy trình này không chỉ bảo tồn cấu trúc tế bào mà còn giúp sản phẩm giữ được 98% hàm lượng vitamin vốn có.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-orange-600" size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Không Thêm Đường</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-orange-600" size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Không Chất Bảo Quản</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Technique Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col items-center text-center mb-24">
              <h2 className="font-cormorant text-5xl md:text-6xl font-semibold mb-6">Công Nghệ Sấy Lạnh Cao Cấp</h2>
              <p className="text-forest-700/60 max-w-2xl font-light">
                Đỉnh cao của sự tinh tế trong chế biến nông sản, mang đến trải nghiệm thưởng thức hoàn hảo.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Kiểm Soát Nhiệt Độ", desc: "Nhiệt độ luôn được duy trì từ 20-30°C để bảo vệ cấu trúc vitamin nhạy cảm.", icon: <Thermometer size={40} className="text-orange-600" /> },
                { title: "Giữ Trọn Hương Vị", desc: "Hệ thống khép kín giúp giữ lại 100% tinh chất hương thơm của trái cây tươi.", icon: <Zap size={40} className="text-orange-600" /> },
                { title: "Năng Lượng Sạch", desc: "Sử dụng năng lượng mặt trời hỗ trợ trong quy trình tiền xử lý bền vững.", icon: <Sun size={40} className="text-orange-600" /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-10 bg-ivory-100 rounded-[3rem] hover:shadow-xl transition-all hover:-translate-y-2">
                   <div className="mb-8 p-6 bg-white rounded-full shadow-inner">{item.icon}</div>
                   <h4 className="text-2xl font-bold mb-6">{item.title}</h4>
                   <p className="text-forest-700/70 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-32 px-4 bg-[#FCF9F2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-orange-700 uppercase tracking-widest text-xs font-bold mb-4 block">Thanh Tao & Khỏe Mạnh</span>
              <h2 className="font-cormorant text-5xl md:text-6xl text-forest-900 font-semibold leading-tight">
                Ăn Nhẹ Một Cách <br />
                <span className="italic text-orange-600">Đẳng Cấp</span>
              </h2>
            </div>
            <Link href="/shop?category=Trái Cây Sấy" className="group flex items-center gap-4 text-forest-900 font-bold uppercase tracking-widest text-xs border-b-2 border-orange-200 pb-2 hover:border-orange-600 transition-all">
              Xem Tất Cả Trái Cây <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-orange-100/20 rounded-3xl mb-6"></div>
                  <div className="h-6 bg-orange-100/20 rounded-full w-2/3 mb-4"></div>
                  <div className="h-4 bg-orange-100/20 rounded-full w-1/3"></div>
                </div>
              ))
            ) : (
              products.map((product) => (
                <Link key={product._id} href={`/shop/${product._id}`} className="group bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ivory-200 mb-6">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                       <ShoppingBag size={18} className="text-orange-600" />
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <h3 className="font-serif text-lg text-forest-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-orange-800 font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Inspirational Footer */}
      <section className="py-32 bg-forest-900 text-ivory-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-cormorant text-4xl md:text-5xl font-light italic leading-relaxed mb-12">
              "Trái cây sấy HiAn không chỉ là món ăn vặt, đó là cách chúng tôi kể câu chuyện về sự trù phú của đất đai và trí tuệ trong chế biến."
            </h2>
           <a
            href="https://www.facebook.com/HianStore185"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-orange-700 transition-all shadow-xl hover:-translate-y-1"
          >
            Chia Sẻ Câu Chuyện
          </a>
        </div>
      </section>

    </div>
  );
}
