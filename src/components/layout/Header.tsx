"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  token: string;
}

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Cập nhật user từ localStorage và lắng nghe sự kiện "userChanged"
  useEffect(() => {
    const updateUserFromStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    updateUserFromStorage(); // Gọi ngay khi load

    window.addEventListener("userChanged", updateUserFromStorage);

    return () => {
      window.removeEventListener("userChanged", updateUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    router.push("/auth/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          fiverr<span className="text-black">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-700">
          {!user ? (
            <>
              <Link href="/" className="hover:text-green-600 transition px-3 py-2">
                Become a Seller
              </Link>
              <Link href="/auth/login" className="hover:text-green-600 transition px-3 py-2">
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Join
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-800 px-3 py-2">
                👤 Xin chào, <strong>{user.fullname}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Đăng xuất
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm font-medium text-gray-700 bg-white border-t">
          {!user ? (
            <>
              <Link href="/" className="block">
                Become a Seller
              </Link>
              <Link href="/auth/login" className="block">
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-fit"
              >
                Join
              </Link>
            </>
          ) : (
            <>
             <Link href="/" className="block">
                Become a Seller
              </Link>
              <p className="text-gray-800">
                👤 Xin chào, <strong>{user.fullname}</strong>
              </p>
              <button
                onClick={handleLogout}
                className="block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-fit"
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
