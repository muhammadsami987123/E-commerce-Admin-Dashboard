"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiLogOut } from "react-icons/fi";

function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem("uae_admin_logged_in");
    router.push("/login");
  };
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 mb-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">UAE Admin</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-3">
          <li>
            <Link href="/" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/") ? "bg-blue-200 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}>
              <FiHome className="text-lg" />
              <span  >Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/products" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/products") ? "bg-blue-200 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}>
              <FiBox className="text-lg" />
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link href="/orders" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/orders") ? "bg-blue-200 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}>
              <FiShoppingCart className="text-lg" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link href="/customers" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/customers") ? "bg-blue-200 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}>
              <FiUsers className="text-lg" />
              <span>Customers</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isLoginPage = pathname === "/login";
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("uae_admin_logged_in") === "true";
      if (!isLoggedIn && pathname !== "/login") {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
  }, [pathname, router]);
  
  if (loading && pathname !== "/login") return null;
  
  return (
    <>
      {isLoginPage ? (
        <div className="min-h-screen">{children}</div>
      ) : (
        <div className="flex h-screen bg-gray-100">
          <div className="w-64 bg-gray-900 text-white hidden md:block">
            <Navigation />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white shadow-sm h-16 flex items-center px-6 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-800">
                {pathname === "/" && "Dashboard"}
                {pathname === "/products" && "Products"}
                {pathname === "/orders" && "Orders"}
                {pathname === "/customers" && "Customers"}
              </h1>
            </header>
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
} 