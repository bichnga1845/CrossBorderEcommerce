import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
                alt="Nông trại HiAn"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-3 block">Câu Chuyện Của Chúng Tôi</span>
            <h1 className="font-cormorant text-5xl text-forest-900 font-semibold mb-6">Mang Tinh Hoa Đại Ngàn Đến Bàn Ăn</h1>
            <p className="text-forest-700/80 mb-6 leading-relaxed">
              HiAn ra đời với sứ mệnh tôn vinh và nâng tầm giá trị nông sản Việt, đặc biệt là những báu vật thiên nhiên từ vùng đất Tây Nguyên hùng vĩ. Chúng tôi tin rằng mỗi hạt mắc ca, mỗi giọt mật ong không chỉ là thực phẩm, mà là sự chắt chiu của đất trời.
            </p>
            <p className="text-forest-700/80 mb-8 leading-relaxed">
              Từ những người nông dân tâm huyết đến quy trình chế biến hiện đại chuẩn quốc tế, HiAn cam kết mang đến những sản phẩm an toàn, thuần khiết và giàu giá trị dinh dưỡng nhất cho gia đình bạn.
            </p>
            <Link href="/shop" className="inline-block bg-forest-900 text-white px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-forest-800 transition-colors">
              Mua Sắm Ngay
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-forest-900/5">
            <div className="w-16 h-16 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🌱</div>
            <h3 className="font-serif text-xl text-forest-900 font-bold mb-3">Thuần Khiết</h3>
            <p className="text-sm text-forest-700/70">100% tự nhiên, không chất bảo quản, giữ trọn hương vị nguyên bản.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-forest-900/5">
            <div className="w-16 h-16 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🤝</div>
            <h3 className="font-serif text-xl text-forest-900 font-bold mb-3">Công Bằng</h3>
            <p className="text-sm text-forest-700/70">Hợp tác bền vững với người nông dân, đảm bảo thu nhập và sinh kế.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-forest-900/5">
            <div className="w-16 h-16 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">♻️</div>
            <h3 className="font-serif text-xl text-forest-900 font-bold mb-3">Bền Vững</h3>
            <p className="text-sm text-forest-700/70">Bảo vệ môi trường thông qua bao bì tái chế và canh tác sinh thái.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
