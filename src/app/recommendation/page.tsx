"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, User, Heart, RefreshCcw, Gift, ChevronRight } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  content: React.ReactNode;
};

export default function RecommendationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Chào bạn, tôi là trợ lý sức khỏe của Highland Heritage. Để tôi có thể đưa ra gợi ý phù hợp nhất, bạn đang tìm kiếm sản phẩm cho mục đích gì?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(1);

  const handleOptionSelect = (option: string, nextStep: number) => {
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: option }]);
    setIsTyping(true);

    // Mock AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setStep(nextStep);

      if (nextStep === 2) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Tôi hiểu rồi. Bạn ưu tiên cải thiện vấn đề nào nhất trong thời gian tới?" 
        }]);
      } else if (nextStep === 3) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: (
            <div className="space-y-4">
              <p>Dựa trên nhu cầu của bạn, đây là bộ sản phẩm tối ưu nhất:</p>
              <div className="bg-white rounded-xl border border-forest-900/10 overflow-hidden shadow-sm flex flex-col">
                <div className="flex p-4 gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg relative overflow-hidden shrink-0">
                    <Image src="/images/product-2.jpg" alt="Sản phẩm" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-forest-900 font-bold mb-1">Hạt Mắc Ca Sấy Lạnh Thượng Hạng</h4>
                    <p className="text-xs text-forest-700/80 mb-2">Giàu Omega-3, tốt cho tim mạch và trí não. Phù hợp sử dụng mỗi sáng.</p>
                    <p className="font-bold text-forest-900 text-sm">350.000 ₫</p>
                  </div>
                </div>
                <div className="bg-forest-50 p-3 flex justify-between items-center border-t border-forest-900/5">
                  <span className="text-xs font-semibold text-forest-900">Chu kỳ sử dụng: 30 ngày</span>
                  <Link href="/shop/mock-id" className="text-xs uppercase tracking-widest font-bold text-forest-900 flex items-center gap-1 hover:text-champagne-dark transition">
                    Xem Chi Tiết <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <p className="text-sm">Bạn có muốn thêm sản phẩm này vào lịch nhắc nhở Refill tự động không?</p>
            </div>
          ) 
        }]);
      } else if (nextStep === 4) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Đã thiết lập! Tôi sẽ nhắc nhở bạn trước khi sản phẩm dự kiến hết 5 ngày." 
        }]);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ivory-100 pt-24 pb-12 flex flex-col items-center">
      
      <div className="max-w-2xl w-full px-4 text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-sm border border-forest-900/10 text-champagne-dark">
          <Sparkles size={28} />
        </div>
        <h1 className="font-serif text-3xl text-forest-900 mb-2">Trợ Lý Gợi Ý Sản Phẩm</h1>
        <p className="text-forest-700/80">Tư vấn cá nhân hóa dựa trên AI và lịch sử của bạn.</p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-forest-900/5 overflow-hidden flex flex-col h-[600px] border border-forest-900/10">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('/images/pattern.png')] bg-fixed bg-opacity-5">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-forest-900 text-white' : 'bg-champagne-light text-forest-900 border border-champagne'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-forest-900 text-white rounded-tr-none' : 'bg-white border border-forest-900/10 text-forest-900 rounded-tl-none shadow-sm'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-champagne-light text-forest-900 border border-champagne flex items-center justify-center shrink-0">
                <Sparkles size={14} />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-forest-900/10 rounded-tl-none shadow-sm flex gap-1 items-center">
                <div className="w-2 h-2 bg-forest-900/30 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-forest-900/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-forest-900/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Options Area */}
        <div className="p-6 bg-ivory-100/50 border-t border-forest-900/10">
          {!isTyping && step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={() => handleOptionSelect("Sử dụng cá nhân", 2)} className="flex items-center gap-3 p-3 bg-white border border-forest-900/20 rounded-xl hover:border-forest-900 transition text-left text-sm text-forest-900 font-medium">
                <Heart size={18} className="text-champagne-dark" /> Sử dụng cá nhân
              </button>
              <button onClick={() => handleOptionSelect("Tìm quà tặng", 2)} className="flex items-center gap-3 p-3 bg-white border border-forest-900/20 rounded-xl hover:border-forest-900 transition text-left text-sm text-forest-900 font-medium">
                <Gift size={18} className="text-champagne-dark" /> Tìm quà tặng
              </button>
              <button onClick={() => handleOptionSelect("Gia hạn sản phẩm cũ (Refill)", 2)} className="flex items-center gap-3 p-3 bg-white border border-forest-900/20 rounded-xl hover:border-forest-900 transition text-left text-sm text-forest-900 font-medium sm:col-span-2">
                <RefreshCcw size={18} className="text-champagne-dark" /> Gia hạn sản phẩm cũ (Refill)
              </button>
            </div>
          )}

          {!isTyping && step === 2 && (
            <div className="flex flex-wrap gap-2">
              {["Hệ tiêu hóa", "Tim mạch", "Ngủ ngon", "Tăng cường năng lượng"].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => handleOptionSelect(opt, 3)} 
                  className="px-4 py-2 bg-white border border-forest-900/20 rounded-full hover:border-forest-900 hover:bg-forest-50 transition text-sm text-forest-900 font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {!isTyping && step === 3 && (
            <div className="flex gap-3">
              <button onClick={() => handleOptionSelect("Có, thiết lập giúp tôi", 4)} className="flex-1 bg-forest-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-forest-800 transition">
                Có, thiết lập giúp tôi
              </button>
              <button onClick={() => handleOptionSelect("Không cần lúc này", 4)} className="flex-1 bg-white border border-forest-900/20 text-forest-900 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition">
                Không cần lúc này
              </button>
            </div>
          )}
          
          {!isTyping && step === 4 && (
            <div className="text-center">
              <Link href="/shop" className="text-sm font-bold text-forest-900 underline hover:text-champagne-dark transition">
                Quay Lại Cửa Hàng
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
