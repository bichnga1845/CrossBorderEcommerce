import Image from "next/image";
import Link from "next/link";

export default function GiftBoxes() {
  return (
    <section className="py-24 bg-forest-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 relative z-10 order-2 lg:order-1">
            <span className="text-champagne uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
              Bộ Sưu Tập Độc Quyền
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.2] font-semibold">
              Nghệ Thuật <br />
              <span className="text-champagne-dark italic font-light">Tặng Quà</span>
            </h2>
            <p className="text-ivory-100/80 text-lg mb-10 max-w-lg leading-relaxed font-light">
              Nâng tầm đẳng cấp với hộp quà Tết sang trọng từ Aura. Sự kết hợp hoàn hảo giữa nông sản cao cấp, hộp gỗ chế tác tinh xảo và dải lụa lấp lánh, thay lời chúc thịnh vượng đến đối tác và người thân.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop/gifts"
                className="inline-block bg-champagne-dark hover:bg-champagne text-forest-900 px-8 py-4 uppercase tracking-widest text-xs font-bold transition-colors text-center"
              >
                Khám Phá Ngay
              </Link>
              <Link
                href="/contact"
                className="inline-block border border-champagne-dark text-champagne-dark hover:bg-champagne-dark hover:text-forest-900 px-8 py-4 uppercase tracking-widest text-xs font-bold transition-colors text-center"
              >
                Đơn Hàng Doanh Nghiệp
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 w-full relative order-1 lg:order-2">
            <div className="aspect-square relative md:max-w-md lg:max-w-full mx-auto">
              <div className="absolute inset-0 bg-champagne-dark/20 rounded-full blur-3xl transform -translate-x-10 translate-y-10"></div>
              <div className="relative h-full w-full rounded-t-[150px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-champagne-dark/20">
                <Image
                  src="/images/tet_box.png"
                  alt="Hộp Quà Tết Cao Cấp"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
