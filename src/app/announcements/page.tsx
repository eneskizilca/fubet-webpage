'use client';
import { useState, useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import { CalendarIcon, Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';

// useInView hook for scroll animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  return [ref, inView] as const;
}

// Mock data for announcements
const announcementData = [
  {
    id: 1,
    title: 'Yeni Dönem Kayıtlarımız Başladı',
    date: '2024-04-10',
    description: 'FÜBET 2024-2025 akademik yılı için üye kayıtlarımız başlamıştır. Son başvuru tarihi 30 Eylül 2024\'tür. Kayıt olmak için web sitemizden başvuru formunu doldurabilirsiniz.',
    category: 'Kayıt',
    important: true
  },
  {
    id: 2,
    title: 'Bilgilendirme Toplantısı',
    date: '2024-04-15',
    description: 'Topluluğumuzun tanıtım ve bilgilendirme toplantısı 15 Nisan 2024 tarihinde Mühendislik Fakültesi Konferans Salonu\'nda gerçekleştirilecektir. Tüm üyelerimizin katılımı beklenmektedir.',
    category: 'Toplantı',
    important: false
  },
  {
    id: 3,
    title: 'Yazılım Yarışması',
    date: '2024-04-20',
    description: 'FÜBET olarak düzenlediğimiz yazılım yarışmamızın başvuruları 20 Nisan - 10 Mayıs tarihleri arasında yapılabilecektir. Yarışma detayları web sitemizde yayınlanmıştır.',
    category: 'Yarışma',
    important: true
  },
  {
    id: 4,
    title: 'Danışman Öğretim Üyesi Değişikliği',
    date: '2024-03-30',
    description: 'Topluluğumuzun danışman öğretim üyesi Prof. Dr. Ahmet Yılmaz olarak değişmiştir. Yeni danışmanımıza görevinde başarılar dileriz.',
    category: 'Duyuru',
    important: false
  },
  {
    id: 5,
    title: 'Üyelik Aidatları Hakkında',
    date: '2024-03-25',
    description: 'Değerli üyelerimiz, 2024 yılı üyelik aidatları belirlenmiştir. Ödeme için son tarih 15 Mayıs 2024\'tür. Detaylar için lütfen profilinizi ziyaret edin.',
    category: 'Aidat',
    important: true
  },
  {
    id: 6,
    title: 'Yönetim Kurulu Seçim Sonuçları',
    date: '2024-03-20',
    description: 'FÜBET 2024-2025 dönemi yönetim kurulu seçimleri tamamlanmıştır. Seçim sonuçları topluluğumuzun web sitesinde yayınlanmıştır.',
    category: 'Seçim',
    important: false
  },
  {
    id: 7,
    title: 'Web Sitemiz Yenilendi',
    date: '2024-03-15',
    description: 'FÜBET web sitesi yenilenmiştir. Yeni tasarım ve özelliklerle daha kullanıcı dostu bir deneyim sunmayı hedefliyoruz. Görüş ve önerilerinizi bizimle paylaşabilirsiniz.',
    category: 'Web',
    important: false
  },
  {
    id: 8,
    title: 'Yaz Staj Programı',
    date: '2024-03-10',
    description: 'Yazılım ve bilişim alanında yaz staj programımız için başvurular 10-30 Mart tarihleri arasında yapılabilecektir. Program detayları için lütfen web sitemizi ziyaret edin.',
    category: 'Staj',
    important: true
  },
  {
    id: 9,
    title: 'Online Eğitim Platformu',
    date: '2024-03-05',
    description: 'Üyelerimize özel online eğitim platformumuz kullanıma açılmıştır. Platformda yazılım, tasarım ve dijital pazarlama alanlarında eğitim içerikleri bulunmaktadır.',
    category: 'Eğitim',
    important: false
  },
  {
    id: 10,
    title: 'İşbirliği Anlaşması',
    date: '2024-03-01',
    description: 'FÜBET olarak XYZ Teknoloji şirketi ile eğitim ve staj konularında işbirliği anlaşması imzalanmıştır. Bu işbirliği kapsamında üyelerimize özel avantajlar sunulacaktır.',
    category: 'İşbirliği',
    important: true
  },
  {
    id: 11,
    title: 'Sosyal Sorumluluk Projesi',
    date: '2024-02-25',
    description: 'FÜBET olarak başlattığımız "Teknoloji ile Eğitim" sosyal sorumluluk projemiz için gönüllü üyelerimizi bekliyoruz. Detaylı bilgi için web sitemizi ziyaret edebilirsiniz.',
    category: 'Sosyal Sorumluluk',
    important: false
  },
  {
    id: 12,
    title: 'Mezuniyet Töreni',
    date: '2024-02-20',
    description: 'FÜBET mezun üyelerimiz için düzenlenecek olan mezuniyet töreni 15 Haziran 2024 tarihinde gerçekleştirilecektir. Tüm mezun üyelerimizin katılımını bekliyoruz.',
    category: 'Mezuniyet',
    important: false
  }
];

export default function AnnouncementsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 6;
  
  // Animation refs
  const [headerRef, headerInView] = useInView();
  const [cardsRef, cardsInView] = useInView();

  // Duyuruları tarihe göre sırala (en yeni tarihli en üstte)
  const sortedAnnouncements = [...announcementData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Pagination hesaplamaları
  const totalPages = Math.ceil(sortedAnnouncements.length / announcementsPerPage);
  const startIndex = (currentPage - 1) * announcementsPerPage;
  const endIndex = startIndex + announcementsPerPage;
  const currentAnnouncements = sortedAnnouncements.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tarihi formatla: "15 Nisan 2024" gibi
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-br from-[#172c5c] to-[#78123e] py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Header */}
          <div 
            ref={headerRef}
            className={`text-center transition-all duration-1000 ${
              headerInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-3xl font-bold text-white mb-6">Duyurular</h1>
            <p className="text-white/80 mb-12 max-w-3xl mx-auto">
              FÜBET topluluğunun tüm güncel duyurularını bu sayfadan takip edebilirsiniz.
            </p>
          </div>
          
          {/* Animated Cards Container */}
          <div 
            ref={cardsRef}
            className={`space-y-6 transition-all duration-1000 ${
              cardsInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            {currentAnnouncements.map((announcement, index) => (
              <div 
                key={announcement.id} 
                className={`bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-700 hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl ${
                  announcement.important ? 'border-l-4 border-yellow-400' : ''
                } ${cardsInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Megaphone className="h-5 w-5 text-white/90 mr-2 transition-transform duration-300 hover:scale-110" />
                        <h3 className="text-xl font-bold text-white">{announcement.title}</h3>
                      </div>
                      <div className="flex items-center text-white/70 text-sm mb-3">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{formatDate(announcement.date)}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full transition-all duration-300 hover:bg-white/30">
                      {announcement.category}
                    </span>
                  </div>
                  
                  <p className="text-white/90 mt-3">{announcement.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-white/30 bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-white/30 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      currentPage === i + 1
                        ? 'bg-white text-[#172c5c] hover:bg-white/90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-white/30 bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        /* Smooth page transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
} 