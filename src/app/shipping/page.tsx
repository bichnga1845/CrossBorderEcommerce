"use client";

import { motion } from "framer-motion";
import { Truck, Globe, Clock, ShieldCheck, MapPin, Package } from "lucide-react";

export default function ShippingPage() {
  const shippingSteps = [
    {
      title: "Xác Nhận Đơn Hàng",
      desc: "Hệ thống tự động gửi email/tin nhắn xác nhận ngay sau khi bạn đặt hàng thành công.",
      icon: <ShieldCheck size={24} />
    },
    {
      title: "Chuẩn Bị & Đóng Gói",
      desc: "Sản phẩm được kiểm tra chất lượng và đóng gói thủ công tỉ mỉ trong vòng 12h.",
      icon: <Package size={24} />
    },
    {
      title: "Vận Chuyển",
      desc: "Đối tác vận chuyển uy tín sẽ tiếp nhận và chuyển đơn hàng đến tay bạn.",
      icon: <Truck size={24} />
    }
  ];

  const rates = [
    { region: "Nội thành TP.HCM & Hà Nội", fee: "Đồng giá 25.000 ₫", time: "1 - 2 ngày làm việc" },
    { region: "Các tỉnh thành khác", fee: "Đồng giá 35.000 ₫", time: "3 - 5 ngày làm việc" },
    { region: "Đơn hàng trên 1.000.000 ₫", fee: "Miễn phí vận chuyển", time: "Toàn quốc" }
  ];

  return (
    <div className="min-h-screen bg-ivory-100 text-forest-900 pb-32">
      {/* Hero Header */}
      <section className="bg-forest-900 text-white pt-48 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Truck className="absolute -bottom-20 -right-20 text-[30rem] rotate-[-15deg]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-champagne-dark uppercase tracking-[0.4em] text-xs font-bold mb-6 block"
          >
            Logistics & Delivery
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-cormorant text-5xl md:text-7xl font-semibold mb-8"
          >
            Chính Sách <span className="italic font-light text-champagne">Giao Hàng</span>
          </motion.h1>
          <p className="text-white/60 font-light text-lg max-w-2xl mx-auto">
            Chúng tôi hiểu rằng mỗi đơn hàng là một món quà ý nghĩa, vì vậy HiAn luôn nỗ lực để món quà đó đến tay bạn một cách nhanh chóng và hoàn hảo nhất.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
        {/* Shipping Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {shippingSteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-ivory-100 rounded-2xl flex items-center justify-center text-champagne-dark mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-forest-700/60 font-light text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Shipping Rates Table */}
        <section className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-forest-900 text-white rounded-xl flex items-center justify-center">
              <Clock size={20} />
            </div>
            <h2 className="font-cormorant text-3xl md:text-4xl font-semibold">Cước phí & Thời gian</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-forest-900/5">
                  <th className="py-6 text-xs uppercase tracking-widest font-bold opacity-40">Khu vực</th>
                  <th className="py-6 text-xs uppercase tracking-widest font-bold opacity-40">Cước phí</th>
                  <th className="py-6 text-xs uppercase tracking-widest font-bold opacity-40">Dự kiến</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-900/5">
                {rates.map((rate, i) => (
                  <tr key={i} className="group hover:bg-ivory-100/50 transition-colors">
                    <td className="py-8 font-medium flex items-center gap-3">
                      <MapPin size={16} className="text-champagne-dark" />
                      {rate.region}
                    </td>
                    <td className="py-8 text-forest-700/70">{rate.fee}</td>
                    <td className="py-8 text-forest-700/70">{rate.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="font-cormorant text-3xl font-semibold">Kiểm tra hàng khi nhận</h4>
            <p className="text-forest-700/70 font-light leading-relaxed">
              HiAn khuyến khích quý khách hàng đồng kiểm (mở gói hàng kiểm tra) cùng nhân viên giao hàng ngay khi nhận. Nếu phát hiện sản phẩm bị móp méo, vỡ hoặc không đúng chủng loại, quý khách vui lòng từ chối nhận và liên hệ ngay với chúng tôi.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-cormorant text-3xl font-semibold">Hỗ trợ giao hỏa tốc</h4>
            <p className="text-forest-700/70 font-light leading-relaxed">
              Riêng tại khu vực TP.HCM, HiAn hỗ trợ giao hàng hỏa tốc trong vòng 2h-4h qua các ứng dụng Ahamove/Grab. Cước phí sẽ được tính theo bảng giá của đơn vị vận chuyển tại thời điểm đặt hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
