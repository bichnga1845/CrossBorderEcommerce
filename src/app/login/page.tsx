"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
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
  Zap,
} from "lucide-react";

const authHighlights = [
  "Lưu giỏ hàng theo tài khoản",
  "Quay lại đúng trang thanh toán",
  "Đồng bộ đơn hàng và lịch sử mua",
];

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.267 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.967 3.038l5.657-5.657C34.075 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.979 12 24 12c3.059 0 5.842 1.154 7.967 3.038l5.657-5.657C34.075 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.161 0 9.877-1.977 13.409-5.188l-6.196-5.238C29.257 35.091 26.77 36 24 36c-5.246 0-9.618-3.317-11.281-7.946l-6.522 5.025C9.493 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.009 2.905-2.953 5.249-5.684 6.574l.002-.001 6.196 5.238C35.977 38.927 40 34 40 24c0-1.341-.138-2.651-.389-3.917z" />
    </svg>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";
  const pageError = searchParams.get("error");
  const registered = searchParams.get("registered") === "1";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = useMemo(() => {
    const errorMap: Record<string, string> = {
      AccessDenied: "Bạn không có quyền truy cập trang này.",
      OAuthAccountNotLinked: "Tài khoản Google này chưa được liên kết.",
      default: "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.",
    };

    return errorMap[pageError || ""] || errorMap.default;
  }, [pageError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const id = identifier.trim().toLowerCase();
      const res = await signIn("credentials", {
        redirect: false,
        identifier: id,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setError(
          res.error === "CredentialsSignin"
            ? "Email hoặc mật khẩu không đúng."
            : res.error
        );
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (authError) {
      setError("Không thể đăng nhập lúc này. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(201,169,110,0.18),_transparent_32%),linear-gradient(180deg,_#f7f2e8_0%,_#fdfbf7_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center py-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-forest-900/10 bg-white/90 shadow-[0_20px_80px_rgba(27,41,33,0.12)] backdrop-blur md:grid-cols-2">
          <aside className="relative hidden overflow-hidden bg-forest-900 p-10 text-white md:flex md:flex-col md:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(201,169,110,0.18),_transparent_28%)]" />
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                <Sparkles className="h-4 w-4 text-champagne-dark" />
                HiAn Secure Access
              </div>
              <h1 className="font-cormorant text-5xl font-semibold leading-tight text-white lg:text-6xl">
                Đăng nhập để tiếp tục hành trình mua sắm cao cấp.
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/75">
                Tài khoản của bạn giúp lưu giỏ hàng, theo dõi đơn hàng và quay lại đúng bước thanh toán ngay sau khi xác thực.
              </p>
            </div>

            <div className="relative z-10 grid gap-3">
              {authHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/85">
                  <ShieldCheck className="h-4 w-4 text-champagne-dark" />
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
                  Tài khoản HiAn
                </p>
                <h2 className="font-cormorant text-4xl font-semibold text-forest-900">Đăng nhập</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-forest-700/80">
                  Nhập thông tin để đồng bộ giỏ hàng, đơn hàng và lịch sử mua của bạn.
                </p>
              </div>
              <div className="hidden rounded-2xl border border-forest-900/10 bg-ivory-100 p-3 text-forest-900 md:block">
                <Star className="h-5 w-5 text-champagne-dark" />
              </div>
            </div>

            {registered && !error && !pageError && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Tạo tài khoản thành công. Bạn có thể đăng nhập ngay bây giờ.
              </div>
            )}

            {(pageError || error) && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error || errorMessage}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-forest-900/10 bg-white px-4 py-3.5 text-sm font-semibold text-forest-900 transition hover:-translate-y-0.5 hover:border-champagne-dark hover:shadow-md"
              >
                <GoogleMark />
                <span>Tiếp tục với Google</span>
              </button>
            </div>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-forest-900/10" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-forest-700/50">Hoặc dùng email</span>
              <div className="h-px flex-1 bg-forest-900/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-forest-900">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-700/40" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
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
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
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

              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="flex items-center gap-2 text-sm text-forest-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-forest-900/20 text-forest-900 focus:ring-forest-900" />
                  Ghi nhớ đăng nhập
                </label>
                <Link href="#" className="text-sm font-semibold text-champagne-dark transition hover:text-forest-900">
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-forest-900 px-5 py-4 text-sm font-bold uppercase tracking-[0.28em] text-white shadow-lg shadow-forest-900/20 transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập ngay"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-forest-700">
              Chưa có tài khoản?{' '}
              <Link
                href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="inline-flex items-center gap-1 font-bold text-forest-900 transition hover:text-champagne-dark"
              >
                Đăng ký ngay
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-ivory-100 text-forest-900">Đang tải biểu mẫu...</div>}>
        <LoginContent />
    </Suspense>
  );
}
