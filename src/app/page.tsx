import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center h-[52vh] bg-gradient-to-br from-[#172c5c] to-[#78123e]">
          <div className="z-10 flex flex-col items-center justify-center w-full h-full px-4">
            <img src="/logo.png" alt="FÜBET Logo" width={144} height={144} className="mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              Fırat Üniversitesi Bilişim ve Eğitim Topluluğu
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8 font-medium">
              Geleceği birlikte kodluyoruz!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="px-8 py-3 rounded-xl bg-white text-[#78123e] font-bold text-lg shadow-md hover:scale-105 transition-transform duration-200">
                Topluluğumuza Katıl
              </Link>
              <Link href="/about" className="px-8 py-3 rounded-xl bg-[#78123e] text-white font-bold text-lg shadow-md hover:scale-105 transition-transform duration-200 border-2 border-white/80">
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
              {/* Teknik Geziler Kartı */}
              <div className="bg-[#f8f8fa] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200">
                <h3 className="text-2xl font-bold text-secondary mb-4">Teknik Geziler</h3>
                <p className="text-gray-700 text-base">Üyelerimizle birlikte teknoloji firmalarına, fabrikalara ve inovasyon merkezlerine düzenlediğimiz gezilerle sektörü yakından tanıma fırsatı sunuyoruz.</p>
              </div>
              {/* Sosyal Faaliyetler Kartı */}
              <div className="bg-[#f8f8fa] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200">
                <h3 className="text-2xl font-bold text-secondary mb-4">Sosyal Faaliyetler</h3>
                <p className="text-gray-700 text-base">Topluluk ruhunu güçlendiren piknikler, oyun turnuvaları, film geceleri ve daha birçok sosyal etkinlikle üyelerimiz arasında güçlü bağlar kuruyoruz.</p>
              </div>
              {/* Yazılım Eğitimleri Kartı */}
              <div className="bg-[#f8f8fa] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200">
                <h3 className="text-2xl font-bold text-secondary mb-4">Yazılım Eğitimleri</h3>
                <p className="text-gray-700 text-base">Alanında uzman eğitmenlerle düzenlediğimiz yazılım eğitimleriyle üyelerimizin teknik bilgi ve becerilerini geliştiriyoruz.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Etkinliklerimizden Kareler Slider */}
        <section className="w-full py-16 bg-[#f8f8fa]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#78123e] mb-12">Etkinliklerimizden Kareler</h2>
            {/* Basit slider/carousel */}
            <div className="relative w-full overflow-x-auto flex gap-6 pb-2">
              {/* Placeholder images, replace with your own */}
              <img src="/event1.jpg" alt="Etkinlik 1" className="h-56 w-80 object-cover rounded-xl shadow-md flex-shrink-0" />
              <img src="/event2.jpg" alt="Etkinlik 2" className="h-56 w-80 object-cover rounded-xl shadow-md flex-shrink-0" />
              <img src="/event3.jpg" alt="Etkinlik 3" className="h-56 w-80 object-cover rounded-xl shadow-md flex-shrink-0" />
            </div>
          </div>
        </section>

        {/* Sponsorluk ve İşbirliklerimiz */}
        <section className="w-full py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#78123e] mb-12">Sponsorluk ve İşbirliklerimiz</h2>
            <div className="flex justify-center">
              {/* Flip Card */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center">
                    <img src="/techcareer.svg" alt="Techcareer" width={185} height={20} className="w-[185px] h-[20px] object-contain mb-2" />
                  </div>
                  <div className="flip-card-back absolute inset-0 bg-[#78123e] rounded-2xl shadow-xl flex flex-col items-center justify-center text-white px-4 text-center">
                    <span className="text-lg font-bold mb-2">Techcareer</span>
                    <span className="text-base">Yazılım ve kariyer konusunda bootcamp, eğitim ve etkinlik desteği anlaşması yapılmıştır.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
