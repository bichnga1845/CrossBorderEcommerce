"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, Users, Palette, Briefcase, CheckCircle2, X, Send, FileText, Phone, Mail, Building, MapPin } from "lucide-react";

export default function CorporatePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<"quote" | "profile">("quote");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });

  const openForm = (type: "quote" | "profile") => {
    setFormType(type);
    setIsFormOpen(true);
    setIsSubmitted(false);
  };

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
          type: formType === "quote" ? "corporate_quote" : "corporate_profile",
          ...formData
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Inquiry error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const corporateServices = [
    {
      title: "Cá Nhân Hóa Thương Hiệu",
      desc: "Khắc laser logo doanh nghiệp lên hộp gỗ, thiết kế thiệp chúc mừng riêng biệt để lan tỏa dấu ấn thương hiệu.",
      icon: <Palette size={32} />
    },
    {
      title: "Giải Pháp Hậu Cần Toàn Diện",
      desc: "Hệ thống kho vận hiện đại đảm bảo giao quà tận tay đối tác đúng tiến độ, ngay cả trong mùa cao điểm.",
      icon: <Truck size={32} />
    },
    {
      title: "Đồng Hành Cùng CSR",
      desc: "Góp phần hỗ trợ cộng đồng nông dân Tây Nguyên và phát triển nông nghiệp bền vững thông qua mỗi đơn hàng.",
      icon: <ShieldCheck size={32} />
    }
  ];

  const packages = [
    { name: "Premium Signature", tier: "Thượng Hạng", items: ["1x Mật ong rừng 500ml", "2x Mắc ca loại AA", "Hộp gỗ khắc laser", "Thiệp cao cấp"] },
    { name: "Executive Selection", tier: "Đẳng Cấp", items: ["1x Mật ong rừng 250ml", "1x Mắc ca loại AA", "1x Trái cây sấy dẻo", "Hộp quà cứng luxury"] },
    { name: "Boutique Choice", tier: "Tinh Tế", items: ["2x Mắc ca loại AA", "Hộp quà thiết kế", "Túi giấy cao cấp"] }
  ];

  return (
    <div className="min-h-screen bg-white text-forest-900">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/corporate_gift.png" 
            alt="Corporate Gifts" 
            fill 
            className="object-cover brightness-[0.25]"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-3 px-6 py-2 rounded-full mb-8"
          >
            <Briefcase size={16} className="text-champagne-dark" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">B2B Solutions</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-6xl md:text-8xl text-white mb-8 font-semibold leading-tight drop-shadow-2xl"
          >
            Dấu Ấn <span className="italic font-light text-champagne">Doanh Nghiệp</span> <br /> 
            Trong Từng Món Quà
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg md:text-xl font-light max-w-3xl mx-auto mb-12"
          >
            HiAn cung cấp giải pháp quà tặng nông sản cao cấp, giúp doanh nghiệp truyền tải thông điệp về sự chân thành và đẳng cấp tới đối tác, khách hàng.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <button 
              onClick={() => openForm("quote")}
              className="bg-champagne-dark text-forest-900 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-champagne transition-all shadow-2xl"
            >
              Nhận Báo Giá Doanh Nghiệp
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 bg-ivory-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-cormorant text-5xl font-semibold mb-6">Tại Sao Chọn HiAn?</h2>
            <div className="w-16 h-1 bg-champagne-dark mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {corporateServices.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="text-champagne-dark mb-8 group-hover:scale-110 transition-transform inline-block">
                  {service.icon}
                </div>
                <h3 className="font-cormorant text-3xl font-semibold mb-6">{service.title}</h3>
                <p className="text-forest-700/60 font-light leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <div>
              <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-6 block">Our Packages</span>
              <h2 className="font-cormorant text-5xl md:text-6xl font-semibold mb-8 leading-tight">
                Giải Pháp Quà Tặng <br /> 
                <span className="italic font-light text-forest-700">Đa Dạng Phân Khúc</span>
              </h2>
              <p className="text-forest-700/80 font-light text-lg leading-relaxed mb-10">
                Chúng tôi thiết kế các gói quà tặng linh hoạt, từ những bộ quà tặng tinh giản đến những set quà tặng xa xỉ, đáp ứng mọi ngân sách và yêu cầu khắt khe nhất của doanh nghiệp.
              </p>
              <div className="flex items-center gap-4 text-forest-900 font-bold">
                <Users size={20} className="text-champagne-dark" />
                <span>Đã phục vụ hơn 200+ doanh nghiệp lớn nhỏ</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {packages.map((pkg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-ivory-100 p-8 rounded-3xl flex justify-between items-center group hover:bg-forest-900 hover:text-white transition-all duration-500"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">{pkg.tier}</span>
                    <h4 className="font-cormorant text-2xl font-bold">{pkg.name}</h4>
                  </div>
                  <ul className="hidden md:block text-xs font-light opacity-60 text-right">
                    {pkg.items.slice(0, 2).map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                    <li>...và nhiều hơn thế</li>
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Hợp đồng kinh tế rõ ràng",
              "Hỗ trợ VAT đầy đủ",
              "Chiết khấu lên đến 20%",
              "Miễn phí lưu kho",
              "Giao hàng đa điểm",
              "Bảo hành đổi trả 1:1",
              "Tư vấn 24/7",
              "Dòng sản phẩm riêng"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-forest-900/5 rounded-2xl">
                <CheckCircle2 size={18} className="text-champagne-dark" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form CTA */}
      <section className="py-32 bg-forest-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold mb-12">Bắt Đầu <span className="italic font-light text-champagne">Hợp Tác</span></h2>
          <p className="text-white/60 font-light text-lg mb-12">
            Hãy để HiAn đồng hành cùng doanh nghiệp bạn trong việc tạo nên những ấn tượng khó quên. Liên hệ với đội ngũ tư vấn B2B của chúng tôi ngay hôm nay.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => openForm("profile")}
              className="bg-champagne-dark text-forest-900 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-champagne transition-all"
            >
              Tải Profile Doanh Nghiệp
            </button>
            <button className="border border-white/20 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
              Gọi Hotline: 0817 130 135
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Inquiry Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-forest-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden z-10"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-8 right-8 p-2 hover:bg-ivory-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-12 md:p-16">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-champagne-dark/20 rounded-2xl text-champagne-dark">
                          {formType === "quote" ? <Briefcase size={24} /> : <FileText size={24} />}
                        </div>
                        <h2 className="font-cormorant text-3xl md:text-4xl font-semibold">
                          {formType === "quote" ? "Yêu Cầu Báo Giá" : "Tải Profile HiAn"}
                        </h2>
                      </div>

                      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                            <Users size={12} /> Tên của bạn
                          </label>
                          <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="Nguyễn Văn A" className="w-full bg-ivory-100 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-champagne-dark outline-none" />
                        </div>
 
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                             <Building size={12} /> Tên công ty
                           </label>
                           <input name="company" value={formData.company} onChange={handleInputChange} required type="text" placeholder="Công ty Highland Heritage" className="w-full bg-ivory-100 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-champagne-dark outline-none" />
                         </div>
 
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                             <Mail size={12} /> Email (Gmail)
                           </label>
                           <input name="email" value={formData.email} onChange={handleInputChange} required type="email" placeholder="example@gmail.com" className="w-full bg-ivory-100 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-champagne-dark outline-none" />
                         </div>
 
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                             <Phone size={12} /> Số điện thoại
                           </label>
                           <input name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" placeholder="0901 234 567" className="w-full bg-ivory-100 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-champagne-dark outline-none" />
                         </div>
 
                         <div className="space-y-2 md:col-span-2">
                           <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                             <MapPin size={12} /> Địa chỉ công ty
                           </label>
                           <input name="address" value={formData.address} onChange={handleInputChange} required type="text" placeholder="Số 123, Đường ABC, Quận X, TP.HCM" className="w-full bg-ivory-100 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-champagne-dark outline-none" />
                         </div>
 
                         <div className="space-y-2 md:col-span-2">
                           <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                             <FileText size={12} /> {formType === "quote" ? "Yêu cầu chi tiết" : "Lĩnh vực hoạt động"}
                           </label>
                           <textarea 
                             name="message"
                             value={formData.message}
                             onChange={handleInputChange}
                             rows={3} 
                             placeholder={formType === "quote" ? "Ví dụ: Cần 50 set quà Premium cho dịp Tết..." : "Ví dụ: Công nghệ, Bất động sản..."}
                             className="w-full bg-ivory-100 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-champagne-dark outline-none resize-none"
                           ></textarea>
                         </div>
 
                         <button 
                           type="submit"
                           disabled={isLoading}
                           className="md:col-span-2 bg-forest-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-forest-800 transition-all shadow-xl flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
                         >
                           {isLoading ? "Đang gửi..." : (formType === "quote" ? "Gửi Yêu Cầu Báo Giá" : "Đăng Ký Nhận Profile")}
                           {!isLoading && <Send size={16} />}
                         </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="font-cormorant text-4xl font-semibold mb-4 text-forest-900">Gửi Thành Công!</h3>
                      <p className="text-forest-700/60 font-light text-lg mb-8">
                        Cảm ơn bạn đã quan tâm đến HiAn. <br />
                        Đội ngũ tư vấn sẽ liên hệ với bạn trong vòng 24h làm việc.
                      </p>
                      <button 
                        onClick={() => setIsFormOpen(false)}
                        className="bg-forest-900 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
                      >
                        Đóng
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-8 text-center text-[10px] text-forest-700/40 uppercase tracking-widest">
                  HiAn cam kết bảo mật thông tin doanh nghiệp của bạn.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
