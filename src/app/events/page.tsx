'use client';
import { useState } from 'react';

// Mock data for events - later this can be replaced with actual API calls
const mockEvents = [
  {
    id: 1,
    title: 'React.js Temel Eğitimi',
    date: '2024-04-15',
    time: '14:00',
    location: 'Mühendislik Fakültesi D-101',
    description: 'Modern web teknolojileri ve React.js ile web geliştirme eğitimi.',
    image: '/event1.jpg',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 2,
    title: 'Microsoft Türkiye Teknik Gezisi',
    date: '2024-04-20',
    time: '09:00',
    location: 'Microsoft Türkiye Ofisi',
    description: 'Microsoft Türkiye ofisine teknik gezi ve networking etkinliği.',
    image: '/event2.jpg',
    category: 'Teknik Geziler'
  },
  {
    id: 3,
    title: 'Yapay Zeka Konferansı',
    date: '2024-05-01',
    time: '10:00',
    location: 'Merkezi Derslik Binası Konferans Salonu',
    description: 'Yapay zeka ve makine öğrenmesi alanındaki son gelişmeler.',
    image: '/event3.jpg',
    category: 'Konferanslar'
  },
  {
    id: 4,
    title: 'Kodlama Kampı',
    date: '2024-05-15',
    time: '14:00',
    location: 'Teknoloji Fakültesi',
    description: '3 günlük yoğun kodlama kampı ve proje geliştirme etkinliği.',
    image: '/event4.jpg',
    category: 'Yazılım Eğitimleri'
  },
  {
    id: 5,
    title: 'Topluluk Kahvaltısı',
    date: '2024-04-25',
    time: '10:00',
    location: 'Üniversite Kafeteryası',
    description: 'Topluluk üyeleri ile kahvaltı ve networking etkinliği.',
    image: '/event5.jpg',
    category: 'Sosyal Faaliyetler'
  }
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents = selectedCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#172c5c] to-[#78123e] px-4 py-8 relative">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_70%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05)_0%,transparent_70%)] animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Etkinliklerimiz</h1>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white text-[#172c5c]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setSelectedCategory('Yazılım Eğitimleri')}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
              selectedCategory === 'Yazılım Eğitimleri'
                ? 'bg-white text-[#172c5c]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Yazılım Eğitimleri
          </button>
          <button
            onClick={() => setSelectedCategory('Teknik Geziler')}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
              selectedCategory === 'Teknik Geziler'
                ? 'bg-white text-[#172c5c]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Teknik Geziler
          </button>
          <button
            onClick={() => setSelectedCategory('Konferanslar')}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
              selectedCategory === 'Konferanslar'
                ? 'bg-white text-[#172c5c]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Konferanslar
          </button>
          <button
            onClick={() => setSelectedCategory('Sosyal Faaliyetler')}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
              selectedCategory === 'Sosyal Faaliyetler'
                ? 'bg-white text-[#172c5c]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Sosyal Faaliyetler
          </button>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#78123e] text-white px-3 py-1 rounded-full text-sm">
                  {event.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#172c5c] mb-2">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date} - {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                </div>
                <p className="mt-4 text-gray-600">{event.description}</p>
                <button className="mt-6 w-full bg-[#78123e] text-white py-2 rounded-xl hover:bg-[#601031] transition-colors cursor-pointer">
                  Detayları Gör
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 