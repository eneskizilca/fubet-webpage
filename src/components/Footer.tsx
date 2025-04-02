export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Üst kısım - 3 sütun */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <h3 style={{ color: '#78123e' }} className="text-lg font-semibold mb-4">Bilgilendirme</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#78123e]">Hakkımızda</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#78123e]">Misyon & Vizyon</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#78123e]">Yönetim Kurulu</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#78123e]">Tüzük</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 style={{ color: '#78123e' }} className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@firat.edu.tr</li>
              <li className="text-gray-600">Tel: +90 424 123 45 67</li>
              <li className="text-gray-600">Adres: Fırat Üniversitesi</li>
            </ul>
          </div>
          <div className="text-center">
            <h3 style={{ color: '#78123e' }} className="text-lg font-semibold mb-4">Konum</h3>
            <p className="text-gray-600">Fırat Üniversitesi, Merkez Kampüs</p>
            <p className="text-gray-600">23119 Elazığ, Türkiye</p>
          </div>
        </div>

        {/* Orta kısım - Harita */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.1234567890123!2d39.19608212726022!3d38.68128665453678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQwJzUyLjYiTiAzOcKwMTEnNDUuOSJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Alt kısım - Telif hakkı */}
        <div className="text-center border-t border-white/20 pt-8">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} FUBET. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 