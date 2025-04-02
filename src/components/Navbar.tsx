import Link from 'next/link';
import Image from 'next/image';

// Geçici olarak auth durumunu simüle etmek için
const isAuthenticated = false; // Bu değer daha sonra gerçek auth sisteminden gelecek

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
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

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-[#78123e] px-3 py-2 rounded-3xl text-sm font-medium">
                Ana Sayfa
              </Link>
              <Link href="/etkinlikler" className="text-gray-600 hover:text-[#78123e] px-3 py-2 rounded-3xl text-sm font-medium">
                Etkinlikler
              </Link>
              <Link href="/etkinlikler/gecmis-etkinlikler" className="text-gray-600 hover:text-[#78123e] px-3 py-2 rounded-3xl text-sm font-medium">
                Geçmiş Etkinlikler
              </Link>
              <Link href="/etkinlikler/etkinlik-takvimi" className="text-gray-600 hover:text-[#78123e] px-3 py-2 rounded-3xl text-sm font-medium">
                Etkinlik Takvimi
              </Link>
              <Link href="/etkinlik-oner" className="text-gray-600 hover:text-[#78123e] px-3 py-2 rounded-3xl text-sm font-medium">
                Etkinlik Öner
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/profil" className="text-gray-600 hover:text-[#78123e] px-3 py-2 rounded-3xl text-sm font-medium">
                  Profil
                </Link>
                <button className="bg-[#78123e] text-white px-4 py-2 rounded-3xl text-sm font-medium hover:bg-[#5a0e2e] transition-colors">
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-600 hover:text-[#78123e] px-3 py-2 rounded-3xl text-sm font-medium">
                  Giriş Yap
                </Link>
                <Link href="/auth/register" className="bg-[#78123e] text-white px-4 py-2 rounded-3xl text-sm font-medium hover:bg-[#5a0e2e] transition-colors">
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#78123e]"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Menüyü aç</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
            Ana Sayfa
          </Link>
          <Link href="/etkinlikler" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
            Etkinlikler
          </Link>
          <Link href="/etkinlikler/gecmis-etkinlikler" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
            Geçmiş Etkinlikler
          </Link>
          <Link href="/etkinlikler/etkinlik-takvimi" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
            Etkinlik Takvimi
          </Link>
          <Link href="/etkinlik-oner" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
            Etkinlik Öner
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/profil" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
                Profil
              </Link>
              <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
                Giriş Yap
              </Link>
              <Link href="/auth/register" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#78123e] hover:bg-gray-50">
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 