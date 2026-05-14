"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CategoryItem = {
  category_name: string;
  positioning?: string;
};

const categoryPresentationMap: Record<string, { title: string; image: string; height: string }> = {
  "Hạt Mắc Ca": { title: "Mắc Ca Nguyên Bản", image: "/images/macadamia.png", height: "h-[450px] lg:h-[650px]" },
  "Mật Ong": { title: "Mật Ong Rừng", image: "/images/honey.png", height: "h-[400px] lg:h-[315px]" },
  "Trái Cây Sấy": { title: "Trái Cây Sấy Dẻo", image: "/images/dried_fruits.png", height: "h-[400px] lg:h-[315px]" },
  "Quà Tặng": { title: "Quà Tặng Cao Cấp", image: "/images/tet_box.png", height: "h-[400px] lg:h-[315px]" },
};

export default function Categories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch(() => {
        setCategories([
          { category_name: "Hạt Mắc Ca", positioning: "1" },
          { category_name: "Mật Ong", positioning: "2" },
          { category_name: "Trái Cây Sấy", positioning: "3" },
          { category_name: "Quà Tặng", positioning: "4" },
        ]);
      });
  }, []);

  const visibleCategories = [...categories]
    .sort((left, right) => Number(left.positioning || 999) - Number(right.positioning || 999))
    .slice(0, 3)
    .map((category) => {
      const presentation = categoryPresentationMap[category.category_name] || {
        title: category.category_name,
        image: "/images/tet_box.png",
        height: "h-[400px] lg:h-[315px]",
      };

      const slugMap: Record<string, string> = {
        "Hạt Mắc Ca": "macadamia",
        "Mật Ong": "honey",
        "Trái Cây Sấy": "dried-fruits",
      };

      const slug = slugMap[category.category_name] || "shop";
      const link = slug === "shop" 
        ? `/shop?category=${encodeURIComponent(category.category_name)}`
        : `/collections/${slug}`;

      return {
        ...presentation,
        link,
      };
    });

  return (
    <section className="py-24 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-4 block">
            Bộ Sưu Tập
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-forest-900 mb-6 font-semibold">
            Khám Phá Hương Vị
          </h2>
          <div className="w-16 h-0.5 bg-champagne-dark mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Macadamia - Tall Left */}
          <Link
            href={visibleCategories[0]?.link || "/shop"}
            className={`group relative overflow-hidden block rounded-2xl shadow-xl ${visibleCategories[0]?.height || "h-[450px] lg:h-[650px]"}`}
          >
            <Image
              src={visibleCategories[0]?.image || "/images/macadamia.png"}
              alt={visibleCategories[0]?.title || "Danh mục"}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full flex justify-between items-end">
              <div>
                <h3 className="text-white font-cormorant text-4xl mb-3 font-medium tracking-wide">{visibleCategories[0]?.title || "Danh Mục"}</h3>
                <span className="text-champagne text-xs tracking-widest uppercase font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                  Khám Phá <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>

          {/* Right Column Stacked */}
          <div className="flex flex-col gap-6">
            {visibleCategories.slice(1).map((category, index) => (
              <Link
                key={category.link}
                href={category.link}
                className={`group relative overflow-hidden block rounded-2xl shadow-xl ${category.height}`}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                  <div>
                    <h3 className="text-white font-cormorant text-3xl mb-2 font-medium tracking-wide">{category.title}</h3>
                    <span className="text-champagne text-xs tracking-widest uppercase font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                      Khám Phá <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
