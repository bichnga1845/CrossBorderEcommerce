"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Leaf, ShieldCheck, Zap, Star, ShoppingBag } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function MacadamiaCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?category=Hạt Mắc Ca")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-ivory-100 min-h-screen font-sans text-forest-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/images/macadamia.png" 
            alt="Macadamia Highlands" 
            fill 
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-900/40 via-transparent to-ivory-100"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-champagne-dark uppercase tracking-[0.3em] text-xs font-bold mb-6 block"
          >
            Tinh Hoa Đất Trời Tây Nguyên
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-cormorant text-7xl md:text-9xl text-white font-bold leading-tight mb-8"
          >
            Hạt Mắc Ca <br />
            <span className="italic font-light text-champagne">Nguyên Bản</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Được mệnh danh là "Hoàng hậu của các loại hạt", Mắc ca HiAn là sự kết tinh từ thổ nhưỡng bazan màu mỡ và quy trình chế biến thủ công tỉ mỉ.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-champagne-dark hover:bg-champagne text-forest-900 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-2xl"
            >
              Khám Phá Sản Phẩm
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
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 border-8 border-white">
              <Image 
                src="/images/macadamia_tree.png" 
                alt="Macadamia Tree" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-champagne rounded-3xl -z-0 opacity-30 blur-2xl"></div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-forest-700/60 uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-forest-900/20"></span> Câu Chuyện Của Chúng Tôi
            </span>
            <h2 className="font-cormorant text-5xl md:text-6xl text-forest-900 font-semibold mb-8 leading-tight">
              Hành Trình Từ Vùng <br />
              <span className="text-champagne-dark italic font-light">Đất Đỏ Bazan</span>
            </h2>
            <div className="space-y-6 text-forest-700/80 font-light leading-loose text-lg">
              <p>
                Tại độ cao hơn 800m so với mực nước biển, những cây Mắc ca của HiAn vươn mình đón nắng gió của đại ngàn Tây Nguyên. Thổ nhưỡng đất đỏ bazan hàng triệu năm tuổi đã ban tặng cho hạt Mắc ca nơi đây hương vị bùi béo đặc trưng mà không nơi nào có được.
              </p>
              <p>
                Chúng tôi tin rằng, mỗi hạt Mắc ca không chỉ là một nguồn dinh dưỡng quý giá, mà còn là niềm tự hào của những người nông dân bền bỉ. Từ việc chọn lựa từng cây giống F1 thuần chủng đến quy trình canh tác thuận tự nhiên, mọi bước đi đều được dẫn dắt bởi sự trân trọng đối với mẹ thiên nhiên.
              </p>
              <p className="font-serif italic text-forest-900 font-medium">
                "HiAn không chỉ bán hạt, chúng tôi mang cả tinh túy và tâm hồn của Tây Nguyên đến với bàn ăn của bạn."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-32 bg-forest-900 text-ivory-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-150">
                <path d="M250 50C139.5 50 50 139.5 50 250s89.5 200 200 200 200-89.5 200-200S360.5 50 250 50zm0 360c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160z" fill="currentColor"/>
            </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center mb-24">
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold mb-6 italic text-champagne">Quy Trình Chế Biến</h2>
          <p className="text-ivory-100/60 max-w-2xl mx-auto font-light tracking-wide">
            Sự minh bạch là tôn chỉ hàng đầu. Hãy cùng khám phá hành trình 5 bước để tạo nên những hạt Mắc ca thượng hạng.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            { step: "01", title: "Thu Hoạch", desc: "Chỉ chọn những quả đã chín già trên cây, rụng tự nhiên.", icon: <Leaf size={32} /> },
            { step: "02", title: "Làm Sạch", desc: "Loại bỏ lớp vỏ xanh và rửa sạch bằng nước nguồn tự nhiên.", icon: <ShieldCheck size={32} /> },
            { step: "03", title: "Sấy Khô", desc: "Sấy nhiệt độ thấp trong 72 giờ để giữ trọn vẹn dưỡng chất.", icon: <Zap size={32} /> },
            { step: "04", title: "Phân Loại", desc: "Tuyển chọn bằng tay từng hạt để đảm bảo kích thước đồng đều.", icon: <Star size={32} /> },
            { step: "05", title: "Đóng Gói", desc: "Hút chân không và đóng gói trong bao bì cao cấp chống ẩm.", icon: <ShoppingBag size={32} /> }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="text-champagne-dark mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <span className="text-champagne/40 text-xs font-bold tracking-widest mb-4 block">{item.step}</span>
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <p className="text-ivory-100/60 text-sm font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-32 px-4 bg-ivory-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-4 block">
                Bộ Sưu Tập Sản Phẩm
              </span>
              <h2 className="font-cormorant text-5xl md:text-6xl text-forest-900 font-semibold leading-tight">
                Thưởng Thức Hương Vị <br />
                <span className="italic text-champagne-dark">Thượng Hạng</span>
              </h2>
            </div>

            <Link
              href="/shop?category=Hạt Mắc Ca"
              className="group flex items-center gap-4 text-forest-900 font-bold uppercase tracking-widest text-xs border-b-2 border-forest-900/10 pb-2 hover:border-forest-900 transition-all"
            >
              Xem Tất Cả Mắc Ca
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-forest-900/5 rounded-3xl mb-6"></div>
                  <div className="h-6 bg-forest-900/5 rounded-full w-2/3 mb-4"></div>
                  <div className="h-4 bg-forest-900/5 rounded-full w-1/3"></div>
                </div>
              ))
            ) : (
              products.map((product) => (
                <Link key={product._id} href={`/shop/${product._id}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-ivory-200 shadow-lg mb-6">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-500"></div>
                  </div>
                  <h3 className="font-serif text-xl text-forest-900 mb-2 group-hover:text-champagne-dark transition-colors">{product.name}</h3>
                  <p className="text-forest-900/60 font-bold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/macadamia_nuts.png" alt="Macadamia Nuts" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 bg-ivory-100 rounded-3xl">
              <h3 className="font-cormorant text-4xl mb-6 font-semibold">Tuyển Chọn Khắt Khe</h3>
              <p className="text-forest-700/80 font-light leading-relaxed">
                Từng hạt Mắc ca đều được kiểm tra kỹ lưỡng về độ ẩm, kích thước và màu sắc. Chỉ những hạt đạt tiêu chuẩn loại AA mới được đưa vào quy trình sấy và đóng gói.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Footer */}
      <section className="py-32 bg-ivory-200 border-t border-forest-900/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-20 h-px bg-champagne-dark mx-auto mb-12"></div>
            <h2 className="font-cormorant text-4xl md:text-5xl text-forest-900 font-light italic leading-relaxed mb-12">
              "Trong mỗi hạt Mắc ca của HiAn, chúng tôi gửi gắm cả tình yêu của núi rừng và tâm huyết của những người làm nông tử tế."
            </h2>
            <Link 
              href="/story" 
              className="inline-block bg-forest-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-forest-800 transition-all shadow-xl hover:-translate-y-1"
            >
              Xem Thêm Về HiAn
            </Link>
        </div>
      </section>

    </div>
  );
}
