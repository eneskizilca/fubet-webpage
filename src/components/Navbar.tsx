'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, createContext, useContext } from 'react';
import { useSuggestEventHover } from '../context/SuggestEventHoverContext';
import { useRouter } from 'next/navigation';

const isAuthenticated = false;

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
  const router = useRouter();

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
              <button 
                onClick={() => handleDropdownClick('etkinlikler')}
                className="text-gray-700 hover:text-[#78123e] font-medium transition duration-300 cursor-pointer"
              >
                Etkinlikler
              </button>
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

            {/* Auth */}
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="text-gray-700 hover:text-[#78123e] font-medium">Profil</Link>
                <button className="bg-[#78123e] text-white px-6 py-1.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">Çıkış Yap</button>
              </>
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
            <div className="flex gap-2">
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
    </nav>
  );
} 