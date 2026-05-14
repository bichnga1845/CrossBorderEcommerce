"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Package, User, LogOut, Settings } from "lucide-react";

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: any[];
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account/dashboard");
    } else if (status === "authenticated") {
      router.replace("/account/dashboard");
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders", error);
      setIsLoading(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return <div className="min-h-screen flex items-center justify-center bg-ivory-100"><div className="w-8 h-8 border-4 border-forest-900 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getStatusBadge = (orderStatus: string) => {
    const statusMap: Record<string, { label: string, color: string }> = {
      'pending': { label: 'Đang xử lý', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      'processing': { label: 'Đang chuẩn bị hàng', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      'shipped': { label: 'Đang giao hàng', color: 'bg-purple-100 text-purple-800 border-purple-200' },
      'delivered': { label: 'Đã giao thành công', color: 'bg-green-100 text-green-800 border-green-200' },
      'cancelled': { label: 'Đã hủy', color: 'bg-red-100 text-red-800 border-red-200' },
    };
    
    const info = statusMap[orderStatus] || { label: orderStatus, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${info.color}`}>
        {info.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-forest-900/10 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-forest-900/10">
                {session?.user?.image ? (
                  <img src={session.user.image} alt={session.user.name || "User"} className="w-16 h-16 rounded-full object-cover border border-forest-900/10" />
                ) : (
                  <div className="w-16 h-16 bg-forest-900 text-white rounded-full flex items-center justify-center font-serif text-2xl font-bold">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <h2 className="font-bold text-forest-900">{session?.user?.name}</h2>
                  <p className="text-xs text-forest-700/60 truncate max-w-[150px]">{session?.user?.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === "orders" ? "bg-forest-900 text-white" : "text-forest-700 hover:bg-forest-50"}`}
                >
                  <Package size={18} /> Đơn Hàng Của Tôi
                </button>
                <button 
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === "profile" ? "bg-forest-900 text-white" : "text-forest-700 hover:bg-forest-50"}`}
                >
                  <User size={18} /> Thông Tin Tài Khoản
                </button>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors mt-8"
                >
                  <LogOut size={18} /> Đăng Xuất
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm border border-forest-900/10 p-8">
                <h1 className="font-cormorant text-3xl text-forest-900 font-semibold mb-8 border-b border-forest-900/10 pb-4">Lịch Sử Đơn Hàng</h1>
                
                {isLoading ? (
                  <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-forest-900 border-t-transparent rounded-full animate-spin"></div></div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-16">
                    <Package size={48} className="mx-auto text-forest-900/20 mb-4" />
                    <p className="text-forest-900 font-medium mb-4">Bạn chưa có đơn hàng nào.</p>
                    <button onClick={() => router.push('/shop')} className="bg-forest-900 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-forest-800 transition-colors">
                      Khám Phá Sản Phẩm
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-forest-900/10 rounded-xl overflow-hidden">
                        <div className="bg-forest-50/50 p-4 border-b border-forest-900/10 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div>
                            <p className="text-xs text-forest-700/60 uppercase tracking-widest mb-1">Mã đơn hàng: <span className="font-bold text-forest-900">{order._id.substring(order._id.length - 8).toUpperCase()}</span></p>
                            <p className="text-sm text-forest-900 font-medium">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4 mb-4">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex gap-4">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-ivory-100 border border-forest-900/10 shrink-0">
                                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-semibold text-forest-900 text-sm">{item.name}</h4>
                                  <p className="text-xs text-forest-700/70">Số lượng: {item.quantity}</p>
                                </div>
                                <div className="font-semibold text-forest-900 text-sm">
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-forest-900/10 pt-4 flex justify-between items-center">
                            <span className="text-sm text-forest-700">Tổng tiền:</span>
                            <span className="text-xl font-bold text-forest-900">{formatPrice(order.totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-sm border border-forest-900/10 p-8">
                <h1 className="font-cormorant text-3xl text-forest-900 font-semibold mb-8 border-b border-forest-900/10 pb-4">Thông Tin Tài Khoản</h1>
                
                <div className="max-w-md space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-forest-700/70 font-semibold mb-2">Họ và Tên</label>
                    <p className="text-forest-900 font-medium p-3 bg-ivory-100 rounded-xl border border-forest-900/5">{session?.user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-forest-700/70 font-semibold mb-2">Email</label>
                    <p className="text-forest-900 font-medium p-3 bg-ivory-100 rounded-xl border border-forest-900/5">{session?.user?.email}</p>
                  </div>
                  <div className="pt-4">
                    <button className="flex items-center gap-2 text-sm font-semibold text-champagne-dark hover:text-forest-900 transition-colors">
                      <Settings size={16} /> Cập nhật thông tin
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
