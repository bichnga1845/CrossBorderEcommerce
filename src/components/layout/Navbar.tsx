"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X, User as UserIcon, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const { getTotalItems } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Trang Chủ", href: "/" },
    { name: "Sản Phẩm", href: "/shop" },
    { name: "Quà Tặng", href: "/shop?category=Quà Tặng" },
    { name: "Nguồn Gốc", href: "/traceability" },
    { name: "Về Chúng Tôi", href: "/about" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-ivory-100/70 backdrop-blur-xl shadow-[var(--shadow-luxury)] border-b border-forest-900/5 py-4 transition-all duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-forest-900 hover:text-champagne-dark transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links - Left */}
          <div className="hidden lg:flex space-x-8 items-center flex-1">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm font-semibold tracking-widest uppercase transition-colors duration-500 text-forest-900 hover:text-champagne-dark"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-champagne-dark transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href="/" className="relative block h-20 w-40 transition-transform hover:scale-105">
              <Image 
                src="/images/logo-transparent.png" 
                alt="HiAn Logo" 
                fill 
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Icons & Right Links */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm font-semibold tracking-widest uppercase transition-colors duration-500 text-forest-900 hover:text-champagne-dark"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-champagne-dark transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
            <div className="flex items-center space-x-5 pl-4 border-l border-forest-900/10">
              <div className="relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white/90 backdrop-blur rounded-full border border-forest-900/20 shadow-sm overflow-hidden px-3">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm..." 
                      className="w-48 py-2 px-2 text-sm text-forest-900 bg-transparent focus:outline-none"
                      autoFocus
                    />
                    <button type="submit" className="text-forest-900/60 hover:text-forest-900">
                      <Search size={16} />
                    </button>
                    <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-2 text-forest-900/60 hover:text-red-500">
                      <X size={16} />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-forest-900 hover:text-champagne-dark transition-colors"
                    aria-label="Tìm kiếm"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>
              <Link
                href="/account"
                className="text-forest-900 hover:text-champagne-dark transition-colors flex items-center gap-2"
                aria-label="Tài khoản"
              >
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <UserIcon size={20} />
                )}
                {session?.user && <span className="text-xs font-bold hidden xl:block">{session.user.name?.split(' ').pop()}</span>}
              </Link>
              {session?.user && (session.user as any).role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg"
                >
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden xl:block">Admin</span>
                </Link>
              )}
              <Link
                href="/cart"
                className="text-forest-900 hover:text-champagne-dark transition-colors relative"
                aria-label="Giỏ hàng"
              >
                <ShoppingBag size={20} />
                {mounted && getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-champagne-dark text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Right Icons */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-forest-900"
            >
              <Search size={22} />
            </button>
            <Link
              href="/cart"
              className="text-forest-900 relative"
            >
              <ShoppingBag size={24} />
              {mounted && getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-champagne-dark text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden mt-4 pb-2 animate-fade-in-up">
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full border border-forest-900/20 px-4">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..." 
                className="w-full py-3 text-sm text-forest-900 bg-transparent focus:outline-none"
                autoFocus
              />
              <button type="submit" className="text-forest-900">
                <Search size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full top-full left-0 shadow-2xl">
          <div className="px-6 py-4 space-y-1 bg-ivory-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-4 text-sm tracking-widest uppercase font-medium text-forest-900 border-b border-forest-900/10"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/account"
              className="block py-4 text-sm tracking-widest uppercase font-medium text-forest-900"
            >
              Tài Khoản
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
