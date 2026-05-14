"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Chất lượng hạt mắc ca thật sự khác biệt. Hạt to, giòn rụm, vị thơm béo tự nhiên. Bao bì sang trọng rất hợp làm quà tặng đối tác.",
    author: "Nguyễn Minh Tuấn",
    role: "Giám Đốc Kinh Doanh",
    rating: 5,
  },
  {
    quote: "Mật ong rừng Aura có vị ngọt thanh, thơm dịu nhẹ mùi hoa rừng. Tôi dùng mỗi sáng pha nước ấm thấy sức khỏe cải thiện rõ rệt.",
    author: "Trần Mai Phương",
    role: "Khách Hàng Thân Thiết",
    rating: 5,
  },
  {
    quote: "Rất ấn tượng với set quà Tết của Aura. Thiết kế hộp gỗ tinh xảo, nông sản bên trong đều là loại tuyển chọn 1. Sẽ tiếp tục ủng hộ.",
    author: "Lê Hoàng Phúc",
    role: "Khách Hàng Doanh Nghiệp",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-beige-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-cormorant text-4xl text-forest-900 mb-4 font-semibold">Khách Hàng Đánh Giá</h2>
          <p className="text-forest-700/80">Trải nghiệm thực tế từ những khách hàng đã tin dùng sản phẩm của Aura.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden min-h-[350px] md:min-h-[250px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out bg-white p-10 md:p-12 rounded-2xl shadow-xl border border-forest-900/5 ${
                  index === currentIndex ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-12 z-0"
                }`}
              >
                <div className="flex gap-1 mb-6 text-champagne-dark">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-champagne-dark" />
                  ))}
                </div>
                <p className="font-serif text-xl md:text-2xl text-forest-900 mb-8 leading-relaxed font-light italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center text-forest-900 font-serif font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-forest-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-forest-700/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-forest-900/20 text-forest-900 hover:bg-forest-900 hover:text-white transition-colors bg-white shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-2 px-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-forest-900 w-6" : "bg-forest-900/20 w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full border border-forest-900/20 text-forest-900 hover:bg-forest-900 hover:text-white transition-colors bg-white shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
