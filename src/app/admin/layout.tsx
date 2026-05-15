"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Bell,
  Search,
  Menu,
  BarChart3,
  Clock,
  Tag
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user && (session.user as any).role !== "admin") {
      router.push("/account/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading" || (session?.user && (session.user as any).role !== "admin")) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-forest-900/10 border-t-forest-900 rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { label: "Tổng quan", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Sản phẩm", icon: Package, href: "/admin/products" },
    { label: "Đơn hàng", icon: ShoppingCart, href: "/admin/orders" },
    { label: "Khách hàng", icon: Users, href: "/admin/users" },
    { label: "Khuyến mãi", icon: Tag, href: "/admin/promotions" },
    { label: "AI Email Agent", icon: ShieldCheck, href: "/admin/agent" },
    { label: "Phân tích", icon: BarChart3, href: "/admin/analytics" },
    { label: "Audit Logs", icon: Clock, href: "/admin/logs" },
    { label: "Cài đặt", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center">
            <span className="text-white font-serif text-xl font-bold">H</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">HiAn Admin</h1>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Management System</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-forest-900 transition-all font-medium text-sm group"
            >
              <item.icon size={18} className="group-hover:scale-110 transition-transform" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium text-sm group">
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden p-2 text-slate-500">
              <Menu size={24} />
            </button>
            <div className="max-w-md w-full relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm kiếm nhanh..." 
                className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-forest-900/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{session?.user?.name}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
                <img 
                  src={session?.user?.image || "https://ui-avatars.com/api/?name=" + session?.user?.name} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
