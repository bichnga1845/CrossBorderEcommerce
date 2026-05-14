import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-ivory-100">
      {/* Background ambient element */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-champagne/10 blur-[150px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <span className="text-champagne-dark uppercase tracking-[0.3em] text-xs font-bold mb-6 block animate-fade-in-up">
              Tinh Hoa Đại Ngàn
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl text-forest-900 mb-8 leading-[1.1] animate-fade-in-up animation-delay-100 font-medium">
              Premium <br />
              Nông Sản <br />
              <span className="italic font-light text-forest-700">Tây Nguyên</span>
            </h1>
            <p className="text-forest-800/80 text-lg md:text-xl mb-10 font-light animate-fade-in-up animation-delay-200 leading-relaxed max-w-lg">
              Macadamia, mật ong nguyên chất và quà tặng cao cấp dành cho sức khỏe, gia đình và doanh nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up animation-delay-300 w-full sm:w-auto">
              <Link
                href="/shop"
                className="group relative overflow-hidden bg-forest-900 text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-luxury-hover)] text-center"
              >
                <span className="relative z-10">Mua Ngay</span>
                <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
              </Link>
              <Link
                href="/shop/gifts"
                className="bg-transparent border border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-500 text-center hover:shadow-[var(--shadow-luxury)]"
              >
                Khám Phá Quà Tặng
              </Link>
            </div>
          </div>

          {/* Right Images Composition */}
          <div className="relative h-[600px] w-full hidden lg:block animate-reveal">
            <div className="absolute top-0 right-0 w-3/4 h-[90%] rounded-tr-[100px] rounded-bl-[100px] overflow-hidden shadow-[var(--shadow-luxury)] group">
              <Image
                src="/images/hero.png"
                alt="Nông trại Tây Nguyên"
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-1/2 h-[55%] rounded-tl-[60px] rounded-br-[60px] border-[6px] border-ivory-100 overflow-hidden shadow-[var(--shadow-luxury)] group">
              <Image
                src="/images/macadamia.png"
                alt="Macadamia cao cấp"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div className="absolute top-[20%] -left-8 bg-white/80 backdrop-blur-xl p-6 shadow-[var(--shadow-luxury)] rounded-2xl border border-white/40 animate-float">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-champagne/30 rounded-full flex items-center justify-center">
                  <span className="text-forest-900 font-serif font-bold text-xl">100%</span>
                </div>
                <div>
                  <p className="text-forest-900 font-bold text-sm">Hữu Cơ</p>
                  <p className="text-forest-700/70 text-xs">Chứng nhận quốc tế</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
