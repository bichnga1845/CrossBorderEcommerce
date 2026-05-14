"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ShoppingBag, Heart, Star, SlidersHorizontal, ChevronDown, SearchX } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  tag?: string;
  rating: number;
  reviews: number;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const q = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "Tất Cả";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tất Cả"]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { addItem } = useCartStore();

  useEffect(() => {
    setIsLoading(true);
    let url = `/api/products?`;
    if (q) url += `q=${encodeURIComponent(q)}&`;
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (sort !== "default") url += `sort=${sort}&`;
    if (minPrice) url += `minPrice=${minPrice}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}&`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [q, category, sort, minPrice, maxPrice]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.categories)) {
          setCategories(["Tất Cả", ...data.categories.map((item: { category_name: string }) => item.category_name)]);
        }
      })
      .catch(() => {
        setCategories(["Tất Cả", "Hạt Mắc Ca", "Mật Ong", "Trái Cây Sấy", "Quà Tặng"]);
      });
  }, []);

  useEffect(() => {
    if (initialCategory !== category && !q) {
      setCategory(initialCategory);
    }
  }, [initialCategory, q]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    console.log('🛒 Adding to cart:', product.name, product._id);
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    console.log('✅ Item added to cart');
  };

  const handlePriceChange = (min: string, max: string) => {
    if (minPrice === min && maxPrice === max) {
      setMinPrice("");
      setMaxPrice("");
    } else {
      setMinPrice(min);
      setMaxPrice(max);
    }
  };

  const isPriceSelected = (min: string, max: string) => minPrice === min && maxPrice === max;

  return (
    <div className="pt-32 pb-24 bg-ivory-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-forest-900/10 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-cormorant text-5xl text-forest-900 mb-4 font-semibold">
              {q ? `Kết Quả Tìm Kiếm: "${q}"` : category === "Tất Cả" ? "Tất Cả Sản Phẩm" : category}
            </h1>
            <p className="text-forest-700/80 font-light">Khám phá bộ sưu tập nông sản cao cấp từ thiên nhiên.</p>
          </motion.div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm text-forest-900 font-semibold border border-forest-900/20 px-4 py-2 rounded-full hover:bg-forest-50 transition-colors">
                Sắp xếp <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-forest-900/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                <button onClick={() => setSort("default")} className={`w-full text-left px-4 py-3 text-sm hover:bg-forest-50 transition-colors ${sort === 'default' ? 'font-bold text-forest-900' : 'text-forest-700'}`}>Mặc định</button>
                <button onClick={() => setSort("price-asc")} className={`w-full text-left px-4 py-3 text-sm hover:bg-forest-50 transition-colors ${sort === 'price-asc' ? 'font-bold text-forest-900' : 'text-forest-700'}`}>Giá: Thấp đến Cao</button>
                <button onClick={() => setSort("price-desc")} className={`w-full text-left px-4 py-3 text-sm hover:bg-forest-50 transition-colors ${sort === 'price-desc' ? 'font-bold text-forest-900' : 'text-forest-700'}`}>Giá: Cao đến Thấp</button>
                <button onClick={() => setSort("name-asc")} className={`w-full text-left px-4 py-3 text-sm hover:bg-forest-50 transition-colors ${sort === 'name-asc' ? 'font-bold text-forest-900' : 'text-forest-700'}`}>Tên: A-Z</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-32">
              <h3 className="font-serif text-lg text-forest-900 mb-6 font-semibold">Danh Mục</h3>
              <ul className="space-y-4">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => {
                        setCategory(cat);
                        if (q) router.push('/shop'); // Clear search when clicking category
                      }} 
                      className={`text-sm ${category === cat ? "text-forest-900 font-semibold" : "text-forest-700/70 hover:text-champagne-dark"} transition-colors flex items-center gap-3`}
                    >
                      <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${category === cat ? "bg-champagne-dark" : "bg-transparent"}`}></span>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="font-serif text-lg text-forest-900 mb-6 font-semibold mt-12">Mức Giá</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm text-forest-700/80 cursor-pointer group">
                  <input type="checkbox" checked={isPriceSelected("0", "200000")} onChange={() => handlePriceChange("0", "200000")} className="w-4 h-4 accent-forest-900 cursor-pointer" /> 
                  <span className="group-hover:text-forest-900 transition-colors">Dưới 200.000đ</span>
                </label>
                <label className="flex items-center gap-3 text-sm text-forest-700/80 cursor-pointer group">
                  <input type="checkbox" checked={isPriceSelected("200000", "500000")} onChange={() => handlePriceChange("200000", "500000")} className="w-4 h-4 accent-forest-900 cursor-pointer" /> 
                  <span className="group-hover:text-forest-900 transition-colors">200.000đ - 500.000đ</span>
                </label>
                <label className="flex items-center gap-3 text-sm text-forest-700/80 cursor-pointer group">
                  <input type="checkbox" checked={isPriceSelected("500000", "")} onChange={() => handlePriceChange("500000", "")} className="w-4 h-4 accent-forest-900 cursor-pointer" /> 
                  <span className="group-hover:text-forest-900 transition-colors">Trên 500.000đ</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-4 border-forest-900 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-forest-900/10"
              >
                <SearchX size={48} className="text-forest-900/30 mb-4" />
                <h3 className="text-xl font-cormorant text-forest-900 font-semibold mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-forest-700/70 text-sm">Vui lòng thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.</p>
                <button onClick={() => {setCategory("Tất Cả"); setMinPrice(""); setMaxPrice(""); router.push('/shop');}} className="mt-6 px-6 py-2 bg-forest-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-forest-800 transition-colors">
                  Xóa bộ lọc
                </button>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      key={product._id} 
                      className="group flex flex-col bg-white p-5 rounded-3xl shadow-lg border border-forest-900/8 hover:shadow-2xl transition-all duration-500 transform-gpu overflow-hidden"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-ivory-100 to-beige mb-5 rounded-2xl transition-all duration-500 group-hover:rounded-xl">
                        {product.tag && (
                          <div className="absolute top-4 left-4 z-10 bg-champagne-dark text-forest-900 px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-full shadow-lg">
                            {product.tag}
                          </div>
                        )}
                        <button className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center text-forest-900 hover:text-red-500 hover:scale-110 transition-all shadow-md opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 duration-300">
                          <Heart size={18} />
                        </button>
                        <Link href={`/shop/${product._id}`} className="block w-full h-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                        <button 
                          onClick={(e) => handleAddToCart(e, product)}
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-forest-900 to-forest-900/90 text-white py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center space-x-2 hover:from-forest-800 hover:to-forest-800/90"
                        >
                          <ShoppingBag size={16} />
                          <span className="uppercase tracking-widest text-[12px] font-bold">Thêm Vào Giỏ</span>
                        </button>
                      </div>
                      <div className="flex-grow flex flex-col px-1">
                        <div className="flex items-center space-x-1.5 mb-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className="text-champagne-dark fill-champagne-dark" />
                            ))}
                          </div>
                          <span className="text-xs text-forest-900 font-semibold">{product.rating}</span>
                          <span className="text-xs text-forest-700/50 ml-auto">({product.reviews})</span>
                        </div>
                        <h3 className="font-serif text-base text-forest-900 mb-2 leading-tight font-semibold line-clamp-2">
                          <Link href={`/shop/${product._id}`} className="hover:text-champagne-dark transition-colors">{product.name}</Link>
                        </h3>
                        <p className="text-forest-700/70 text-xs font-light mb-4 flex-grow line-clamp-2">{product.desc}</p>
                        <div className="flex justify-between items-center border-t border-forest-900/10 pt-4 mt-auto">
                          <p className="text-forest-900 font-bold text-lg">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                          <Link href={`/shop/${product._id}`} className="text-champagne-dark hover:text-champagne text-xs font-semibold uppercase tracking-wider transition-colors">Xem →</Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
            
            {/* Pagination */}
            {products.length > 0 && (
              <div className="flex justify-center mt-16 gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-forest-900 text-white bg-forest-900 font-semibold text-sm shadow-md">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-forest-900/20 text-forest-900 hover:bg-forest-50 transition-colors font-semibold text-sm">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-forest-900/20 text-forest-900 hover:bg-forest-50 transition-colors font-semibold text-sm">3</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center bg-ivory-100"><div className="w-8 h-8 border-4 border-forest-900 border-t-transparent rounded-full animate-spin"></div></div>}>
      <ShopContent />
    </Suspense>
  );
}
