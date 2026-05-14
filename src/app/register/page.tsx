"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  Zap,
} from "lucide-react";
import { Suspense } from "react";

const registerBenefits = [
  "Tạo tài khoản trong vài giây",
  "Đồng bộ giỏ hàng và đơn hàng",
  "Bảo mật với mật khẩu mã hóa",
];

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // Client-side normalization + validation
    const normEmail = email.trim().toLowerCase();
    const normUsername = username.trim().toLowerCase().replace(/\s+/g, '');

    if (!name.trim() || !normEmail || !password) {
      setError('Vui lòng điền đầy đủ họ tên, email và mật khẩu.');
      setIsLoading(false);
      return;
    }

    if (!normUsername || normUsername.length < 3) {
      setError('Tên đăng nhập tối thiểu 3 ký tự.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      setIsLoading(false);
      return;
    }

    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phoneDigits || phoneDigits.length < 9) {
      setError('Vui lòng nhập số điện thoại hợp lệ.');
      setIsLoading(false);
      return;
    }

    if (!address.trim() || !city.trim() || !district.trim() || !ward.trim()) {
      setError('Vui lòng cung cấp địa chỉ giao hàng đầy đủ.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username: normUsername, email: normEmail, password, phone, address, city, district, ward }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Đã có lỗi xảy ra");
        setIsLoading(false);
      } else {
        router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}&registered=1`);
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(201,169,110,0.18),_transparent_32%),linear-gradient(180deg,_#f7f2e8_0%,_#fdfbf7_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center py-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-forest-900/10 bg-white/90 shadow-[0_20px_80px_rgba(27,41,33,0.12)] backdrop-blur md:grid-cols-2">
          <aside className="relative hidden overflow-hidden bg-champagne-dark p-10 text-forest-900 md:flex md:flex-col md:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.5),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.24),_transparent_28%)]" />
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-forest-900/10 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-forest-900/75">
                <Sparkles className="h-4 w-4 text-forest-900" />
                Create your account
              </div>
              <h1 className="font-cormorant text-5xl font-semibold leading-tight text-forest-900 lg:text-6xl">
                Tạo tài khoản để mua hàng nhanh hơn và an toàn hơn.
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-7 text-forest-900/75">
                Chỉ cần vài thông tin cơ bản là bạn đã có thể lưu giỏ hàng, xem lại đơn hàng và thanh toán liền mạch.
              </p>
            </div>

            <div className="relative z-10 grid gap-3">
              {registerBenefits.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-white/45 px-4 py-3 text-sm text-forest-900/80">
                  <ShieldCheck className="h-4 w-4 text-forest-900" />
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <section className="p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-forest-700">
                  <Zap className="h-3.5 w-3.5 text-champagne-dark" />
                  Bắt đầu ngay hôm nay
                </p>
                <h2 className="font-cormorant text-4xl font-semibold text-forest-900">Đăng ký</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-forest-700/80">
                  Tạo tài khoản mới để đồng bộ dữ liệu mua sắm và mở khóa trải nghiệm thanh toán cá nhân hóa.
                </p>
              </div>
              <div className="hidden rounded-2xl border border-forest-900/10 bg-ivory-100 p-3 text-forest-900 md:block">
                <Star className="h-5 w-5 text-champagne-dark" />
              </div>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-forest-900">Họ và tên</label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-700/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-forest-900/10 bg-ivory-100/70 py-3.5 pl-11 pr-4 text-forest-900 outline-none transition placeholder:text-forest-700/35 focus:border-champagne-dark focus:bg-white"
                    placeholder="VD: Nguyễn Văn A"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-forest-900">Tên đăng nhập</label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-700/40" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => setUsername((u) => u.trim().toLowerCase().replace(/\s+/g, ''))}
                    className="w-full rounded-2xl border border-forest-900/10 bg-ivory-100/70 py-3.5 pl-11 pr-4 text-forest-900 outline-none transition placeholder:text-forest-700/35 focus:border-champagne-dark focus:bg-white"
                    placeholder="Tên đăng nhập (không dấu)"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-forest-900">Số điện thoại</label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9]{9,}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-forest-900/10 bg-ivory-100/70 py-3.5 pl-4 pr-4 text-forest-900 outline-none transition placeholder:text-forest-700/35 focus:border-champagne-dark focus:bg-white"
                    placeholder="Số điện thoại"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-forest-900">Địa chỉ</label>
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-2xl border border-forest-900/10 bg-ivory-100/70 py-3.5 pl-4 pr-4 text-forest-900 outline-none transition placeholder:text-forest-700/35 focus:border-champagne-dark focus:bg-white"
                    placeholder="Địa chỉ chi tiết"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Tỉnh/Thành" required className="border border-forest-900/20 rounded-xl px-4 py-4" />
                <input type="text" name="district" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Quận/Huyện" required className="border border-forest-900/20 rounded-xl px-4 py-4" />
                <input type="text" name="ward" value={ward} onChange={(e) => setWard(e.target.value)} placeholder="Phường/Xã" required className="border border-forest-900/20 rounded-xl px-4 py-4" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-forest-900">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-700/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-forest-900/10 bg-ivory-100/70 py-3.5 pl-11 pr-4 text-forest-900 outline-none transition placeholder:text-forest-700/35 focus:border-champagne-dark focus:bg-white"
                    placeholder="Nhập email của bạn"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-forest-900">Mật khẩu</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-700/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-forest-900/10 bg-ivory-100/70 py-3.5 pl-11 pr-12 text-forest-900 outline-none transition placeholder:text-forest-700/35 focus:border-champagne-dark focus:bg-white"
                    placeholder="Tối thiểu 6 ký tự"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-forest-700/50 transition hover:bg-forest-50 hover:text-forest-900"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-forest-900 px-5 py-4 text-sm font-bold uppercase tracking-[0.28em] text-white shadow-lg shadow-forest-900/20 transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-forest-700">
              Đã có tài khoản?{' '}
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="inline-flex items-center gap-1 font-bold text-forest-900 transition hover:text-champagne-dark"
              >
                Đăng nhập
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-ivory-100 text-forest-900">Đang tải biểu mẫu...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
