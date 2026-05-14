"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageSquare, Phone } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      category: "Sản phẩm",
      questions: [
        {
          q: "Mắc ca của HiAn có nguồn gốc từ đâu?",
          a: "Tất cả các sản phẩm Mắc ca của HiAn đều được thu hoạch trực tiếp từ các vườn liên kết tại vùng đất Ea H'Leo, Đắk Lắk - nơi có khí hậu và thổ nhưỡng lý tưởng nhất cho loại hạt này."
        },
        {
          q: "Làm thế nào để truy xuất nguồn gốc sản phẩm?",
          a: "Mỗi bao bì sản phẩm HiAn đều có mã QR riêng biệt. Bạn chỉ cần dùng điện thoại quét mã này để xem toàn bộ thông tin về ngày thu hoạch, quy trình chế biến và chứng nhận kiểm định."
        },
        {
          q: "Sản phẩm của HiAn có sử dụng chất bảo quản không?",
          a: "Chúng tôi cam kết 100% không sử dụng chất bảo quản hóa học. Các sản phẩm được bảo quản bằng công nghệ sấy lạnh hiện đại và đóng gói hút chân không để giữ trọn hương vị và dinh dưỡng tự nhiên."
        }
      ]
    },
    {
      category: "Đơn hàng & Giao hàng",
      questions: [
        {
          q: "Thời gian giao hàng mất bao lâu?",
          a: "Thông thường, đơn hàng nội thành TP.HCM và Hà Nội sẽ được giao trong vòng 24h-48h. Các tỉnh thành khác mất khoảng 3-5 ngày làm việc."
        },
        {
          q: "HiAn có chính sách chiết khấu cho khách hàng thân thiết không?",
          a: "Có, chúng tôi có chương trình HiAn Club dành cho khách hàng thường xuyên với các mức chiết khấu từ 5-15% và các món quà tri ân đặc biệt vào ngày sinh nhật."
        }
      ]
    },
    {
      category: "Quà tặng doanh nghiệp",
      questions: [
        {
          q: "Số lượng tối thiểu cho đơn hàng quà tặng doanh nghiệp là bao nhiêu?",
          a: "Chúng tôi tiếp nhận các đơn hàng doanh nghiệp từ 10 set quà trở lên để đảm bảo quy trình cá nhân hóa và chiết khấu tốt nhất cho quý đối tác."
        },
        {
          q: "HiAn có thể in logo doanh nghiệp lên hộp quà không?",
          a: "Chắc chắn rồi. Chúng tôi cung cấp dịch vụ khắc laser logo lên hộp gỗ hoặc in ép kim trên hộp giấy cao cấp theo yêu cầu của doanh nghiệp."
        }
      ]
    }
  ];

  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-forest-900 pb-32">
      {/* Hero Section */}
      <section className="bg-forest-900 text-white pt-48 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-champagne-dark uppercase tracking-[0.4em] text-xs font-bold mb-6 block"
          >
            Giải Đáp Thắc Mắc
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-cormorant text-5xl md:text-7xl font-semibold mb-8"
          >
            Câu Hỏi <span className="italic font-light text-champagne">Thường Gặp</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-1 bg-champagne-dark mx-auto"
          ></motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-6 -mt-16">
        <div className="space-y-12">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-champagne-dark mb-8 flex items-center gap-3">
                <HelpCircle size={16} /> {group.category}
              </h2>
              <div className="space-y-4">
                {group.questions.map((faq, faqIdx) => {
                  const id = `${groupIdx}-${faqIdx}`;
                  const isOpen = activeIndex === id;
                  return (
                    <div key={faqIdx} className="border-b border-forest-900/5 last:border-0 pb-4 last:pb-0">
                      <button 
                        onClick={() => toggleFAQ(id)}
                        className="w-full flex items-center justify-between py-4 text-left group"
                      >
                        <span className={`font-cormorant text-xl md:text-2xl transition-colors ${isOpen ? 'text-champagne-dark' : 'text-forest-900 group-hover:text-champagne-dark'}`}>
                          {faq.q}
                        </span>
                        <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-champagne-dark text-white' : 'bg-ivory-100 text-forest-900'}`}>
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="py-4 text-forest-700/70 font-light leading-relaxed text-base md:text-lg">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-20 text-center bg-forest-900 text-white p-12 md:p-16 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-dark/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h3 className="font-cormorant text-3xl md:text-4xl font-semibold mb-6">Vẫn còn thắc mắc?</h3>
          <p className="text-white/60 font-light mb-10 max-w-xl mx-auto">
            Đội ngũ HiAn luôn sẵn sàng lắng nghe và hỗ trợ bạn mọi lúc. Đừng ngần ngại liên hệ với chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://zalo.me/0817130135" className="bg-champagne-dark text-forest-900 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all flex items-center justify-center gap-2">
              <MessageSquare size={14} /> Trò chuyện Zalo
            </a>
            <a href="tel:0817130135" className="border border-white/20 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Phone size={14} /> Gọi 0817 130 135
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
