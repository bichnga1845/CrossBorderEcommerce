"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Lightbulb, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";

export default function GiftsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "innovation_lab",
          ...formData
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Innovation Lab error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const giftBoxes = [
    {
      name: "Heritage Signature Box",
      price: "1.250.000 ₫",
      desc: "Sự kết hợp hoàn hảo giữa gỗ mộc và lụa tơ tằm, chứa đựng những hạt Mắc ca thượng hạng nhất.",
      image: "/images/gift_premium.png"
    },
    {
      name: "Wild Honey Collection",
      price: "850.000 ₫",
      desc: "Bộ sưu tập mật ong rừng nguyên bản, món quà tinh túy dành cho sức khỏe người thân.",
      image: "/images/honey.png"
    },
    {
      name: "Highland Discovery Set",
      price: "650.000 ₫",
      desc: "Trải nghiệm đa dạng các loại nông sản Tây Nguyên trong một thiết kế hộp quà hiện đại.",
      image: "/images/dried_fruits.png"
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-100 text-forest-900">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/gift_premium.png" 
            alt="Premium Gifts" 
            fill 
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-champagne-dark uppercase tracking-[0.4em] text-xs font-bold mb-6 block"
          >
            Nâng Tầm Văn Hóa Tặng Quà
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-6xl md:text-8xl text-white mb-8 font-semibold drop-shadow-2xl"
          >
            Quà Tặng <span className="italic font-light text-champagne">Trân Quý</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Mỗi hộp quà HiAn không chỉ là sản phẩm, mà là một tác phẩm nghệ thuật kể về sự trân trọng và tấm lòng của người tặng.
          </motion.p>
        </div>
      </section>

      {/* Gift Collections */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-cormorant text-5xl font-semibold mb-6">Các Bộ Sưu Tập Quà Tặng</h2>
              <p className="text-forest-700/60 font-light text-lg">
                Đa dạng lựa chọn từ thiết kế truyền thống đến hiện đại, phù hợp cho mọi dịp quan trọng.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {giftBoxes.map((box, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-xl mb-8">
                  <Image src={box.image} alt={box.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-500"></div>
                </div>
                <h3 className="font-cormorant text-3xl font-semibold mb-4 group-hover:text-champagne-dark transition-colors">{box.name}</h3>
                <p className="text-forest-700/60 font-light text-sm mb-6 leading-relaxed">{box.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl">{box.price}</span>
                  <button className="p-4 rounded-full bg-white shadow-md hover:bg-forest-900 hover:text-white transition-all">
                    <Gift size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Entrepreneur Idea Hub Section - "Khám Phá Ngay" */}
      <section className="py-32 bg-forest-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <Image src="/images/collaboration.png" alt="Collaboration Background" fill className="object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="pt-10"
            >
              <span className="text-champagne-dark uppercase tracking-[0.3em] text-xs font-bold mb-6 block">HiAn Innovation Lab</span>
              <h2 className="font-cormorant text-5xl md:text-6xl font-semibold mb-8 leading-tight">
                Cùng Chúng Tôi <br />
                <span className="italic font-light text-champagne">Kiến Tạo Tương Lai</span>
              </h2>
              <p className="text-white/60 font-light leading-relaxed text-lg mb-12 max-w-lg">
                Bạn có một ý tưởng đột phá về nông sản hay bao bì bền vững? Hãy để HiAn giúp bạn hiện thực hóa tầm nhìn đó.
              </p>
              
              <div className="flex gap-12 opacity-40">
                <div className="flex flex-col gap-2">
                  <MessageSquare size={20} className="text-champagne-dark" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Hỗ trợ 24/7</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Sparkles size={20} className="text-champagne-dark" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Ươm mầm startup</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Lightbulb size={20} className="text-champagne-dark" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Cùng phát triển</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative z-10 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h4 className="font-cormorant text-3xl mb-8 font-semibold italic text-champagne">Gửi Ý Tưởng</h4>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4">Họ và tên</label>
                          <input 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            type="text" 
                            placeholder="Nguyễn Văn A" 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-champagne-dark transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4">Email liên hệ</label>
                          <input 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            type="email" 
                            placeholder="example@gmail.com" 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-champagne-dark transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4">Ý tưởng của bạn</label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Mô tả ngắn gọn về sản phẩm hoặc giải pháp..." 
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-champagne-dark transition-colors resize-none"
                          ></textarea>
                        </div>
                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full bg-champagne-dark text-forest-900 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl group flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {isLoading ? "Đang gửi..." : "Bắt đầu hành trình"}
                          {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 bg-champagne-dark/20 text-champagne-dark rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h4 className="font-cormorant text-3xl font-semibold mb-4 text-champagne">Đã Gửi Thành Công!</h4>
                      <p className="text-white/60 font-light leading-relaxed">
                        Cảm ơn bạn đã chia sẻ tâm huyết. <br />
                        HiAn sẽ nghiên cứu và liên hệ với bạn sớm nhất có thể.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 text-[10px] uppercase tracking-widest font-bold text-champagne-dark hover:text-white transition-colors"
                      >
                        Gửi thêm ý tưởng khác
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Image floating behind/side */}
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full overflow-hidden border-[15px] border-white/5 -z-0 opacity-40 lg:opacity-100">
                <Image src="/images/collaboration.png" alt="Startup Collaboration" fill className="object-cover grayscale" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Orders CTA */}
      <section className="py-32 bg-ivory-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-8">Dành Cho Doanh Nghiệp</h2>
          <p className="text-forest-700/60 font-light text-lg mb-12">
            Giải pháp quà tặng chuyên nghiệp, tinh tế giúp khẳng định vị thế và xây dựng mối quan hệ bền vững với đối tác.
          </p>
          <Link 
            href="/corporate" 
            className="inline-block border-2 border-forest-900 text-forest-900 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-forest-900 hover:text-white transition-all shadow-xl"
          >
            Giải Pháp Doanh Nghiệp
          </Link>
        </div>
      </section>

    </div>
  );
}
