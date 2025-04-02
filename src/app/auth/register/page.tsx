import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Yeni hesap oluşturun
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Veya{' '}
              <Link href="/auth/login" className="font-medium text-[#78123e] hover:text-[#5a0e2e]">
                mevcut hesabınıza giriş yapın
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Ad Soyad
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#78123e] focus:border-[#78123e] focus:z-10 sm:text-sm"
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email adresi
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#78123e] focus:border-[#78123e] focus:z-10 sm:text-sm"
                  placeholder="Email adresi"
                />
              </div>
              <div>
                <label htmlFor="student-number" className="sr-only">
                  Öğrenci Numarası
                </label>
                <input
                  id="student-number"
                  name="student-number"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#78123e] focus:border-[#78123e] focus:z-10 sm:text-sm"
                  placeholder="Öğrenci Numarası"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#78123e] focus:border-[#78123e] focus:z-10 sm:text-sm"
                  placeholder="Şifre"
                />
              </div>
              <div>
                <label htmlFor="password-confirm" className="sr-only">
                  Şifre Tekrar
                </label>
                <input
                  id="password-confirm"
                  name="password-confirm"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#78123e] focus:border-[#78123e] focus:z-10 sm:text-sm"
                  placeholder="Şifre Tekrar"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#78123e] hover:bg-[#5a0e2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#78123e]"
              >
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
} 