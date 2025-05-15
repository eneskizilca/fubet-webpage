'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, createContext, useContext, useEffect } from 'react';
import { useSuggestEventHover } from '../context/SuggestEventHoverContext';
import { useRouter } from 'next/navigation';

export const SuggestEventHoverContext = createContext({
  isSuggestEventHovered: false,
  setIsSuggestEventHovered: (v: boolean) => {},
});

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const spotlightTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { isSuggestEventHovered, setIsSuggestEventHovered } = useSuggestEventHover();
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!token && !!user);
    };
    
    checkAuth();
    
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };
  
  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setShowLogoutConfirm(false);
    router.push('/');
  };
  
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    router.push('/');
  };

  const getUserInitials = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return 'KK';
      
      const user = JSON.parse(userStr);
      const firstInitial = user.name ? user.name.charAt(0).toUpperCase() : '';
      const lastInitial = user.surname ? user.surname.charAt(0).toUpperCase() : '';
      
      return firstInitial + lastInitial;
    } catch (error) {
      console.error('Error getting user initials:', error);
      return 'KK';
    }
  };

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
    }, 150); // 300ms'den 150ms'ye düşürüldü
  };

  const handleSpotlightEnter = () => {
    if (spotlightTimeoutRef.current) {
      clearTimeout(spotlightTimeoutRef.current);
    }
    setShowSpotlight(true);
  };

  const handleSpotlightLeave = () => {
    spotlightTimeoutRef.current = setTimeout(() => {
      setShowSpotlight(false);
    }, 100); // 300ms'den 100ms'ye düşürüldü
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
              <Link 
                href="/events"
                className="text-gray-700 hover:text-[#78123e] font-medium transition duration-300 cursor-pointer"
              >
                Etkinlikler
              </Link>
              <div className={`absolute left-0 mt-2 w-fit min-w-max bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transform origin-top transition-all duration-200 z-50 ${
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

            {/* Etkinlik Öner */}
            <div className="relative"
              onMouseEnter={() => setIsSuggestEventHovered(true)}
              onMouseLeave={() => setIsSuggestEventHovered(false)}
            >
              <button
                type="button"
                className="text-gray-700 hover:text-[#78123e] font-medium transition duration-300 flex items-center gap-2 group cursor-pointer"
                onClick={() => setShowSuggestModal(true)}
              >
                Etkinlik Öner
                <div className="flex items-center justify-center relative">
                  <Image
                    src="/ai2.png"
                    alt="AI Icon"
                    width={30}
                    height={30}
                    className="relative z-10 group-hover:scale-110 transition-transform duration-300 group-hover:animate-float"
                  />
                </div>
              </button>
              {/* Speech Bubble Popup */}
              <div 
                className={`absolute top-[120%] left-0 w-[300px] bg-white/90 transition-all duration-200 transform border border-white/20 rounded-xl shadow-lg ${
                  isSuggestEventHovered && !showSuggestModal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="p-4 text-center">
                  <div className="text-lg font-bold text-[#78123e] mb-2">
                    Yapay Zekayı Denemeyi Unutma !
                  </div>
                  <div className="text-sm text-gray-700">
                    Senin seçimlerin ve yapay zekanın sihirli fikirleri ile bir etkinlik önerisi yarat!
                  </div>
                </div>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/90 transform rotate-45 border-r border-b border-white/20"></div>
              </div>
              {/* Modal */}
              {showSuggestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => { setShowSuggestModal(false); setIsSuggestEventHovered(false); }}>
                  <div
                    className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 min-w-[320px] max-w-[90vw] relative"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                      onClick={() => { setShowSuggestModal(false); setIsSuggestEventHovered(false); }}
                      aria-label="Kapat"
                    >
                      ×
                    </button>
                    <h2 className="text-2xl font-bold text-[#78123e] mb-2 text-center">Etkinlik Öner</h2>
                    <button
                      className="w-full py-4 rounded-xl bg-[#78123e] text-white text-lg font-bold shadow hover:bg-[#5a0e2c] transition mb-2"
                      onClick={() => { setShowSuggestModal(false); setIsSuggestEventHovered(false); router.push('/suggest-event'); }}
                    >
                      Bir Fikrim Var!
                    </button>
                    <button
                      className="w-full py-4 rounded-xl bg-white border-2 border-[#78123e] text-[#78123e] text-lg font-bold shadow hover:bg-[#f3e6ee] transition"
                      onClick={() => { setShowSuggestModal(false); setIsSuggestEventHovered(false); router.push('/suggest-event-with-ai'); }}
                    >
                      Bir Fikir Oluşturalım!
                    </button>
                  </div>
                </div>
              )}
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
              <div className={`absolute left-0 mt-2 w-fit min-w-max bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transform origin-top transition-all duration-200 z-50 ${
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

            {/* Bize Ulaşın */}
            <Link href="/contact" className="text-gray-700 hover:text-[#78123e] font-medium">Bize Ulaşın</Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/profile" 
                  className="bg-[#78123e] hover:bg-[#5a0e2c] text-white pl-2 pr-2 py-1.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 font-medium flex items-center"
                >
                  <div className="w-7 h-7 rounded-full bg-white text-[#78123e] flex items-center justify-center font-bold text-sm">
                    {getUserInitials()}
                  </div>
                  <span className="ml-2">Profilim</span>
                </Link>
                <button 
                  onClick={handleLogoutClick}
                  className="bg-[#78123e] hover:bg-[#5a0e2c] text-white w-9 h-9 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer flex items-center justify-center"
                  aria-label="Çıkış Yap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
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
              </div>
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
            <Link href="/events" className="block text-gray-700">Etkinlikler</Link>
            <div className="ml-4 space-y-1">
              <Link href="/events/calendar" className="block text-sm text-gray-600">Etkinlik Takvimi</Link>
              <Link href="/events/past" className="block text-sm text-gray-600">Geçmiş Etkinlikler</Link>
            </div>
          </div>
          <button 
            onClick={() => setShowSuggestModal(true)}
            className="block text-gray-700 w-full text-left flex items-center gap-2"
          >
            Etkinlik Öner
            <Image
              src="/ai2.png"
              alt="AI Icon"
              width={20}
              height={20}
              className="inline-block"
            />
          </button>
          <div>
            <Link href="/about" className="block text-gray-700">Hakkımızda</Link>
            <div className="ml-4 space-y-1">
              <Link href="/about/about-us" className="block text-sm text-gray-600">Biz Kimiz?</Link>
              <Link href="/about/team" className="block text-sm text-gray-600">Ekibimiz</Link>
            </div>
          </div>
          <Link href="/contact" className="block text-gray-700">Bize Ulaşın</Link>
          {isAuthenticated ? (
            <div className="space-y-2 pt-2">
              <Link 
                href="/profile" 
                className="flex items-center bg-[#78123e] text-white pl-1.5 pr-1.5 py-2 rounded-full"
              >
                <div className="w-7 h-7 rounded-full bg-white text-[#78123e] flex items-center justify-center font-bold text-sm">
                  {getUserInitials()}
                </div>
                <span className="ml-2">Profilim</span>
              </Link>
              <button 
                onClick={handleLogoutClick}
                className="flex items-center gap-2 w-full bg-gray-200 text-gray-700 px-3 py-2 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Çıkış Yap</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <Link href="/login" className="block w-full bg-[#78123e] text-white px-4 py-2 rounded-lg text-center">Giriş Yap</Link>
              <Link href="/register" className="block w-full bg-[#78123e] text-white px-4 py-2 rounded-lg text-center">Kayıt Ol</Link>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.1);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .clip-path-triangle-in {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }

        .clip-path-triangle-out {
          clip-path: polygon(100% 0, 0 50%, 100% 100%);
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.5s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Çıkış Onayı Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div 
            className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#172c5c] mb-4 text-center">Çıkış Yapmak İstiyor musunuz?</h3>
            
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={confirmLogout}
                className="w-full py-2.5 rounded-xl bg-[#78123e] text-white font-bold hover:bg-[#5a0e2c] transition-colors"
              >
                Çıkış Yap
              </button>
              <button
                onClick={cancelLogout}
                className="w-full py-2.5 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 