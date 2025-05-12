'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Code, Building2, Users2 } from 'lucide-react';
import HomeAnimatedSections from '@/components/HomeAnimatedSections';
import { useSuggestEventHover } from '@/context/SuggestEventHoverContext';

export default function Home() {
  const { isSuggestEventHovered } = useSuggestEventHover();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center h-[52vh] bg-gradient-to-br from-[#172c5c] to-[#78123e]">
          <div className="z-10 flex flex-col items-center justify-center w-full h-full px-4">
            {isSuggestEventHovered ? (
              <img src="/ai-logo-gif-1.gif" alt="AI Logo" width={144} height={144} className="mx-auto mb-4 animate-fade-in-down" style={{ animationDelay: '0.1s', animationFillMode: 'both' }} />
            ) : (
              <img src="/logo.png" alt="FÜBET Logo" width={144} height={144} className="mx-auto mb-4 animate-fade-in-down" style={{ animationDelay: '0.1s', animationFillMode: 'both' }} />
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg animate-fade-in-down" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Fırat Üniversitesi Bilişim ve Eğitim Topluluğu
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8 font-medium animate-fade-in-down" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
              Geleceği birlikte kodluyoruz!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-down" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
              <Link href="/register" className="px-8 py-3 rounded-xl bg-white text-center text-[#78123e] font-bold text-lg shadow-md hover:scale-105 transition-transform duration-200 flex flex-col items-center justify-center">
                Topluluğumuza Katıl
              </Link>
              <Link href="/about" className="px-8 py-3 rounded-xl bg-[#78123e] text-center text-white font-bold text-lg shadow-md hover:scale-105 transition-transform duration-200 border-2 border-white/80 flex flex-col items-center justify-center">
                Daha Fazla Bilgi
              </Link>
            </div>
          </div>
          {/* Down Arrow */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce z-20">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" className="drop-shadow-lg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>
        {/* Neler Yapıyoruz Bölümü */}
        <section className="w-full py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#78123e] mb-12">Neler Yapıyoruz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Yazılım Eğitimleri Kartı */}
              <div className="bg-[#f8f8fa] rounded-2xl shadow-lg p-8 pt-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200 relative">
                <Code size={18} className="absolute left-5 top-5 text-[#78123e]" />
                <h3 className="text-2xl font-bold text-secondary mb-4 mt-1">Yazılım Eğitimleri</h3>
                <p className="text-gray-700 text-base">Alanında uzman eğitmenlerle düzenlediğimiz yazılım eğitimleriyle üyelerimizin teknik bilgi ve becerilerini geliştiriyoruz.</p>
              </div>
              {/* Teknik Geziler Kartı */}
              <div className="bg-[#f8f8fa] rounded-2xl shadow-lg p-8 pt-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200 relative">
                <Building2 size={18} className="absolute left-5 top-5 text-[#78123e]" />
                <h3 className="text-2xl font-bold text-secondary mb-4 mt-1">Teknik Geziler</h3>
                <p className="text-gray-700 text-base">Üyelerimizle birlikte teknoloji firmalarına, fabrikalara ve inovasyon merkezlerine düzenlediğimiz gezilerle sektörü yakından tanıma fırsatı sunuyoruz.</p>
              </div>
              {/* Sosyal Faaliyetler Kartı */}
              <div className="bg-[#f8f8fa] rounded-2xl shadow-lg p-8 pt-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200 relative">
                <Users2 size={18} className="absolute left-5 top-5 text-[#78123e]" />
                <h3 className="text-2xl font-bold text-secondary mb-4 mt-1">Sosyal Faaliyetler</h3>
                <p className="text-gray-700 text-base">Topluluk ruhunu güçlendiren piknikler, oyun turnuvaları, film geceleri ve daha birçok sosyal etkinlikle üyelerimiz arasında güçlü bağlar kuruyoruz.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Etkinliklerimizden Kareler Slider */}
        <HomeAnimatedSections />
      </main>
      <Footer />
    </div>
  );
}
