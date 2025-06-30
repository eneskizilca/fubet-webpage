'use client';
import { useState } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { CalendarIcon, Clock, MapPin, Users, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Geçmiş etkinlikler için mock veri
const pastEvents = [
  {
    id: 1,
    title: 'React.js Temel Eğitimi',
    date: '2023-11-15',
    location: 'Mühendislik Fakültesi D-101',
    description: 'Modern web teknolojileri ve React.js ile web geliştirme eğitimi. Katılımcılar React.js\'in temel prensiplerini öğrendi ve basit uygulamalar geliştirdi. Etkinlikte React hooks, component yapısı, state management ve routing konuları ele alındı. Katılan herkes temel bir React uygulaması geliştirme becerisini kazandı.',
    category: 'Yazılım Eğitimleri',
    images: [
      '/images/events/react-workshop-1.jpg',
      '/images/events/react-workshop-2.jpg',
      '/images/events/react-workshop-3.jpg',
    ],
    attendance: 45
  },
  {
    id: 2,
    title: 'Microsoft Türkiye Teknik Gezisi',
    date: '2023-10-20',
    location: 'Microsoft Türkiye Ofisi',
    description: 'Microsoft Türkiye ofisine düzenlediğimiz teknik gezi ve networking etkinliği. Öğrencilerimiz Microsoft\'un çalışma ortamını yakından tanıma fırsatı buldu ve şirket mühendisleri ile tanıştı. Gezi kapsamında ofis turu yapıldı, Microsoft\'un güncel projeleri hakkında bilgi verildi ve kariyer olanaklarından bahsedildi. Microsoft çalışanları ile yapılan soru-cevap oturumu büyük ilgi gördü.',
    category: 'Teknik Geziler',
    images: [
      '/images/events/microsoft-trip-1.jpg',
      '/images/events/microsoft-trip-2.jpg',
      '/images/events/microsoft-trip-3.jpg',
    ],
    attendance: 30
  },
  {
    id: 3,
    title: 'Yapay Zeka Konferansı',
    date: '2023-09-05',
    location: 'Merkezi Derslik Binası Konferans Salonu',
    description: 'Yapay zeka ve makine öğrenmesi alanındaki son gelişmelerin tartışıldığı konferansımız. Alanında uzman konuşmacılar yapay zekanın günümüz ve gelecekteki uygulamaları hakkında sunumlar yaptı. Konferansta derin öğrenme, doğal dil işleme, bilgisayarlı görü ve etik yapay zeka kullanımı konuları ele alındı. Yoğun katılım gösteren etkinlikte interaktif demolar da gerçekleştirildi.',
    category: 'Konferanslar',
    images: [
      '/images/events/ai-conference-1.jpg',
      '/images/events/ai-conference-2.jpg',
      '/images/events/ai-conference-3.jpg',
    ],
    attendance: 120
  },
  {
    id: 4,
    title: 'Kodlama Kampı',
    date: '2023-08-15',
    location: 'Teknoloji Fakültesi',
    description: '3 günlük yoğun kodlama kampı ve proje geliştirme etkinliğimiz. Öğrenciler takımlar halinde çalışarak gerçek dünya problemlerine çözüm üreten projeler geliştirdi. Kamp süresince web uygulamaları, mobil uygulamalar ve IoT projeleri üzerinde çalışıldı. Kapanışta yapılan proje sunumlarında en iyi projeler seçildi ve ödüllendirildi. Tüm katılımcılar yoğun ama verimli bir deneyim yaşadıklarını belirtti.',
    category: 'Yazılım Eğitimleri',
    images: [
      '/images/events/coding-camp-1.jpg',
      '/images/events/coding-camp-2.jpg',
      '/images/events/coding-camp-3.jpg',
    ],
    attendance: 50
  },
  {
    id: 5,
    title: 'Topluluk Kahvaltısı',
    date: '2023-07-25',
    location: 'Üniversite Kafeteryası',
    description: 'Topluluk üyeleri ile düzenlediğimiz kahvaltı ve networking etkinliği. Üyelerimiz rahat bir ortamda tanışma ve kaynaşma fırsatı buldu. Etkinlikte gelecek dönem planlarımız hakkında bilgi verildi ve üyelerden geri bildirimler alındı. Kahvaltının ardından yapılan mini atölye çalışmasında yaratıcı fikirler ortaya çıktı ve gelecek etkinliklerimiz için ilham kaynağı oldu.',
    category: 'Sosyal Faaliyetler',
    images: [
      '/images/events/community-breakfast-1.jpg',
      '/images/events/community-breakfast-2.jpg',
      '/images/events/community-breakfast-3.jpg',
    ],
    attendance: 35
  },
  {
    id: 6,
    title: 'Flutter Workshop',
    date: '2023-06-20',
    location: 'Bilgisayar Mühendisliği Lab',
    description: 'Flutter ile cross-platform mobil uygulama geliştirme konulu pratik eğitim workshop\'umuz. Katılımcılar Flutter framework\'ünün temellerini öğrendi ve basit bir mobil uygulama geliştirdi. Etkinlikte Dart dili, widget yapısı, state management ve Firebase entegrasyonu konuları işlendi. Katılımcılar kendi bilgisayarlarında uygulama geliştirerek pratik yapma şansı buldu ve tüm platformlarda çalışan uygulamalar geliştirmenin avantajlarını keşfetti.',
    category: 'Yazılım Eğitimleri',
    images: [
      '/images/events/flutter-workshop-1.jpg',
      '/images/events/flutter-workshop-2.jpg',
      '/images/events/flutter-workshop-3.jpg',
    ],
    attendance: 40
  },
  {
    id: 7,
    title: 'Startup Hikayeleri',
    date: '2023-05-25',
    location: 'İşletme Fakültesi Amfi',
    description: 'Başarılı girişimcilerden startup hikayeleri ve deneyim paylaşımı etkinliğimiz. Farklı sektörlerden davet edilen girişimciler kendi hikayelerini, başarılarını ve karşılaştıkları zorlukları paylaştı. Katılımcılar girişimcilik ekosistemi hakkında değerli bilgiler edindi ve ilham verici başarı hikayeleri dinledi. Etkinlik sonunda networking oturumunda girişimcilerle birebir görüşme fırsatı yakalandı.',
    category: 'Konferanslar',
    images: [
      '/images/events/startup-stories-1.jpg',
      '/images/events/startup-stories-2.jpg',
      '/images/events/startup-stories-3.jpg',
    ],
    attendance: 80
  },
  {
    id: 8,
    title: 'Google Cloud Günü',
    date: '2023-04-10',
    location: 'Merkezi Derslik Binası',
    description: 'Google Cloud teknolojileri ve kullanım alanları hakkında kapsamlı bir etkinlik düzenledik. Google\'dan gelen uzmanlar bulut bilişimin temellerini ve Google Cloud Platform\'un sunduğu hizmetleri tanıttı. Workshop kısmında katılımcılar cloud üzerinde uygulama deploymentı, database yönetimi ve machine learning servislerini deneyimleme fırsatı buldu. Etkinlik sonunda katılımcılara Google Cloud kredileri ve sertifikalar dağıtıldı.',
    category: 'Teknik Eğitimler',
    images: [
      '/images/events/google-cloud-1.jpg',
      '/images/events/google-cloud-2.jpg',
      '/images/events/google-cloud-3.jpg',
    ],
    attendance: 65
  }
];

export default function PastEventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlides, setCurrentSlides] = useState<Record<number, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [modalSlide, setModalSlide] = useState(0);
  const eventsPerPage = 4;
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtreleme işlemleri için
  const filteredEvents = selectedCategory === 'all' 
    ? pastEvents 
    : pastEvents.filter(event => event.category === selectedCategory);

  // Pagination hesaplamaları
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = Math.min(startIndex + eventsPerPage, filteredEvents.length);
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevSlide = (eventId: number) => {
    setCurrentSlides((prev) => {
      const currentSlide = prev[eventId] || 0;
      const event = filteredEvents.find(e => e.id === eventId);
      if (!event) return prev;
      
      const newSlide = currentSlide === 0 ? event.images.length - 1 : currentSlide - 1;
      return { ...prev, [eventId]: newSlide };
    });
  };

  const handleNextSlide = (eventId: number) => {
    setCurrentSlides((prev) => {
      const currentSlide = prev[eventId] || 0;
      const event = filteredEvents.find(e => e.id === eventId);
      if (!event) return prev;
      
      const newSlide = currentSlide === event.images.length - 1 ? 0 : currentSlide + 1;
      return { ...prev, [eventId]: newSlide };
    });
  };

  const getCurrentSlide = (eventId: number) => {
    return currentSlides[eventId] || 0;
  };

  // Modal slider için fonksiyonlar
  const openModal = (eventId: number) => {
    setSelectedEvent(eventId);
    setModalSlide(getCurrentSlide(eventId));
    setModalOpen(true);
    // Sayfa kaydırmayı engelle
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
    // Sayfa kaydırmayı tekrar etkinleştir
    document.body.style.overflow = 'auto';
  };

  const handleModalPrevSlide = () => {
    if (selectedEvent === null) return;
    
    const event = filteredEvents.find(e => e.id === selectedEvent);
    if (!event) return;
    
    setModalSlide(prev => (prev === 0 ? event.images.length - 1 : prev - 1));
  };

  const handleModalNextSlide = () => {
    if (selectedEvent === null) return;
    
    const event = filteredEvents.find(e => e.id === selectedEvent);
    if (!event) return;
    
    setModalSlide(prev => (prev === event.images.length - 1 ? 0 : prev + 1));
  };

  // Tarihi formatla: "15 Kasım 2023" gibi
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getSelectedEventImages = () => {
    if (selectedEvent === null) return [];
    const event = filteredEvents.find(e => e.id === selectedEvent);
    return event ? event.images : [];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-br from-[#172c5c] to-[#78123e] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with simple animation */}
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">Etkinlikler</h1>
            <p className="text-white/80 mb-8 max-w-3xl mx-auto">
              Yazılım ve teknoloji dünyasının geleceğini birlikte keşfetmeye hazır mısınız? E tabii biraz da eğlenmeyi unutmayalım...
            </p>
          </div>
          
          {/* Category Filter with delayed animation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-delay-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#172c5c]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setSelectedCategory('Yazılım Eğitimleri')}
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedCategory === 'Yazılım Eğitimleri'
                  ? 'bg-white text-[#172c5c]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Yazılım Eğitimleri
            </button>
            <button
              onClick={() => setSelectedCategory('Teknik Geziler')}
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedCategory === 'Teknik Geziler'
                  ? 'bg-white text-[#172c5c]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Teknik Geziler
            </button>
            <button
              onClick={() => setSelectedCategory('Konferanslar')}
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedCategory === 'Konferanslar'
                  ? 'bg-white text-[#172c5c]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Konferanslar
            </button>
            <button
              onClick={() => setSelectedCategory('Sosyal Faaliyetler')}
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedCategory === 'Sosyal Faaliyetler'
                  ? 'bg-white text-[#172c5c]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Sosyal Faaliyetler
            </button>
          </div>
          
          {/* Events Section */}
          <div className="animate-fade-in-delay-2">
            <h2 className="text-2xl font-bold text-white mb-6">Etkinliklerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-700 hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-stagger`}
                  style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                >
                  <div className="relative">
                    {/* Slider */}
                    <div className="relative h-[200px]">
                      {event.images.map((image, index) => (
                        <div 
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            getCurrentSlide(event.id) === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${event.title} etkinliği fotoğrafı ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      
                      {/* Slider Kontrolleri */}
                      <button 
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10 transition-colors"
                        onClick={(e) => { e.stopPropagation(); handlePrevSlide(event.id); }}
                        aria-label="Önceki"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10 transition-colors"
                        onClick={(e) => { e.stopPropagation(); handleNextSlide(event.id); }}
                        aria-label="Sonraki"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      {/* Slide Göstergesi */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {event.images.map((_, index) => (
                          <div 
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              getCurrentSlide(event.id) === index ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Event Content */}
                    <div className="p-5">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      </div>
                      
                      <p className="text-white/90 mb-4 text-sm line-clamp-3">{event.description}</p>
                      
                      <div className="flex justify-center">
                        <button 
                          onClick={() => openModal(event.id)}
                          className="bg-white text-[#172c5c] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                        >
                          Fotoğrafları Gör
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2 animate-fade-in-delay-3">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                    currentPage === 1
                      ? 'bg-white/30 text-white/50 cursor-not-allowed'
                      : 'bg-white text-[#172c5c] hover:bg-white/90 cursor-pointer'
                  } font-medium`}
                >
                  Önceki
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 rounded-full transition-all duration-300 hover:scale-105 ${
                        currentPage === index + 1
                          ? 'bg-white text-[#172c5c]'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      } font-medium`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                    currentPage === totalPages
                      ? 'bg-white/30 text-white/50 cursor-not-allowed'
                      : 'bg-white text-[#172c5c] hover:bg-white/90 cursor-pointer'
                  } font-medium`}
                >
                  Sonraki
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Slider */}
      {modalOpen && selectedEvent !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-5xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kapatma Butonu */}
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full z-50 hover:bg-black/70 transition-colors"
              onClick={closeModal}
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Modal Slider */}
            <div className="relative aspect-video">
              {getSelectedEventImages().map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    modalSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Etkinlik fotoğrafı ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Modal Slider Kontrolleri */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-50 transition-colors"
              onClick={handleModalPrevSlide}
              aria-label="Önceki"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-50 transition-colors"
              onClick={handleModalNextSlide}
              aria-label="Sonraki"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            {/* Modal Slide Göstergesi */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
              {getSelectedEventImages().map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    modalSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Simple CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 0.6s ease-out 0.8s forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
} 