"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Wallet, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";

// Vietnam provinces, districts, wards data - ACCURATE DATA
const vietnamProvinces = [
  { id: 1, name: "Hà Nội", districts: [
    { id: 1, name: "Ba Đình", wards: ["Phường Phúc Tạ", "Phường Trúc Bạch", "Phường Cống Vị", "Phường Liễu Giai", "Phường Giảng Võ"] },
    { id: 2, name: "Hoàn Kiếm", wards: ["Phường Trang Tiền", "Phường Hàng Bông", "Phường Hàng Buồm", "Phường Cửa Đông", "Phường Lý Thái Tổ"] },
    { id: 3, name: "Hai Bà Trưng", wards: ["Phường Máy Tơ", "Phường Thanh Nhàn", "Phường Quỳnh Mai", "Phường Quỳnh Lôi"] },
    { id: 4, name: "Đống Đa", wards: ["Phường Văn Chương", "Phường Trung Liệt", "Phường Láng Hạ", "Phường Quỳnh Lôi"] },
    { id: 5, name: "Tây Hồ", wards: ["Phường Tây Hồ", "Phường Quảng An", "Phường Phú Thượng"] }
  ]},
  { id: 2, name: "Hồ Chí Minh", districts: [
    { id: 1, name: "Quận 1", wards: ["Phường Bến Nghé", "Phường Tân Định", "Phường Cầu Ông Lãnh", "Phường Nguyễn Huệ", "Phường Đa Kao"] },
    { id: 2, name: "Quận 2", wards: ["Phường An Phú", "Phường Bình An", "Phường Cát Lái", "Phường Thạnh Mỹ Lợi"] },
    { id: 3, name: "Quận 3", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5"] },
    { id: 4, name: "Quận 4", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4"] },
    { id: 5, name: "Quận 5", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4"] },
    { id: 6, name: "Quận 6", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4"] },
    { id: 7, name: "Quận 7", wards: ["Phường 1", "Phường 2", "Phường 3"] },
    { id: 8, name: "Quận 8", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4"] },
    { id: 9, name: "Quận 9", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4"] },
    { id: 10, name: "Quận 10", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4"] },
    { id: 11, name: "Quận 11", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4"] },
    { id: 12, name: "Quận 12", wards: ["Phường 1", "Phường 2", "Phường 3", "Phường 4"] }
  ]},
  { id: 3, name: "Đà Nẵng", districts: [
    { id: 1, name: "Quận Hải Châu", wards: ["Phường Thạch Thang", "Phường Bình Hiên", "Phường Hải Châu I", "Phường Hải Châu II"] },
    { id: 2, name: "Quận Thanh Khê", wards: ["Phường Tân Chính", "Phường Chính Gián", "Phường Thạch Gián", "Phường Hòa Cường Bắc"] },
    { id: 3, name: "Quận Sơn Trà", wards: ["Phường Mỹ Ân", "Phường Nại Hiên Đông", "Phường Thọ Quang"] }
  ]},
  { id: 4, name: "Hải Phòng", districts: [
    { id: 1, name: "Quận Hồng Bàng", wards: ["Phường Quán Toan", "Phường Cát Dài", "Phường Chợ Dương"] },
    { id: 2, name: "Quận Ngô Quyền", wards: ["Phường Hạ Lâm", "Phường Máy Chai", "Phường Vĩnh Niệm"] },
    { id: 3, name: "Quận Hải An", wards: ["Phường Tích Trung", "Phường Thạch Bàn"] }
  ]},
  { id: 5, name: "Cần Thơ", districts: [
    { id: 1, name: "Quận Ninh Kiều", wards: ["Phường Xuân Khánh", "Phường An Khánh", "Phường Cái Khế"] },
    { id: 2, name: "Quận Bình Thủy", wards: ["Phường Bình Thủy", "Phường Long Hòa", "Phường An Thới"] },
    { id: 3, name: "Quận Ô Môn", wards: ["Phường Ô Môn A", "Phường Ô Môn B"] }
  ]},
  { id: 6, name: "Bắc Ninh", districts: [
    { id: 1, name: "Thành phố Bắc Ninh", wards: ["Phường Macau", "Phường Võ Cường", "Phường Ninh Xương"] }
  ]},
  { id: 7, name: "Thái Nguyên", districts: [
    { id: 1, name: "Thành phố Thái Nguyên", wards: ["Phường Tích Lương", "Phường Tân Thịnh", "Phường Tiền Phố"] }
  ]},
  { id: 8, name: "Vĩnh Phúc", districts: [
    { id: 1, name: "Thành phố Vĩnh Yên", wards: ["Phường Hòa Sơn", "Phường Tứ Xuyên", "Phường Mạc Hồng Thái"] }
  ]},
  { id: 9, name: "Bắc Giang", districts: [
    { id: 1, name: "Thành phố Bắc Giang", wards: ["Phường Suối Hanh", "Phường Yên Dương", "Phường Quốc Tiến"] }
  ]},
  { id: 10, name: "Hải Dương", districts: [
    { id: 1, name: "Thành phố Hải Dương", wards: ["Phường Cẩm Xuyên", "Phường Kinh Dương", "Phường Bình Hàng"] }
  ]},
  { id: 11, name: "Quảng Ninh", districts: [
    { id: 1, name: "Thành phố Hạ Long", wards: ["Phường Hạ Long", "Phường Bãi Cháy", "Phường Hà Tu"] }
  ]},
  { id: 12, name: "Huế", districts: [
    { id: 1, name: "Thành phố Huế", wards: ["Phường Phú Hòa", "Phường Vũ Nho", "Phường Thủy Xuân"] }
  ]},
  { id: 13, name: "Nha Trang", districts: [
    { id: 1, name: "Thành phố Nha Trang", wards: ["Phường Vĩnh Điều", "Phường Vĩnh Hải", "Phường Xương Huân"] }
  ]},
];

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("momo");

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    phone: "",
    newsletter: false,
  });

  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?callbackUrl=${encodeURIComponent("/checkout")}`);
    } else if (session?.user) {
      const u = session.user as any;
      setFormData(prev => ({
        ...prev,
        email: prev.email || u.email || "",
        name: prev.name || u.name || "",
        phone: prev.phone || u.phone || "",
        address: prev.address || u.address || "",
        city: prev.city || u.city || "",
        district: prev.district || u.district || "",
        ward: prev.ward || u.ward || ""
      }));

      // Trigger cascading dropdowns if data exists
      if (u.city) {
        const province = vietnamProvinces.find(p => p.name === u.city);
        if (province) {
          setDistricts(province.districts);
          if (u.district) {
            const dist = province.districts.find(d => d.name === u.district);
            if (dist) {
              setWards(dist.wards.map((w: string, idx: number) => ({ id: idx, name: w })));
            }
          }
        }
      }
    }
  }, [status, session, router]);

  // Handle city change - load districts
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setFormData(prev => ({ ...prev, city: cityName, district: "", ward: "" }));
    setWards([]);

    const province = vietnamProvinces.find(p => p.name === cityName);
    if (province) {
      setDistricts(province.districts);
    } else {
      setDistricts([]);
    }
  };

  // Handle district change - load wards
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtName = e.target.value;
    setFormData(prev => ({ ...prev, district: districtName, ward: "" }));

    const province = vietnamProvinces.find(p => p.name === formData.city);
    const district = province?.districts.find(d => d.name === districtName);
    if (district) {
      setWards(district.wards.map((w: string, idx: number) => ({ id: idx, name: w })));
    } else {
      setWards([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target as any;
    const checked = (target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsLoading(true);

    const fullName = String(formData.name || '').trim();
    const nameParts = fullName.split(/\s+/).filter(Boolean);
    const lastName = nameParts.pop() || fullName || 'Khách hàng';
    const firstName = nameParts.join(' ') || fullName || 'Khách hàng';

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            ...formData,
            firstName,
            lastName,
          },
          items: items,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
          return;
        }

        clearCart();
        setTimeout(() => {
          router.push(`/checkout/success?orderId=${data.orderId}`);
        }, 600);
      } else {
        alert(data.message || "Có lỗi xảy ra khi đặt hàng.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Lỗi kết nối. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Tránh lỗi Hydration và đợi Session loading
  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-100">
        <div className="w-8 h-8 border-4 border-forest-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory-100 flex flex-col items-center justify-center p-4">
        <h1 className="font-serif text-4xl text-forest-900 mb-6 font-bold">Giỏ hàng trống</h1>
        <p className="text-forest-700/80 mb-8">Bạn chưa chọn sản phẩm nào để thanh toán.</p>
        <Link href="/shop" className="bg-forest-900 text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-forest-800 transition-colors">
          Quay Lại Cửa Hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col lg:flex-row pt-24">
      
      {/* Left Column: Form */}
      <div className="w-full lg:w-[55%] xl:w-[60%] pt-8 pb-24 px-4 sm:px-8 lg:px-20 bg-white">
        <div className="max-w-2xl">
          <div className="mb-10">
            <Link href="/" className="relative block h-14 w-28 mb-6">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" priority />
            </Link>
            <div className="flex items-center gap-2 text-sm text-forest-700/60 font-medium uppercase tracking-widest">
              <Link href="/cart" className="hover:text-forest-900 transition-colors">Giỏ Hàng</Link>
              <span className="text-forest-900/30">/</span>
              <span className="text-forest-900 font-semibold">Thanh Toán</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact Info */}
            <section>
              <h2 className="font-serif text-2xl text-forest-900 mb-6 font-semibold">Thông tin liên hệ</h2>
              <input 
                type="email" name="email" value={formData.email} onChange={handleInputChange} 
                placeholder="Email của bạn"
                required
                className="w-full bg-white border border-forest-900/15 rounded-lg px-4 py-3 text-forest-900 placeholder-forest-700/40 focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900/20 transition-all" 
              />
              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" name="newsletter" id="newsletter" checked={formData.newsletter} onChange={handleInputChange} className="accent-forest-900 cursor-pointer w-4 h-4" />
                <label htmlFor="newsletter" className="text-sm text-forest-700 cursor-pointer">Đăng ký nhận email khuyến mãi và cập nhật sản phẩm mới</label>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="border-t border-forest-900/10 pt-10">
              <h2 className="font-serif text-2xl text-forest-900 mb-6 font-semibold">Địa chỉ giao hàng</h2>
              <div className="space-y-4">
                {/* Full Name */}
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Họ và tên" 
                  required 
                  className="w-full bg-white border border-forest-900/15 rounded-lg px-4 py-3 text-forest-900 placeholder-forest-700/40 focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900/20 transition-all" 
                />

                {/* Phone */}
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="Số điện thoại" 
                  inputMode="tel"
                  required 
                  className="w-full bg-white border border-forest-900/15 rounded-lg px-4 py-3 text-forest-900 placeholder-forest-700/40 focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900/20 transition-all" 
                />

                {/* City/Province Dropdown */}
                <div className="relative">
                  <select 
                    name="city" 
                    value={formData.city} 
                    onChange={handleCityChange} 
                    required 
                    className="w-full appearance-none bg-white border border-forest-900/15 rounded-lg px-4 py-3 text-forest-900 focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900/20 transition-all"
                  >
                    <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                    {vietnamProvinces.map(province => (
                      <option key={province.id} value={province.name}>{province.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-900/40 pointer-events-none" size={18} />
                </div>

                {/* District Dropdown */}
                <div className="relative">
                  <select 
                    name="district" 
                    value={formData.district} 
                    onChange={handleDistrictChange} 
                    required 
                    disabled={!formData.city}
                    className="w-full appearance-none bg-white border border-forest-900/15 rounded-lg px-4 py-3 text-forest-900 focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900/20 transition-all disabled:bg-forest-50/50 disabled:text-forest-700/40 disabled:cursor-not-allowed"
                  >
                    <option value="">-- Chọn Quận/Huyện --</option>
                    {districts.map(district => (
                      <option key={district.id} value={district.name}>{district.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-900/40 pointer-events-none" size={18} />
                </div>

                {/* Ward Dropdown */}
                <div className="relative">
                  <select 
                    name="ward" 
                    value={formData.ward} 
                    onChange={handleInputChange} 
                    required 
                    disabled={!formData.district}
                    className="w-full appearance-none bg-white border border-forest-900/15 rounded-lg px-4 py-3 text-forest-900 focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900/20 transition-all disabled:bg-forest-50/50 disabled:text-forest-700/40 disabled:cursor-not-allowed"
                  >
                    <option value="">-- Chọn Phường/Xã --</option>
                    {wards.map(ward => (
                      <option key={ward.id} value={ward.name}>{ward.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-900/40 pointer-events-none" size={18} />
                </div>

                {/* Address Detail */}
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  placeholder="Địa chỉ chi tiết (Số nhà, đường, ngõ,...)" 
                  required 
                  className="w-full bg-white border border-forest-900/15 rounded-lg px-4 py-3 text-forest-900 placeholder-forest-700/40 focus:outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900/20 transition-all" 
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="border-t border-forest-900/10 pt-10">
              <h2 className="font-serif text-2xl text-forest-900 mb-6 font-semibold">Phương thức thanh toán</h2>
              <label className="flex items-center gap-4 p-5 rounded-lg border-2 border-forest-900 bg-forest-50 cursor-pointer transition-all">
                <input 
                  type="radio" 
                  name="payment" 
                  value="momo" 
                  checked={paymentMethod === "momo"} 
                  onChange={() => setPaymentMethod("momo")} 
                  className="accent-forest-900 w-4 h-4" 
                />
                <div className="flex-grow">
                  <span className="block font-semibold text-forest-900">Ví MoMo</span>
                  <span className="block text-xs text-forest-700/60">Thanh toán trực tuyến an toàn</span>
                </div>
                <Wallet className="text-forest-900" size={22} />
              </label>
            </section>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-forest-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-forest-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <ShieldCheck size={22} /> 
              {isLoading ? "Đang xử lý..." : "Đặt hàng ngay"}
            </button>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-[45%] xl:w-[40%] pt-8 pb-24 px-4 sm:px-8 lg:px-12 bg-ivory-100 flex flex-col">
        <div className="flex-grow">
          <h2 className="font-serif text-2xl text-forest-900 mb-8 font-semibold">Tóm tắt đơn hàng</h2>
          <div className="space-y-5 mb-8">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-start pb-5 border-b border-forest-900/10">
                <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white border border-forest-900/10 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <span className="absolute -top-2 -right-2 bg-forest-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{item.quantity}</span>
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-forest-900 line-clamp-2">{item.name}</p>
                  <p className="text-sm text-forest-700/60 mt-1">{formatPrice(item.price)} x {item.quantity}</p>
                </div>
                <div className="text-sm font-bold text-forest-900 whitespace-nowrap">{formatPrice(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-white rounded-lg p-6 space-y-4 border border-forest-900/10">
          <div className="flex justify-between text-forest-700">
            <span>Tạm tính</span>
            <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="flex justify-between text-forest-700">
            <span>Vận chuyển</span>
            <span className="font-semibold text-green-600">Miễn phí</span>
          </div>
          <div className="border-t border-forest-900/10 pt-4 flex justify-between text-xl font-bold text-forest-900">
            <span>Tổng cộng</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
        </div>
      </div>
    </div>
  );
}