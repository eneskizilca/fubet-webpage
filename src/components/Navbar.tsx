'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';

const isAuthenticated = false;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleDropdownClick = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const handleDropdownMouseEnter = (dropdownName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdownName);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="w-px h-8 bg-[#78123e] mr-3 block" />
              <span className="text-xl font-bold text-[#78123e]">FÜBET</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-[#78123e] font-medium">Ana Sayfa</Link>

            {/* Etkinlikler */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownMouseEnter('etkinlikler')}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button 
                onClick={() => handleDropdownClick('etkinlikler')}
                className="text-gray-700 hover:text-[#78123e] font-medium transition duration-300 cursor-pointer"
              >
                Etkinlikler
              </button>
              <div className={`absolute left-0 mt-2 w-56 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transform origin-top transition-all duration-300 z-50 ${
                activeDropdown === 'etkinlikler' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}>
                <Link 
                  href="/events/calendar" 
                  className="block px-5 py-3 text-base font-medium transition-colors duration-150 hover:bg-[#78123e] hover:text-white focus:bg-[#78123e] focus:text-white"
                >
                  Etkinlik Takvimi
                </Link>
                <Link 
                  href="/events/past" 
                  className="block px-5 py-3 text-base font-medium transition-colors duration-150 hover:bg-[#78123e] hover:text-white focus:bg-[#78123e] focus:text-white"
                >
                  Geçmiş Etkinlikler
                </Link>
              </div>
            </div>

            {/* Hakkımızda */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownMouseEnter('hakkimizda')}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button 
                onClick={() => handleDropdownClick('hakkimizda')}
                className="text-gray-700 hover:text-[#78123e] font-medium transition duration-300 cursor-pointer"
              >
                Hakkımızda
              </button>
              <div className={`absolute left-0 mt-2 w-56 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transform origin-top transition-all duration-300 z-50 ${
                activeDropdown === 'hakkimizda' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}>
                <Link 
                  href="/about/about-us" 
                  className="block px-5 py-3 text-base font-medium transition-colors duration-150 hover:bg-[#78123e] hover:text-white focus:bg-[#78123e] focus:text-white"
                >
                  Biz Kimiz?
                </Link>
                <Link 
                  href="/about/team" 
                  className="block px-5 py-3 text-base font-medium transition-colors duration-150 hover:bg-[#78123e] hover:text-white focus:bg-[#78123e] focus:text-white"
                >
                  Ekibimiz
                </Link>
              </div>
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="text-gray-700 hover:text-[#78123e] font-medium">Profil</Link>
                <button className="bg-[#78123e] text-white px-6 py-1.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">Çıkış Yap</button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="bg-[#78123e] text-white px-6 py-1.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 font-medium"
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/register" 
                  className="bg-[#78123e] text-white px-6 py-1.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 font-medium"
                >
                  Kayıt Ol
                </Link>
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
              <Link href="/profile" className="block text-gray-700">Profil</Link>
              <button className="block w-full text-center bg-[#78123e] text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">Çıkış Yap</button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="block bg-[#78123e] text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 font-medium text-center"
              >
                Giriş Yap
              </Link>
              <Link 
                href="/register" 
                className="block bg-[#78123e] text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 font-medium text-center"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
} 