"use client";

import { motion } from "framer-motion";
import { RotateCcw, ShieldCheck, AlertCircle, CheckCircle2, MessageSquare, Phone } from "lucide-react";

export default function ReturnsPage() {
  const conditions = [
    {
      title: "Thời gian đổi trả",
      desc: "Quý khách có thể thực hiện đổi trả trong vòng 07 ngày kể từ ngày nhận hàng thành công.",
      icon: <RotateCcw size={24} />
    },
    {
      title: "Điều kiện sản phẩm",
      desc: "Sản phẩm còn nguyên tem mác, chưa qua sử dụng và bao bì không bị hư hỏng do tác động vật lý.",
      icon: <ShieldCheck size={24} />
    },
    {
      title: "Lý do chấp nhận",
      desc: "Sản phẩm bị lỗi từ nhà sản xuất, hư hỏng trong quá trình vận chuyển hoặc giao sai mẫu mã.",
      icon: <CheckCircle2 size={24} />
    }
  ];

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
            Trust & Commitment
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-cormorant text-5xl md:text-7xl font-semibold mb-8"
          >
            Chính Sách <span className="italic font-light text-champagne">Đổi Trả</span>
          </motion.h1>
          <p className="text-white/60 font-light text-lg max-w-2xl mx-auto">
            Tại HiAn, sự hài lòng của quý khách là ưu tiên hàng đầu. Chúng tôi cam kết bảo vệ quyền lợi người tiêu dùng thông qua chính sách đổi trả minh bạch.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-16">
        {/* Conditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {conditions.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-ivory-100 rounded-2xl flex items-center justify-center text-champagne-dark mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-forest-700/60 font-light text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Policy */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-ivory-100/30 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="font-cormorant text-4xl font-semibold mb-12">Quy trình đổi trả 4 bước</h2>
            
            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-900 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-3">Thông báo cho HiAn</h4>
                  <p className="text-forest-700/70 font-light leading-relaxed">
                    Liên hệ hotline <span className="font-bold">0817 130 135</span> hoặc nhắn tin qua Zalo/Facebook kèm hình ảnh/video sản phẩm lỗi trong vòng 24h kể từ khi nhận hàng.
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-900 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-3">Kiểm tra & Xác nhận</h4>
                  <p className="text-forest-700/70 font-light leading-relaxed">
                    Đội ngũ chăm sóc khách hàng sẽ kiểm tra thông tin và phản hồi kết quả xác nhận đổi trả trong vòng 4h làm việc.
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-900 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="text-xl font-bold mb-3">Thu hồi sản phẩm</h4>
                  <p className="text-forest-700/70 font-light leading-relaxed">
                    HiAn sẽ điều phối nhân viên giao vận đến tận nơi để thu hồi sản phẩm lỗi (Quý khách không mất phí vận chuyển chiều này).
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-900 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="text-xl font-bold mb-3">Hoàn tiền hoặc đổi mới</h4>
                  <p className="text-forest-700/70 font-light leading-relaxed">
                    Sau khi nhận được hàng thu hồi, HiAn sẽ gửi sản phẩm mới hoặc thực hiện hoàn tiền (qua tài khoản ngân hàng) trong vòng 2-3 ngày làm việc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 flex items-start gap-6">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <h5 className="font-bold text-amber-900 mb-2">Lưu ý quan trọng</h5>
            <p className="text-amber-800/70 text-sm leading-relaxed">
              Các mặt hàng thực phẩm (Mật ong, Hạt mắc ca, Trái cây sấy) đã mở nắp hoặc bóc seal bảo mật sẽ không được áp dụng chính sách đổi trả vì lý do an toàn thực phẩm, trừ trường hợp phát hiện dấu hiệu hư hỏng/biến chất ngay tại thời điểm mở hộp.
            </p>
          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-24 text-center">
          <p className="text-forest-700/40 uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Need assistance?</p>
          <div className="flex justify-center gap-8">
            <a href="https://zalo.me/0817130135" className="text-forest-900 hover:text-champagne-dark transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
              <MessageSquare size={16} /> Nhắn tin ngay
            </a>
            <a href="tel:0817130135" className="text-forest-900 hover:text-champagne-dark transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
              <Phone size={16} /> Hỗ trợ 24/7
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
