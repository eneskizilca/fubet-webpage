'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const isAuthenticated = false;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-[#78123e]">BET</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-[#78123e] font-medium">Ana Sayfa</Link>

            {/* Etkinlikler */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#78123e] font-medium transition duration-300">
                Etkinlikler
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-md opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transform origin-top transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <Link href="/events/calendar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Etkinlik Takvimi
                </Link>
                <Link href="/events/past" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Geçmiş Etkinlikler
                </Link>
              </div>
            </div>


            {/* Hakkımızda */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#78123e] font-medium transition duration-300">
                Hakkımızda
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-md opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transform origin-top transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <Link href="/about/biz-kimiz" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Biz Kimiz?
                </Link>
                <Link href="/about/ekibimiz" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Ekibimiz
                </Link>
              </div>
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <>
                <Link href="/profil" className="text-gray-700 hover:text-[#78123e] font-medium">Profil</Link>
                <button className="bg-[#78123e] text-white px-4 py-1.5 rounded-xl hover:bg-[#5a0e2e]">Çıkış Yap</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-[#78123e] font-medium">Giriş Yap</Link>
                <Link href="/register" className="bg-[#78123e] text-white px-4 py-1.5 rounded-xl hover:bg-[#5a0e2e]">Kayıt Ol</Link>
              </>
            )}
          </div>

          {/* Hamburger for Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 space-y-2 shadow-md">
          <Link href="/" className="block text-gray-700">Ana Sayfa</Link>
          <div>
            <p className="font-medium text-gray-700">Etkinlikler</p>
            <div className="ml-4 space-y-1">
              <Link href="/events/calendar" className="block text-sm text-gray-600">Etkinlik Takvimi</Link>
              <Link href="/events/past" className="block text-sm text-gray-600">Geçmiş Etkinlikler</Link>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-700">Hakkımızda</p>
            <div className="ml-4 space-y-1">
              <Link href="/about/biz-kimiz" className="block text-sm text-gray-600">Biz Kimiz?</Link>
              <Link href="/about/ekibimiz" className="block text-sm text-gray-600">Ekibimiz</Link>
            </div>
          </div>
          {isAuthenticated ? (
            <>
              <Link href="/profil" className="block text-gray-700">Profil</Link>
              <button className="block text-left w-full text-gray-700">Çıkış Yap</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-700">Giriş Yap</Link>
              <Link href="/register" className="block bg-[#78123e] text-white px-3 py-1.5 rounded-md">Kayıt Ol</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
} 