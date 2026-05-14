"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, ChevronRight, Check, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  images: string[];
  tag?: string;
  rating: number;
  reviews: number;
  benefits: string[];
  nutrition: {
    calories: string;
    fat: string;
    protein: string;
    carbs: string;
  };
  category: string;
  batchIds?: string[];
  categoryId?: {
    _id: string;
    category_name: string;
    positioning?: string;
  };
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [mainImageIdx, setMainImageIdx] = useState(0);
  const [isHearted, setIsHearted] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProduct(data.product);
          const categoryName = data.product.categoryId?.category_name || data.product.category;
          fetch(`/api/products?category=${encodeURIComponent(categoryName)}&limit=4`)
            .then((res) => res.json())
            .then((relatedData) => {
              if (relatedData.success) {
                setRelatedProducts(
                  relatedData.products.filter((item: Product) => item._id !== data.product._id)
                );
              }
            });
        }
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
      router.push('/checkout');
    }
  };

  if (!product) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-screen bg-ivory-100">
        <div className="w-16 h-16 border-4 border-forest-900/10 border-t-forest-900 rounded-full animate-spin mb-4"></div>
        <p className="text-forest-900/60 font-medium animate-pulse">Đang tải sản phẩm...</p>
      </div>
    );
  }

  const categoryName = product.categoryId?.category_name || product.category;
  const displayImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const primaryBatchId = product.batchIds && product.batchIds.length > 0 ? product.batchIds[0] : null;

  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-ivory-100 via-white to-ivory-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-forest-700/60 uppercase tracking-widest font-semibold mb-12"
        >
          <Link href="/" className="hover:text-forest-900 transition-colors">Trang Chủ</Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-forest-900 transition-colors">Cửa Hàng</Link>
          <ChevronRight size={14} />
          <span className="text-forest-900 font-bold">{product?.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col-reverse lg:flex-col"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-ivory-100 via-beige to-champagne/5 border border-forest-900/10 shadow-2xl group cursor-zoom-in">
              <Image 
                src={displayImages[mainImageIdx]} 
                alt={product?.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              {product?.tag && (
                <div className="absolute top-4 left-4 z-10 bg-champagne-dark/95 text-forest-900 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-sm">
                  {product.tag}
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {displayImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setMainImageIdx(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden flex-shrink-0 border-3 transition-all duration-300 ${
                    idx === mainImageIdx 
                      ? 'border-champagne-dark shadow-lg' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product?.name} ${idx}`} fill className="object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-cormorant text-5xl lg:text-6xl text-forest-900 font-semibold leading-tight"
                  >
                    {product?.name}
                  </motion.h1>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsHearted(!isHearted)}
                  className={`p-3.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                    isHearted 
                      ? 'bg-red-50 text-red-500 shadow-lg shadow-red-500/20' 
                      : 'bg-white text-forest-900 shadow-lg border border-forest-900/10'
                  }`}
                >
                  <Heart size={24} className={isHearted ? 'fill-current' : ''} />
                </motion.button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-champagne-dark text-champagne-dark" />)}
                </div>
                <span className="text-sm font-bold text-forest-900">{product?.rating}</span>
                <button className="text-sm text-forest-700/60 hover:text-forest-900 cursor-pointer transition-colors underline underline-offset-2">
                  {product?.reviews} đánh giá
                </button>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center px-4 py-2.5 rounded-full bg-champagne/25 text-forest-900 text-xs font-bold uppercase tracking-widest border border-champagne/50">
                  {categoryName}
                </div>
                <div className="h-1.5 w-1.5 bg-champagne-dark rounded-full"></div>
                <span className="text-xs text-forest-700/60 font-medium">Mã: {product?._id?.slice(-8)}</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-10 pb-10 border-b border-forest-900/10">
              <div className="flex items-baseline gap-4">
                <motion.p 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl font-bold text-forest-900"
                >
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price || 0)}
                </motion.p>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                  ✓ Còn Hàng
                </span>
              </div>
              <p className="text-forest-700/80 leading-relaxed font-light text-base mt-6">{product?.desc}</p>
            </div>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 p-8 bg-gradient-to-br from-white via-ivory-50 to-champagne/5 rounded-3xl shadow-lg border border-forest-900/10"
            >
              {/* Quantity Selector */}
              <div className="flex items-center gap-6 mb-8">
                <div className="inline-flex items-center border-2 border-forest-900/20 rounded-full bg-ivory-100 p-2 gap-1">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="w-11 h-11 flex items-center justify-center text-forest-900 rounded-full hover:bg-white transition-colors font-semibold"
                  >
                    <Minus size={18} />
                  </motion.button>
                  <span className="w-14 text-center text-forest-900 font-bold text-lg">{quantity}</span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)} 
                    className="w-11 h-11 flex items-center justify-center text-forest-900 rounded-full hover:bg-white transition-colors font-semibold"
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
                <div className="text-xs font-bold text-green-700 bg-green-100/80 px-4 py-2.5 rounded-full border border-green-300/50">
                  ✓ Còn Hàng
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="group w-full bg-gradient-to-r from-forest-900 to-forest-800 hover:from-forest-800 hover:to-forest-700 text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 shadow-xl shadow-forest-900/30 hover:shadow-2xl hover:shadow-forest-900/40 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Thêm Vào Giỏ Hàng
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="group w-full bg-champagne-dark hover:bg-champagne text-forest-900 py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 border-2 border-champagne-dark/40 hover:border-champagne-dark/60 flex items-center justify-center gap-2"
                >
                  Mua Ngay
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>

            {/* Traceability CTA */}
            <div className="mb-10 bg-gradient-to-r from-forest-900 to-forest-800 text-ivory-100 p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between border border-forest-900/30 shadow-2xl">
              <div className="flex-1">
                <h3 className="font-serif text-2xl mb-3 flex items-center gap-3 font-semibold">
                  <ShieldCheck className="text-champagne-dark flex-shrink-0" size={24} />
                  Minh Bạch Nguồn Gốc
                </h3>
                <p className="text-sm text-ivory-100/85 leading-relaxed">
                  Sản phẩm được theo dõi trên nền tảng số. Quét mã QR trên bao bì để xem chứng nhận, quy trình canh tác và hành trình di chuyển của từng lô hàng.
                </p>
              </div>
              {primaryBatchId ? (
                <Link 
                  href={`/verification/${product._id}/${primaryBatchId}`} 
                  className="shrink-0 px-7 py-3.5 border-2 border-ivory-100/40 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ivory-100 hover:text-forest-900 transition-all duration-300 hover:border-ivory-100 whitespace-nowrap"
                >
                  Xem Chi Tiết
                </Link>
              ) : (
                <span className="shrink-0 px-7 py-3.5 border-2 border-ivory-100/20 rounded-full text-xs font-bold uppercase tracking-widest text-ivory-100/50">
                  Chưa có batch
                </span>
              )}
            </div>

            {/* Value Props */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-12"
            >
              <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-forest-50/80 to-forest-100/40 rounded-2xl border border-forest-900/15 hover:shadow-md transition-all">
                <Truck className="text-forest-900 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm font-bold text-forest-900">Giao Nhanh</p>
                  <p className="text-xs text-forest-700/70">2-4 ngày</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50/80 to-green-100/40 rounded-2xl border border-green-900/15 hover:shadow-md transition-all">
                <ShieldCheck className="text-green-700 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm font-bold text-forest-900">Đảm Bảo</p>
                  <p className="text-xs text-forest-700/70">Đổi trả 7 ngày</p>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div>
              <div className="flex gap-10 border-b-2 border-forest-900/10 mb-8 overflow-x-auto">
                <button onClick={() => setActiveTab("details")} className={`pb-4 text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === "details" ? "text-forest-900 border-b-3 border-champagne-dark -mb-2" : "text-forest-700/50 hover:text-forest-900"}`}>Chi Tiết</button>
                <button onClick={() => setActiveTab("nutrition")} className={`pb-4 text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === "nutrition" ? "text-forest-900 border-b-3 border-champagne-dark -mb-2" : "text-forest-700/50 hover:text-forest-900"}`}>Dinh Dưỡng</button>
                <button onClick={() => setActiveTab("reviews")} className={`pb-4 text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === "reviews" ? "text-forest-900 border-b-3 border-champagne-dark -mb-2" : "text-forest-700/50 hover:text-forest-900"}`}>Đánh Giá ({product.reviews})</button>
              </div>

              {activeTab === "details" && (
                <div className="animate-fade-in-up">
                  <ul className="space-y-3.5">
                    {product.benefits?.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <Check className="text-champagne-dark mt-1 shrink-0" size={20} />
                        <span className="text-forest-700 font-light leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "nutrition" && product.nutrition && (
                <div className="animate-fade-in-up">
                  <div className="bg-gradient-to-br from-white to-ivory-50 p-8 rounded-2xl border border-forest-900/10 shadow-md">
                    <h4 className="font-serif font-bold text-forest-900 mb-6 border-b-2 border-forest-900/10 pb-4 text-lg">Giá trị dinh dưỡng (100g)</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm hover:bg-forest-50/50 p-3 rounded-lg transition-colors">
                        <span className="text-forest-700 font-medium">Năng lượng</span>
                        <span className="font-bold text-forest-900 text-base">{product.nutrition.calories}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-forest-900/5 pt-3 hover:bg-forest-50/50 p-3 rounded-lg transition-colors">
                        <span className="text-forest-700 font-medium">Chất béo tổng</span>
                        <span className="font-bold text-forest-900 text-base">{product.nutrition.fat}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-forest-900/5 pt-3 hover:bg-forest-50/50 p-3 rounded-lg transition-colors">
                        <span className="text-forest-700 font-medium">Carbohydrate</span>
                        <span className="font-bold text-forest-900 text-base">{product.nutrition.carbs}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-forest-900/5 pt-3 hover:bg-forest-50/50 p-3 rounded-lg transition-colors">
                        <span className="text-forest-700 font-medium">Protein</span>
                        <span className="font-bold text-forest-900 text-base">{product.nutrition.protein}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="animate-fade-in-up space-y-5">
                  {/* Mock Reviews */}
                  <div className="bg-white p-6 rounded-2xl border border-forest-900/10 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-forest-900 text-white rounded-full flex items-center justify-center font-serif font-bold text-lg">M</div>
                        <div>
                          <p className="text-sm font-bold text-forest-900">Minh Anh</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-champagne-dark fill-champagne-dark" />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-forest-700/50 font-medium">2 ngày trước</span>
                    </div>
                    <p className="text-forest-700 text-sm font-light leading-relaxed">
                      Sản phẩm đóng gói rất đẹp và sang trọng. Hạt mắc ca to, đều, ăn rất béo và giòn. Sẽ mua thêm để biếu đối tác.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-forest-900/10 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-champagne-dark text-forest-900 rounded-full flex items-center justify-center font-serif font-bold text-lg">H</div>
                        <div>
                          <p className="text-sm font-bold text-forest-900">Hoàng Nam</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-champagne-dark fill-champagne-dark" />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-forest-700/50 font-medium">1 tuần trước</span>
                    </div>
                    <p className="text-forest-700 text-sm font-light leading-relaxed">
                      Giao hàng nhanh, đóng gói cẩn thận. Rất ưng ý với chất lượng nông sản của HiAn.
                    </p>
                  </div>

                  <button className="w-full py-4 border-2 border-forest-900/20 text-forest-900 text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-forest-50 transition-all duration-300 hover:border-forest-900/40">
                    Xem Thêm Đánh Giá
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="font-cormorant text-4xl text-forest-900 font-semibold mb-8">Sản Phẩm Liên Quan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link key={item._id} href={`/shop/${item._id}`} className="group bg-white rounded-3xl overflow-hidden border border-forest-900/10 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    <div className="relative aspect-square bg-gradient-to-br from-ivory-100 to-beige overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-widest text-forest-700/60 mb-2.5 font-bold">{item.categoryId?.category_name || item.category}</p>
                      <h3 className="font-serif text-base text-forest-900 mb-3 line-clamp-2 font-semibold leading-tight">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-forest-900 font-bold text-lg">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                        <Star size={16} className="text-champagne-dark fill-champagne-dark" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
