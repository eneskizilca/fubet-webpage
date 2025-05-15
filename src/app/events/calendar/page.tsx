'use client';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Clock, CheckCircle } from 'lucide-react';

// Mock data for events - later this can be replaced with actual API calls
const mockEvents = [
  {
    id: 1,
    title: 'React.js Temel Eğitimi',
    date: '2024-04-15',
    time: '14:00',
    location: 'Mühendislik Fakültesi D-101',
    description: 'Modern web teknolojileri ve React.js ile web geliştirme eğitimi.',
    category: 'Yazılım Eğitimleri',
    isUpcoming: true
  },
  {
    id: 2,
    title: 'Microsoft Türkiye Teknik Gezisi',
    date: '2024-04-20',
    time: '09:00',
    location: 'Microsoft Türkiye Ofisi',
    description: 'Microsoft Türkiye ofisine teknik gezi ve networking etkinliği.',
    category: 'Teknik Geziler',
    isUpcoming: true
  },
  {
    id: 3,
    title: 'Yapay Zeka Konferansı',
    date: '2024-05-01',
    time: '10:00',
    location: 'Merkezi Derslik Binası Konferans Salonu',
    description: 'Yapay zeka ve makine öğrenmesi alanındaki son gelişmeler.',
    category: 'Konferanslar'
  },
  {
    id: 4,
    title: 'Kodlama Kampı',
    date: '2024-05-15',
    time: '14:00',
    location: 'Teknoloji Fakültesi',
    description: '3 günlük yoğun kodlama kampı ve proje geliştirme etkinliği.',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 5,
    title: 'Topluluk Kahvaltısı',
    date: '2024-04-25',
    time: '10:00',
    location: 'Üniversite Kafeteryası',
    description: 'Topluluk üyeleri ile kahvaltı ve networking etkinliği.',
    category: 'Sosyal Faaliyetler'
  },
  {
    id: 6,
    title: 'Flutter Workshop',
    date: '2024-05-20',
    time: '13:00',
    location: 'Bilgisayar Mühendisliği Lab',
    description: 'Mobil uygulama geliştirme workshopu.',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 7,
    title: 'Startup Hikayeleri',
    date: '2024-05-25',
    time: '15:00',
    location: 'İşletme Fakültesi Amfi',
    description: 'Başarılı girişimcilerden startup hikayeleri.',
    category: 'Konferanslar'
  },
  {
    id: 8,
    title: 'Google Cloud Günü',
    date: '2024-06-01',
    time: '10:00',
    location: 'Merkezi Derslik Binası',
    description: 'Google Cloud teknolojileri ve kullanım alanları.',
    category: 'Teknik Geziler'
  },
  {
    id: 9,
    title: 'Hackathon',
    date: '2024-06-10',
    time: '09:00',
    location: 'Teknoloji Fakültesi',
    description: '24 saatlik kodlama maratonu.',
    category: 'Yarışmalar'
  },
  {
    id: 10,
    title: 'Kariyer Günleri',
    date: '2024-06-15',
    time: '11:00',
    location: 'Kongre Merkezi',
    description: 'Şirketlerle tanışma ve iş fırsatları.',
    category: 'Kariyer'
  },
  {
    id: 11,
    title: 'Python Workshop',
    date: '2024-06-20',
    time: '14:00',
    location: 'Bilgisayar Mühendisliği Lab',
    description: 'Python programlama dili workshopu.',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 12,
    title: 'Blockchain Semineri',
    date: '2024-06-25',
    time: '15:00',
    location: 'Merkezi Derslik Binası',
    description: 'Blockchain teknolojisi ve kripto paralar.',
    category: 'Konferanslar'
  },
  {
    id: 13,
    title: 'Yazılım Mülakatları',
    date: '2024-07-01',
    time: '13:00',
    location: 'İşletme Fakültesi',
    description: 'Yazılım mülakatlarına hazırlık workshopu.',
    category: 'Kariyer'
  },
  {
    id: 14,
    title: 'Mobil Oyun Geliştirme',
    date: '2024-07-05',
    time: '14:00',
    location: 'Teknoloji Fakültesi',
    description: 'Unity ile mobil oyun geliştirme.',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 15,
    title: 'Siber Güvenlik',
    date: '2024-07-10',
    time: '10:00',
    location: 'Bilgisayar Mühendisliği',
    description: 'Siber güvenlik farkındalık eğitimi.',
    category: 'Eğitimler'
  },
  {
    id: 16,
    title: 'Yazılım Projeleri',
    date: '2024-07-15',
    time: '15:00',
    location: 'Teknoloji Fakültesi',
    description: 'Öğrenci projelerinin sunumu.',
    category: 'Sunumlar'
  },
  {
    id: 17,
    title: 'Veri Bilimi',
    date: '2024-07-20',
    time: '13:00',
    location: 'Merkezi Derslik',
    description: 'Veri bilimi ve makine öğrenmesi.',
    category: 'Eğitimler'
  },
  {
    id: 18,
    title: 'Web Geliştirme',
    date: '2024-07-25',
    time: '14:00',
    location: 'Bilgisayar Mühendisliği',
    description: 'Modern web teknolojileri workshopu.',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 19,
    title: 'Yazılım Mimarisi',
    date: '2024-08-01',
    time: '10:00',
    location: 'Teknoloji Fakültesi',
    description: 'Yazılım mimarisi ve tasarım desenleri.',
    category: 'Eğitimler'
  },
  {
    id: 20,
    title: 'DevOps Workshop',
    date: '2024-08-05',
    time: '13:00',
    location: 'Bilgisayar Mühendisliği',
    description: 'DevOps pratikleri ve araçları.',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 21,
    title: 'Yapay Zeka Projeleri',
    date: '2024-08-10',
    time: '15:00',
    location: 'Merkezi Derslik',
    description: 'Yapay zeka projelerinin sunumu.',
    category: 'Sunumlar'
  },
  {
    id: 22,
    title: 'Mobil Uygulama',
    date: '2024-08-15',
    time: '14:00',
    location: 'Teknoloji Fakültesi',
    description: 'React Native ile mobil uygulama geliştirme.',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 23,
    title: 'Yazılım Testleri',
    date: '2024-08-20',
    time: '10:00',
    location: 'Bilgisayar Mühendisliği',
    description: 'Yazılım test metodolojileri.',
    category: 'Eğitimler'
  },
  {
    id: 24,
    title: 'Kariyer Planlama',
    date: '2024-08-25',
    time: '13:00',
    location: 'İşletme Fakültesi',
    description: 'Yazılım sektöründe kariyer planlama.',
    category: 'Kariyer'
  },
  {
    id: 25,
    title: 'Yazılım Proje Yönetimi',
    date: '2024-08-30',
    time: '15:00',
    location: 'Teknoloji Fakültesi',
    description: 'Agile metodolojiler ve proje yönetimi.',
    category: 'Eğitimler'
  }
];

