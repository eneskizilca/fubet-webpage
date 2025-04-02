import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Başlık Section */}
        <section className="relative h-[300px]" style={{ backgroundColor: "#172c5c" }}>
          <div className="relative z-20 h-full flex items-center justify-center text-white">
            <div className="text-center py-8">
              <h1 className="text-4xl font-bold mb-4">Fırat Üniversitesi</h1>
              <p className="text-xl">Bilişim ve Eğitim Topluluğu</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 bg-[#78123e] text-white rounded-3xl px-6 py-3">Son Etkinlikler</h2>
              <div className="space-y-6">
                {/* Etkinlik kartları buraya gelecek */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2 bg-[#78123e] text-white rounded-3xl px-6 py-3">Örnek Etkinlik</h3>
                  <p className="text-gray-600">Etkinlik açıklaması buraya gelecek...</p>
                </div>
              </div>
            </div>

            {/* Duyurular Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 bg-[#78123e] text-white rounded-3xl px-6 py-3">Duyurular</h2>
              <div className="space-y-4">
                {/* Duyuru kartları buraya gelecek */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold mb-2 bg-[#78123e] text-white rounded-3xl px-6 py-3">Önemli Duyuru</h3>
                  <p className="text-sm text-gray-600">Duyuru içeriği buraya gelecek...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
