import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function TraceabilityPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-ivory-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-5xl text-forest-900 font-semibold mb-6">Truy Xuất Nguồn Gốc</h1>
          <p className="text-forest-700/80 max-w-2xl mx-auto">
            Tại HiAn, minh bạch là nền tảng của sự tin cậy. Mỗi sản phẩm bạn cầm trên tay đều mang trong mình một câu chuyện từ những vùng trồng nguyên liệu đạt chuẩn tại Tây Nguyên.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-forest-900/10">
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-forest-900 mb-6 font-semibold border-b border-forest-900/10 pb-4">Quy Trình Kiểm Soát</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="flex gap-4">
                <CheckCircle2 className="text-champagne-dark shrink-0" />
                <div>
                  <h3 className="font-bold text-forest-900 mb-2">Canh tác hữu cơ</h3>
                  <p className="text-sm text-forest-700/80">Không sử dụng hóa chất độc hại, tôn trọng chu trình tự nhiên của đất và cây trồng.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-champagne-dark shrink-0" />
                <div>
                  <h3 className="font-bold text-forest-900 mb-2">Thu hoạch tuyển chọn</h3>
                  <p className="text-sm text-forest-700/80">Chỉ thu hoạch những nông sản đạt độ chín hoàn hảo nhất, đảm bảo hương vị và dinh dưỡng.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-champagne-dark shrink-0" />
                <div>
                  <h3 className="font-bold text-forest-900 mb-2">Chế biến khép kín</h3>
                  <p className="text-sm text-forest-700/80">Nhà máy đạt tiêu chuẩn ISO, lưu giữ tối đa giá trị nguyên bản.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-champagne-dark shrink-0" />
                <div>
                  <h3 className="font-bold text-forest-900 mb-2">Mã QR truy xuất</h3>
                  <p className="text-sm text-forest-700/80">Mỗi lô hàng đều có mã QR giúp bạn xem trực tiếp chứng nhận và nhật ký nông hộ.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/shop" className="inline-block bg-forest-900 text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-forest-800 transition-colors">
              Khám Phá Sản Phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