export default function CalendarPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);
  const [animateUI, setAnimateUI] = useState(false);
  const eventsPerPage = 10;

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateUI(true);
  }, []);

  // Etkinlikleri tarihe göre sırala (en yeni tarihli en üstte)
  const sortedEvents = [...mockEvents].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Yaklaşan etkinlikleri filtrele
  const upcomingEvents = sortedEvents.filter(event => event.isUpcoming);
  const pastEvents = sortedEvents.filter(event => !event.isUpcoming);

  // Pagination hesaplamaları
  const totalPages = Math.ceil(pastEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = pastEvents.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Sayfa değiştiğinde en üste scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJoinClick = (event: any) => {
    setSelectedEvent(event);
    setShowSuccessModal(true);
    setShowCheckmark(false);
    
    // Etkinliğe katılım durumunu kaydet
    setJoinedEvents((prev) => [...prev, event.id]);
    
    // Animasyon için kısa bir gecikme
    setTimeout(() => {
      setShowCheckmark(true);
    }, 300);
  };

  const hasJoined = (eventId: number) => {
    return joinedEvents.includes(eventId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-br from-[#172c5c] to-[#78123e] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className={`text-3xl font-bold text-white mb-8 text-center transition-all duration-700 transform ${animateUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Etkinlik Takvimi
          </h1>
          
          {/* Yaklaşan Etkinlikler */}
          {upcomingEvents.length > 0 && (
            <div className={`mb-8 transition-all duration-700 delay-200 ${animateUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-2xl font-bold text-white mb-4">Yaklaşan Etkinlikler</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div 
                    key={event.id}
                    className={`bg-white/90 backdrop-blur-md rounded-xl p-6 h-[144px] flex items-center gap-6 hover:shadow-lg transition-all duration-700 relative mx-auto transform hover:-translate-y-1 hover:shadow-xl ${animateUI ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
                    style={{ 
                      maxWidth: '48rem',
                      transitionDelay: `${300 + (index * 100)}ms` 
                    }}
                  >
                    {/* Quarter Circle with Clock Icon */}
                    <div className="absolute top-0 left-0 w-60 h-60 overflow-hidden">
                      <div className={`absolute -top-32 -left-32 w-60 h-60 bg-green-500 rounded-br-full flex items-center justify-center transition-all duration-1000 delay-500 transform ${animateUI ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <Clock className="w-10 h-10 text-white transform translate-x-8 translate-y-8 animate-pulse" />
                      </div>
                    </div>

                    {/* Tarih Bölümü */}
                    <div className="flex flex-col items-center justify-center min-w-[100px] text-center">
                      <div className="text-2xl font-bold text-[#78123e]">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleString('tr-TR', { month: 'long' })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {event.time}
                      </div>
                    </div>

                    {/* Dikey Ayraç */}
                    <div className="h-full w-px bg-gray-200"></div>

                    {/* Etkinlik Detayları */}
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-[#172c5c]">{event.title}</h3>
                        <span className="px-3 py-1 bg-[#78123e] text-white text-sm rounded-full animate-pulse-subtle">
                          {event.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                        {hasJoined(event.id) ? (
                          <button
                            disabled
                            className="px-4 py-2 bg-green-500 text-white rounded-lg opacity-90 flex items-center"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> Başvuruldu
                          </button>
                        ) : (
                          <button
                            onClick={() => handleJoinClick(event)}
                            className="px-4 py-2 bg-[#78123e] text-white rounded-lg hover:bg-[#5a0e2c] transition-all duration-300 cursor-pointer hover:scale-105"
                          >
                            Etkinliğe Katıl
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Geçmiş Etkinlikler */}
          <div className={`transition-all duration-700 delay-400 transform ${animateUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl font-bold text-white mb-4">Geçmiş Etkinlikler</h2>
            <div className="space-y-4">
              {currentEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className={`bg-white/90 backdrop-blur-md rounded-xl p-6 h-[144px] flex items-center gap-6 hover:shadow-lg transition-all duration-700 cursor-pointer mx-auto transform hover:-translate-y-1 hover:shadow-xl ${animateUI ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
                  style={{ 
                    maxWidth: '48rem',
                    transitionDelay: `${700 + (index * 100)}ms` 
                  }}
                >
                  {/* Tarih Bölümü */}
                  <div className="flex flex-col items-center justify-center min-w-[100px] text-center">
                    <div className="text-2xl font-bold text-[#78123e]">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleString('tr-TR', { month: 'long' })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {event.time}
                    </div>
                  </div>

                  {/* Dikey Ayraç */}
                  <div className="h-full w-px bg-gray-200"></div>

                  {/* Etkinlik Detayları */}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#172c5c]">{event.title}</h3>
                      <span className="px-3 py-1 bg-[#78123e] text-white text-sm rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className={`mt-8 flex justify-center items-center gap-2 transition-all duration-700 delay-1000 transform ${animateUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-100 cursor-pointer'
              } text-[#78123e] font-medium`}
            >
              Önceki
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 rounded-lg hover:scale-110 transition-all duration-300 ${
                    currentPage === index + 1
                      ? 'bg-[#78123e] text-white cursor-pointer'
                      : 'bg-white hover:bg-gray-100 text-[#78123e] cursor-pointer'
                  } font-medium`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-100 cursor-pointer'
              } text-[#78123e] font-medium`}
            >
              Sonraki
            </button>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center animate-scaleIn">
            <div className={`transition-all duration-500 transform ${showCheckmark ? 'scale-100' : 'scale-0'}`}>
              <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
            </div>
            <h3 className="text-2xl font-bold text-[#78123e] mb-2">Başarılı!</h3>
            <p className="text-gray-600 mb-6 text-center">
              <span className="font-semibold">{selectedEvent.title}</span> etkinliğine başvurunuz başarıyla alınmıştır.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-[#78123e] text-white rounded-lg hover:bg-[#5a0e2c] transition-colors cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }

        .animate-pulse-subtle {
          animation: pulse 3s infinite ease-in-out;
        }

        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
} 