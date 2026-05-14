import Image from "next/image";
import { Camera } from "lucide-react";

const images = [
  { src: "/images/hero.png", alt: "Nông trại Tây Nguyên", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/macadamia.png", alt: "Macadamia", span: "col-span-1 row-span-1" },
  { src: "/images/honey.png", alt: "Mật ong", span: "col-span-1 row-span-1" },
  { src: "/images/dried_fruits.png", alt: "Trái cây sấy", span: "col-span-1 row-span-1" },
  { src: "/images/tet_box.png", alt: "Hộp quà", span: "col-span-1 row-span-1" },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="mb-6 md:mb-0">
            <span className="text-champagne-dark uppercase tracking-widest text-xs font-bold mb-3 block">
              HIAN FARM
            </span>
            <h2 className="font-cormorant text-4xl text-forest-900 font-semibold">
              Phong Cách Sống Xanh
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 border border-forest-900 text-forest-900 px-6 py-3 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-forest-900 hover:text-white transition-colors"
          >
            <Camera size={16} /> Theo Dõi Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          {images.map((img, idx) => (
            <div key={idx} className={`relative overflow-hidden group rounded-2xl ${img.span}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
