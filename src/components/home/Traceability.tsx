"use client";

import { Search, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Traceability() {
  const [batchId, setBatchId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchId.trim()) {
      // In a real app, you might parse the batchId to extract productId or query the backend.
      // Here we use a mock productId and the entered batchId.
      router.push(`/verification/PRD-MOCK/${encodeURIComponent(batchId.trim())}`);
    }
  };

  return (
    <section className="py-24 bg-charcoal-900 text-white relative overflow-hidden">
      {/* Background subtle texture/gradient */}
      <div className="absolute inset-0 bg-forest-900/20"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-champagne-dark/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Info & Search */}
          <div className="lg:w-1/2">
            <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-4 block flex items-center gap-2">
              <span className="w-8 h-px bg-champagne-dark"></span> Minh Bạch & An Toàn
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-semibold">
              Truy Xuất Nguồn Gốc
            </h2>
            <p className="text-ivory-100/70 text-lg mb-10 font-light max-w-md">
              Nhập mã lô sản phẩm (Batch ID) để theo dõi hành trình từ nông trại xanh đến tay bạn, cùng các chứng nhận chất lượng quốc tế.
            </p>

            <form onSubmit={handleSearch} className="bg-charcoal-800/40 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-md transition-all duration-500 hover:border-champagne/30 group">
              <label className="block text-xs uppercase tracking-widest text-champagne mb-3 font-semibold">
                Nhập Mã Sản Phẩm
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input 
                    type="text" 
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    placeholder="VD: MACA-2026-05" 
                    className="w-full bg-charcoal-900/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-champagne-dark transition-colors font-mono text-sm"
                  />
                </div>
                <button type="submit" className="bg-champagne-dark hover:bg-champagne text-charcoal-900 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 uppercase tracking-wide whitespace-nowrap group-hover:shadow-[var(--shadow-glow)]">
                  Tra Cứu
                </button>
              </div>
            </form>
          </div>

          {/* Right: Futuristic Timeline UI */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-gradient-to-b from-white/10 via-white/5 to-transparent p-[1px] rounded-[2rem] shadow-[var(--shadow-luxury)] hover:shadow-[0_0_40px_rgba(212,180,131,0.15)] transition-shadow duration-700">
              <div className="bg-charcoal-900/60 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-champagne/20 rounded-full blur-[80px]"></div>
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-white/50 text-xs font-mono mb-1">BATCH ID</p>
                    <p className="font-mono text-champagne-dark text-lg font-bold tracking-wider">MACA-2026-05A</p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span className="text-green-500 text-xs font-semibold">Đạt Chuẩn OCOP 5*</span>
                  </div>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-gradient-to-b before:from-champagne-dark before:via-white/10 before:to-transparent">
                  {/* Step 1 */}
                  <div className="relative flex gap-6 items-start group/step">
                    <div className="w-6 h-6 rounded-full bg-champagne-dark flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(212,180,131,0.6)] animate-pulse transition-all duration-500 group-hover/step:scale-125">
                      <div className="w-2 h-2 rounded-full bg-charcoal-900"></div>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Thu hoạch & Phân loại</p>
                      <div className="flex items-center gap-4 text-xs text-white/50 font-light">
                        <span className="flex items-center gap-1"><MapPin size={12}/> Nông trại Bảo Lâm</span>
                        <span className="flex items-center gap-1"><Calendar size={12}/> 15/04/2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex gap-6 items-start opacity-70 hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-full bg-charcoal-900 border-2 border-white/20 flex items-center justify-center shrink-0 z-10">
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Sấy lạnh công nghệ cao</p>
                      <div className="flex items-center gap-4 text-xs text-white/50 font-light">
                        <span className="flex items-center gap-1"><MapPin size={12}/> Nhà máy chế biến Di Linh</span>
                        <span className="flex items-center gap-1"><Calendar size={12}/> 18/04/2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex gap-6 items-start opacity-40 hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-full bg-charcoal-900 border-2 border-white/20 flex items-center justify-center shrink-0 z-10">
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Kiểm định & Đóng gói</p>
                      <div className="flex items-center gap-4 text-xs text-white/50 font-light">
                        <span className="flex items-center gap-1"><MapPin size={12}/> Trung tâm kiểm định chất lượng</span>
                        <span className="flex items-center gap-1"><Calendar size={12}/> 22/04/2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
