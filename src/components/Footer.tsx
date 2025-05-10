import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-secondary border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 3'lü Bilgi Grid'i */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Bilgilendirme */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">Bilgilendirme</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-primary transition">Misyon & Vizyon</a></li>
              <li><a href="#" className="hover:text-primary transition">Yönetim Kurulu</a></li>
              <li><a href="#" className="hover:text-primary transition">Tüzük</a></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">İletişim</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail size={16} /> info@firat.edu.tr</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +90 424 123 45 67</li>
              <li className="flex items-center gap-2"><MapPin size={16} /> Fırat Üniversitesi</li>
            </ul>
          </div>

          {/* Konum */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">Konum</h3>
            <p className="text-sm">Fırat Üniversitesi, Merkez Kampüs</p>
            <p className="text-sm mb-4">23119 Elazığ, Türkiye</p>

            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                className="w-full h-40"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.1234567890123!2d39.19608212726022!3d38.68128665453678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQwJzUyLjYiTiAzOcKwMTEnNDUuOSJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-secondary">&copy; {new Date().getFullYear()} FUBET. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
