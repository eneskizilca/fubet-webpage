import { MapPin, Mail, Phone, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-secondary border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 3'lü Bilgi Grid'i */}
        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
            {/* Sosyal Medya */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-4">Sosyal Medyalarımız</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 justify-center group">
                  <Linkedin size={16} className="text-secondary group-hover:text-primary transition-colors" />
                  <a href="https://www.linkedin.com/company/fırat-üniversitesi-eğitim-ve-bilişim-topluluğu-fübet/posts/?feedView=all" target="_blank" className="text-secondary hover:text-primary hover:underline transition-colors">LinkedIn</a>
                </li>
                <li className="flex items-center gap-2 justify-center group">
                  <Instagram size={16} className="text-secondary group-hover:text-primary transition-colors" />
                  <a href="https://www.instagram.com/fubet.firat" target="_blank" className="text-secondary hover:text-primary hover:underline transition-colors">Instagram</a>
                </li>
                <li className="flex items-center gap-2 justify-center group">
                  <Youtube size={16} className="text-secondary group-hover:text-primary transition-colors" />
                  <a href="https://www.youtube.com/@fubett" target="_blank" className="text-secondary hover:text-primary hover:underline transition-colors">YouTube</a>
                </li>
              </ul>
            </div>

            {/* İletişim */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-4">İletişim</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 justify-center"><Mail size={16} /> fubet@firat.edu.tr</li>
                <li className="flex items-center gap-2 justify-center"><Phone size={16} /> +90 424 123 45 67</li>
                <li className="flex items-center gap-2 justify-center"><MapPin size={16} /> Fırat Üniversitesi</li>
              </ul>
            </div>

            {/* Konum */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-4">Konum</h3>
              <p className="text-sm">Fırat Üniversitesi</p>
              <p className="text-sm">Teknoloji Fakültesi</p>
              <p className="text-sm mb-4">23119 Elazığ, Türkiye</p>
            </div>
          </div>
        </div>

        {/* Harita */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              className="w-full h-40"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.1234567890123!2d39.19608212726022!3d38.68128665453678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQwJzUyLjYiTiAzOcKwMTEnNDUuOSJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
