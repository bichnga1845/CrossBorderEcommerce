"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (data.success) {
          setIsSubscribed(true);
        }
      } catch (error) {
        console.error('Newsletter error:', error);
      }
    }
  };

  return (
    <footer className="bg-forest-900 text-ivory pt-20 pb-10 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="relative block h-24 w-48 mb-6">
              <Image 
                src="/images/logo-transparent.png" 
                alt="HiAn Logo" 
                fill 
                className="object-contain"
              />
            </Link>
            <p className="text-forest-100/70 text-sm leading-relaxed mb-8 max-w-xs font-light">
              Nông sản Tây Nguyên cao cấp. Mang trọn hương vị nguyên bản và thuần khiết nhất từ thiên nhiên đến gia đình bạn.
            </p>
            <div className="flex space-x-6 text-champagne text-xs uppercase tracking-[0.2em] font-semibold">
              <a href="https://zalo.me/0817130135" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ZALO</a>
              <a href="https://www.facebook.com/profile.php?id=61574965676068" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">FACEBOOK</a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase mb-6 text-champagne-dark">Sản Phẩm</h3>
            <ul className="space-y-4 text-sm text-forest-100/70 font-light">
              <li><Link href="/shop?category=Hạt Mắc Ca" className="hover:text-white transition-colors">Hạt Mắc Ca</Link></li>
              <li><Link href="/shop?category=Mật Ong" className="hover:text-white transition-colors">Mật Ong Rừng</Link></li>
              <li><Link href="/shop?category=Trái Cây Sấy" className="hover:text-white transition-colors">Trái Cây Sấy</Link></li>
              <li><Link href="/shop?category=Quà Tặng" className="hover:text-white transition-colors">Quà Tặng Doanh Nghiệp</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase mb-6 text-champagne-dark">Hỗ Trợ</h3>
            <ul className="space-y-4 text-sm text-forest-100/70 font-light">
              <li><Link href="/faq" className="hover:text-white transition-colors">Câu Hỏi Thường Gặp</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Chính Sách Giao Hàng</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Chính Sách Đổi Trả</Link></li>
              <li><Link href="/traceability" className="hover:text-white transition-colors">Truy Xuất Nguồn Gốc</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase mb-6 text-champagne-dark">Liên Hệ</h3>
            <ul className="space-y-4 text-sm text-forest-100/70 font-light">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-champagne-dark mt-0.5" />
                <span>EaHLeo, ĐăkLăk</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-champagne-dark" />
                <span>0817130135</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-champagne-dark" />
                <span>giftofhian185@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Bottom */}
        <div className="pt-10 border-t border-forest-800 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="w-full lg:w-1/2">
            <h3 className="text-white font-serif text-xl mb-2">Đăng ký nhận ưu đãi</h3>
            <p className="text-forest-100/60 text-sm mb-4 font-light">Nhận thông tin về sản phẩm mới và các chương trình khuyến mãi đặc biệt.</p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex max-w-md border border-forest-700 focus-within:border-champagne-dark transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn..."
                  className="bg-transparent text-white px-4 py-3 text-sm w-full focus:outline-none placeholder:text-forest-500 font-light"
                  required
                />
                <button
                  type="submit"
                  className="bg-forest-800 hover:bg-champagne-dark text-white px-6 py-3 text-xs font-semibold transition-colors uppercase tracking-widest whitespace-nowrap"
                >
                  Đăng Ký
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 text-champagne-dark py-3">
                <CheckCircle2 size={20} />
                <span className="text-sm font-semibold uppercase tracking-widest">Đã đăng ký thành công!</span>
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-auto flex flex-col items-start lg:items-end text-xs text-forest-100/40 font-light gap-2">
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Bảo mật</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Điều khoản</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} HiAn. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
