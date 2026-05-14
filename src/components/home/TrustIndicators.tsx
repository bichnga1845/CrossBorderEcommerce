import { Leaf, Truck, ShieldCheck, Award } from "lucide-react";

const indicators = [
  {
    icon: <Leaf className="w-6 h-6 text-champagne-dark" />,
    title: "100% Không Hóa Chất",
    description: "Canh tác hữu cơ, an toàn tuyệt đối.",
  },
  {
    icon: <Award className="w-6 h-6 text-champagne-dark" />,
    title: "Nguồn Gốc Rõ Ràng",
    description: "Truy xuất trực tiếp từ nông trại.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-champagne-dark" />,
    title: "Bao Bì Cao Cấp",
    description: "Thiết kế sang trọng, phù hợp làm quà.",
  },
  {
    icon: <Truck className="w-6 h-6 text-champagne-dark" />,
    title: "Giao Hàng Toàn Quốc",
    description: "Miễn phí vận chuyển đơn từ 1.000.000đ.",
  },
];

export default function TrustIndicators() {
  return (
    <section className="bg-forest-900 py-20 relative overflow-hidden border-y border-forest-800">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-champagne-dark/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-forest-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-default">
              
              {/* Icon Container with glowing effect */}
              <div className="mb-6 relative flex items-center justify-center w-24 h-24 rounded-full bg-forest-800 border-2 border-champagne-dark/40 group-hover:bg-forest-700 group-hover:border-champagne-dark transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] shadow-xl z-20">
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  {indicator.icon}
                </div>
                {/* Inner animating ring on hover */}
                <div className="absolute inset-2 rounded-full border border-champagne/0 group-hover:border-champagne/60 scale-75 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
              </div>

              {/* Text content with higher contrast */}
              <h3 className="text-white font-bold tracking-[0.15em] uppercase text-base mb-3 group-hover:text-champagne transition-colors duration-300 drop-shadow-md">
                {indicator.title}
              </h3>
              <p className="text-white text-sm max-w-[240px] font-medium leading-relaxed drop-shadow-sm">
                {indicator.description}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
