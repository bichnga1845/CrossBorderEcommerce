"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, QrCode, Users, Settings, Activity } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: Activity },
    { href: "/admin/batches", label: "Batches & QR", icon: QrCode },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/users", label: "Users & Members", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-forest-900 text-ivory-100 flex flex-col">
        <div className="p-6">
          <h2 className="font-serif text-xl">HTA Admin</h2>
          <p className="text-xs text-ivory-100/60 uppercase tracking-widest mt-1">Trust Platform</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-ivory-100/10 text-white' : 'text-ivory-100/70 hover:bg-ivory-100/5 hover:text-white'}`}
              >
                <link.icon size={18} />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
