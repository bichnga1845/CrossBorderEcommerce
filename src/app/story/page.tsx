"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Leaf, Users, ShieldCheck, Heart } from "lucide-react";

export default function BrandStoryPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-forest-900 overflow-x-hidden">
      
      {/* Cinematic Hero */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/images/story_hero.png" 
            alt="Highland Heritage Farm" 
            fill 
            className="object-cover brightness-[0.65]"
            priority
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-champagne-dark uppercase tracking-[0.4em] text-xs font-bold mb-8 block"
          >
            Since 2018 — The Essence of Highlands
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-cormorant text-6xl md:text-8xl lg:text-9xl text-white mb-10 font-semibold leading-tight"
          >
            Hành Trình <br />
            <span className="italic font-light text-champagne-dark">Của Niềm Tin</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-4 text-white/60"
          >
            <p className="text-lg md:text-xl font-light tracking-widest uppercase mb-4">Cuộn để bắt đầu</p>
            <ArrowDown className="animate-bounce" size={24} />
          </motion.div>
        </div>
      </section>

      {/* Philosophy - Text Only focus */}
      <section className="py-40 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <span className="text-forest-700/40 uppercase tracking-widest text-[10px] font-bold mb-12 block italic">Triết lý HiAn</span>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-forest-900 leading-snug mb-16 italic font-light">
              "Chúng tôi không chỉ canh tác nông sản. <br className="hidden md:block" />
              Chúng tôi <span className="text-champagne-dark font-normal">vun đắp sự tử tế</span> trên từng tấc đất quê hương."
            </h2>
            <div className="w-16 h-px bg-forest-900/10 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* The Heritage - Split Layout */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
              <Image 
                src="/images/story_nature.png" 
                alt="Natural Purity" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border border-champagne-dark/20 rounded-full animate-spin-slow"></div>
          </motion.div>

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-6">01. Di Sản Tây Nguyên</span>
            <h3 className="font-cormorant text-5xl md:text-6xl text-forest-900 font-semibold mb-8 leading-tight">
              Bắt đầu từ <br />
              <span className="italic font-light">Sự Thuần Khiết</span>
            </h3>
            <p className="text-forest-700/80 font-light leading-relaxed text-lg mb-10">
              HiAn ra đời tại vùng đất đỏ bazan huyền thoại, nơi hội tụ tinh hoa của trời và đất. Chúng tôi tin rằng, một sản phẩm thực sự cao cấp phải bắt đầu từ sự tôn trọng tuyệt đối đối với hệ sinh thái địa phương.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-forest-900/5 pt-10">
              <div>
                <Leaf className="text-champagne-dark mb-4" size={24} />
                <h4 className="font-semibold mb-2">Canh Tác Tự Nhiên</h4>
                <p className="text-sm text-forest-700/60">Không hóa chất, chỉ có sự cộng sinh hài hòa.</p>
              </div>
              <div>
                <ShieldCheck className="text-champagne-dark mb-4" size={24} />
                <h4 className="font-semibold mb-2">Minh Bạch 100%</h4>
                <p className="text-sm text-forest-700/60">Truy xuất nguồn gốc đến từng nông hộ.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The People - Full Width Parallax-style */}
      <section className="py-40 px-6 bg-forest-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <div className="aspect-square rounded-full overflow-hidden border-[20px] border-white/5 relative shadow-inner">
                <Image 
                  src="/images/story_farmers.png" 
                  alt="Craftsmanship" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-6 block">02. Những Con Người Tử Tế</span>
              <h3 className="font-cormorant text-5xl md:text-6xl font-semibold mb-8 leading-tight">
                Bàn Tay <br />
                <span className="italic font-light text-champagne">Kiến Tạo Giá Trị</span>
              </h3>
              <p className="text-white/60 font-light leading-relaxed text-lg mb-12">
                Đứng sau mỗi sản phẩm của HiAn là những người nông dân bền bỉ, những nghệ nhân tâm huyết. Chúng tôi xây dựng một cộng đồng bền vững, nơi mỗi cá nhân đều tự hào về những giá trị mà họ tạo ra cho cộng đồng.
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <Users className="text-champagne-dark" />
                </div>
                <div>
                  <p className="text-2xl font-cormorant font-bold">+500</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Nông hộ liên kết</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values - Minimalist Grid */}
      <section className="py-40 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="font-cormorant text-5xl font-semibold text-forest-900 mb-6">Giá Trị Cốt Lõi</h2>
            <div className="w-12 h-1 bg-champagne-dark mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: <Heart size={40} />, title: "Tâm Huyết", desc: "Mỗi sản phẩm là một lời hứa về chất lượng và sự chân thành từ tâm." },
              { icon: <Leaf size={40} />, title: "Bền Vững", desc: "Bảo vệ môi trường và giữ gìn hệ sinh thái cho thế hệ mai sau." },
              { icon: <ShieldCheck size={40} />, title: "Trung Thực", desc: "Cam kết minh bạch tuyệt đối về nguồn gốc và quy trình sản xuất." }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="mb-8 text-forest-900 group-hover:text-champagne-dark transition-colors inline-block p-6 rounded-full bg-white shadow-sm group-hover:shadow-xl duration-500">
                  {value.icon}
                </div>
                <h4 className="font-cormorant text-3xl font-semibold mb-4">{value.title}</h4>
                <p className="text-forest-700/60 font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 bg-white text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-4"
        >
          <h2 className="font-cormorant text-5xl md:text-6xl text-forest-900 mb-12 font-semibold italic">
            Cùng HiAn viết tiếp <br /> những câu chuyện nông sản Việt.
          </h2>
          <Link 
            href="/shop" 
            className="inline-block bg-forest-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-champagne-dark transition-all shadow-2xl hover:-translate-y-1"
          >
            Bắt đầu trải nghiệm
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
