import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Dashboard Header */}
        <section className="relative h-[200px]" style={{ backgroundColor: "#172c5c" }}>
          <div className="relative z-20 h-full flex items-center justify-center text-white">
            <div className="text-center py-8">
              <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
              <p className="text-xl">Yönetim Paneli</p>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* İstatistik Kartları */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#78123e]">Toplam Üye</h3>
              <p className="text-3xl font-bold">150</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#78123e]">Aktif Etkinlikler</h3>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#78123e]">Bekleyen Öneriler</h3>
              <p className="text-3xl font-bold">3</p>
            </div>

            {/* Hızlı İşlemler */}
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-[#78123e]">Hızlı İşlemler</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-[#78123e] text-white rounded-xl px-4 py-2 hover:bg-[#5a0e2e] transition-colors">
                  Etkinlik Ekle
                </button>
                <button className="bg-[#78123e] text-white rounded-xl px-4 py-2 hover:bg-[#5a0e2e] transition-colors">
                  Duyuru Ekle
                </button>
                <button className="bg-[#78123e] text-white rounded-xl px-4 py-2 hover:bg-[#5a0e2e] transition-colors">
                  Üye Yönetimi
                </button>
                <button className="bg-[#78123e] text-white rounded-xl px-4 py-2 hover:bg-[#5a0e2e] transition-colors">
                  Ayarlar
                </button>
              </div>
            </div>

            {/* Son Aktiviteler */}
            <div className="bg-red rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#78123e]">Son Aktiviteler</h3>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-600">Yeni üye kaydı</p>
                  <p className="text-xs text-gray-500">2 saat önce</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-600">Yeni etkinlik önerisi</p>
                  <p className="text-xs text-gray-500">4 saat önce</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-600">Duyuru güncellendi</p>
                  <p className="text-xs text-gray-500">1 gün önce</p>
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