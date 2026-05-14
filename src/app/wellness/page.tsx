"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WellnessPage() {
  const articles = [
    {
      title: "Nghệ thuật Sống Chậm với Cà Phê Mật Ong",
      excerpt: "Bắt đầu ngày mới bằng một ly nước ấm pha mật ong hoa cà phê giúp thanh lọc cơ thể và khởi tạo năng lượng bền bỉ.",
      image: "/images/product-3.jpg",
      category: "Dinh dưỡng"
    },
    {
      title: "Lợi ích bất ngờ của hạt Mắc Ca sấy lạnh",
      excerpt: "Công nghệ sấy lạnh giúp giữ nguyên 99% hàm lượng Omega-3, cực kỳ tốt cho sự phát triển của trí não và bảo vệ tim mạch.",
      image: "/images/product-2.jpg",
      category: "Kiến thức"
    },
    {
      title: "Chu kỳ phục hồi tự nhiên của cơ thể",
      excerpt: "Lắng nghe cơ thể để biết khi nào cần nghỉ ngơi và cách sử dụng các sản phẩm thiên nhiên để hỗ trợ phục hồi.",
      image: "/images/hero-2.jpg",
      category: "Lối sống"
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-100 text-forest-900 pt-32 pb-24">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <header className="text-center mb-24">
          <h1 className="font-cormorant text-5xl md:text-6xl font-semibold mb-6">Wellness & Lifestyle</h1>
          <p className="text-forest-700/80 max-w-2xl mx-auto text-lg">
            Khám phá những kiến thức chăm sóc sức khỏe, lối sống tĩnh tại và cách tận hưởng trọn vẹn những tặng phẩm từ thiên nhiên.
          </p>
        </header>

        {/* Featured Article */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 group cursor-pointer">
          <Image src="/images/hero-1.jpg" alt="Featured" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
            <span className="text-champagne-dark text-xs uppercase tracking-widest font-bold mb-4 block">Góc Chuyên Gia</span>
            <h2 className="font-cormorant text-3xl md:text-5xl text-white mb-4">Minh bạch nguồn gốc: Xu hướng tất yếu của sức khỏe tương lai</h2>
            <div className="flex items-center gap-2 text-white text-sm font-semibold hover:text-champagne-dark transition">
              Đọc Ngay <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article, idx) => (
            <article key={idx} className="group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-xs uppercase tracking-widest text-forest-700/50 font-bold mb-3 block">{article.category}</span>
              <h3 className="font-cormorant text-2xl font-semibold mb-3 group-hover:text-champagne-dark transition-colors">{article.title}</h3>
              <p className="text-forest-700/80 text-sm leading-relaxed mb-4">{article.excerpt}</p>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border-b border-forest-900 pb-1 group-hover:border-champagne-dark group-hover:text-champagne-dark transition-colors">
                Khám Phá
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}
