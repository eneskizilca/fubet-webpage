'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { 
  Users, 
  Palette, 
  Calendar, 
  Lightbulb, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Github, 
  ChevronRight,
  ChevronDown,
  Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { SuggestEventHoverProvider } from '@/context/SuggestEventHoverContext';

interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  social?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface Department {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  members: TeamMember[];
}

// Placeholder görsel URL'i
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

const departments: Department[] = [
  {
    id: 'social-media',
    name: 'SOSYAL MEDYA KOORDİNATÖRLÜĞÜ',
    icon: <Instagram className="w-10 h-10" />,
    description: 'Topluluğun dijital platformlarını yöneten, içerik stratejilerini belirleyen ve sosyal medya üzerinden etkin iletişimi sağlayan ekibimiz.',
    members: [
      {
        name: "Elif Kaya",
        role: "Sosyal Medya Koordinatörü",
        department: "Yazılım Mühendisliği",
        image: PLACEHOLDER_IMAGE,
        social: {
          instagram: "https://instagram.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "Burak Demir",
        role: "İçerik Uzmanı",
        department: "Bilgisayar Mühendisliği",
        image: PLACEHOLDER_IMAGE,
        social: {
          instagram: "https://instagram.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "Zeynep Şahin",
        role: "Topluluk Yöneticisi",
        department: "Elektrik-Elektronik Mühendisliği",
        image: PLACEHOLDER_IMAGE,
        social: {
          instagram: "https://instagram.com",
          twitter: "https://twitter.com"
        }
      }
    ]
  },
  {
    id: 'graphic-design',
    name: 'GRAFİK TASARIM KOORDİNATÖRLÜĞÜ',
    icon: <Palette className="w-10 h-10" />,
    description: 'Topluluğun görsel kimliğini oluşturan, etkinlikler için tasarımlar hazırlayan ve dijital içerikleri şekillendiren kreatif ekibimiz.',
    members: [
      {
        name: "Can Yıldız",
        role: "Grafik Tasarım Koordinatörü",
        department: "Grafik Tasarım",
        image: PLACEHOLDER_IMAGE,
        social: {
          instagram: "https://instagram.com",
          github: "https://github.com"
        }
      },
      {
        name: "Selin Öztürk",
        role: "UI/UX Tasarımcısı",
        department: "Yazılım Mühendisliği",
        image: PLACEHOLDER_IMAGE,
        social: {
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        }
      }
    ]
  },
  {
    id: 'events',
    name: 'ETKİNLİK VE SPONSORLUK KOORDİNATÖRLÜĞÜ',
    icon: <Calendar className="w-10 h-10" />,
    description: 'Topluluğun etkinliklerini planlayan, organize eden ve değerli sponsorlarla iş birliklerini yürüten dinamik ekibimiz.',
    members: [
      {
        name: "Ahmet Yılmaz",
        role: "Etkinlik Koordinatörü",
        department: "İşletme",
        image: PLACEHOLDER_IMAGE,
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com"
        }
      },
      {
        name: "Ayşe Demir",
        role: "Sponsorluk Sorumlusu",
        department: "Uluslararası İlişkiler",
        image: PLACEHOLDER_IMAGE,
        social: {
          instagram: "https://instagram.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "Mehmet Kaya",
        role: "Lojistik Sorumlusu",
        department: "Endüstri Mühendisliği",
        image: PLACEHOLDER_IMAGE
      }
    ]
  },
  {
    id: 'research',
    name: 'AR-GE KOORDİNATÖRLÜĞÜ',
    icon: <Lightbulb className="w-10 h-10" />,
    description: 'Yeni teknolojileri araştıran, inovatif projeler geliştiren ve topluluğun teknik altyapısını güçlendiren uzman ekibimiz.',
    members: [
      {
        name: "Deniz Arslan",
        role: "AR-GE Koordinatörü",
        department: "Bilgisayar Mühendisliği",
        image: PLACEHOLDER_IMAGE,
        social: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "Ece Şahin",
        role: "Yazılım Geliştirici",
        department: "Yazılım Mühendisliği",
        image: PLACEHOLDER_IMAGE,
        social: {
          github: "https://github.com"
        }
      },
      {
        name: "Mert Öztürk",
        role: "Veri Bilimci",
        department: "Bilgisayar Mühendisliği",
        image: PLACEHOLDER_IMAGE,
        social: {
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        }
      }
    ]
  }
];

// Topluluk Başkanı
const president = {
  name: "Onur Eren Ejder",
  role: "Topluluk Başkanı",
  department: "Yazılım Mühendisliği/Makine Mühendisliği",
  image: PLACEHOLDER_IMAGE,
  social: {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
};

export default function TeamPage() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [presidentVisible, setPresidentVisible] = useState(false);

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
              if (id === 'president-section') {
                setPresidentVisible(true);
              } else {
                setVisibleSections(prev => {
                  if (!prev.includes(id)) {
                    return [...prev, id];
                  }
                  return prev;
                });
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe each section
    departments.forEach(dept => {
      const element = document.getElementById(dept.id);
      if (element) {
        observer.observe(element);
      }
    });
    
    // Observe president section
    const presidentSection = document.getElementById('president-section');
    if (presidentSection) {
      observer.observe(presidentSection);
    }

    return () => {
      departments.forEach(dept => {
        const element = document.getElementById(dept.id);
        if (element) {
          observer.unobserve(element);
        }
      });
      
      if (presidentSection) {
        observer.unobserve(presidentSection);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    if (window) {
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SuggestEventHoverProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#0f1a35] via-[#172c5c] to-[#2a0919]">
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-16">
          <div className="text-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Ekibimizle <span className="text-[#f5b642]">Tanışın</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl mb-12 animate-fade-in-delay">
              Fırat Üniversitesi Bilişim ve Eğitim Topluluğu'nun başarısının arkasındaki
              yetenekli ve tutkulu ekip üyelerimiz.
            </p>
            <button 
              onClick={scrollToNextSection}
              className="animate-bounce mt-8 bg-white/10 p-3 rounded-full text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#78123e] blur-[120px] opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#172c5c] blur-[150px] opacity-30"></div>
          </div>
        </section>

        {/* President Section */}
        <section 
          id="president-section"
          className="min-h-screen py-24 px-4 relative bg-[#0c162b]/40"
        >
          <div className="container mx-auto max-w-4xl">
            <div className={`flex flex-col items-center ${presidentVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="mb-8 flex flex-col items-center">
                <div className="p-3 rounded-full bg-[#78123e] text-white mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center">TOPLULUK BAŞKANI</h2>
              </div>
              
              <div className={`bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 transform w-full max-w-xl mx-auto ${
                presidentVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#78123e]/30">
                  {president.image.startsWith('http') ? (
                    <img
                      src={president.image}
                      alt={president.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src={president.image}
                      alt={president.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                  {president.name}
                </h3>
                <p className="text-[#f5b642] font-medium text-center text-xl mb-2">
                  {president.role}
                </p>
                <p className="text-white/60 text-center mb-6">
                  {president.department}
                </p>
                
                <p className="text-white/80 text-center mb-6">
                  "Topluluğumuz, öğrencilerin profesyonel ve kişisel gelişimlerine katkıda bulunmak, 
                  teknoloji ve eğitim alanında yenilikçi projeler geliştirmek amacıyla kurulmuştur. 
                  Birlikte öğreniyor, birlikte büyüyoruz."
                </p>
                
                {president.social && (
                  <div className="flex justify-center gap-4">
                    {president.social.instagram && (
                      <a href={president.social.instagram} target="_blank" rel="noopener noreferrer" 
                         className="text-white/60 hover:text-[#E1306C] transition-colors">
                        <Instagram className="w-6 h-6" />
                      </a>
                    )}
                    {president.social.twitter && (
                      <a href={president.social.twitter} target="_blank" rel="noopener noreferrer" 
                         className="text-white/60 hover:text-[#1DA1F2] transition-colors">
                        <Twitter className="w-6 h-6" />
                      </a>
                    )}
                    {president.social.linkedin && (
                      <a href={president.social.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="text-white/60 hover:text-[#0077b5] transition-colors">
                        <Linkedin className="w-6 h-6" />
                      </a>
                    )}
                    {president.social.github && (
                      <a href={president.social.github} target="_blank" rel="noopener noreferrer" 
                         className="text-white/60 hover:text-white transition-colors">
                        <Github className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#78123e] blur-[150px] opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#172c5c] blur-[100px] opacity-20"></div>
          </div>
        </section>

        {/* Department Sections */}
        {departments.map((dept, index) => (
          <section 
            key={dept.id}
            id={dept.id}
            className={`min-h-screen py-24 px-4 relative ${index % 2 === 0 ? 'bg-[#1e1a31]/30' : 'bg-[#0c162b]/40'}`}
          >
            <div className="container mx-auto max-w-6xl">
              <div className={`flex flex-col items-center ${visibleSections.includes(dept.id) ? 'animate-slide-up' : 'opacity-0'}`}>
                <div className="flex flex-col items-center mb-8">
                  <div className="p-4 rounded-xl bg-[#78123e] text-white mb-4">
                    {dept.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white text-center">{dept.name}</h2>
                </div>
                
                <p className="text-white/80 mb-16 text-lg max-w-3xl text-center">{dept.description}</p>
                
                <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl mx-auto">
                  {dept.members.map((member, memberIndex) => (
                    <div 
                      key={memberIndex}
                      className={`bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/10 transform flex-1 min-w-[280px] max-w-[320px] ${
                        visibleSections.includes(dept.id) 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-10 opacity-0'
                      }`}
                      style={{ 
                        transitionDelay: `${memberIndex * 150}ms`,
                        animationDelay: `${memberIndex * 150}ms` 
                      }}
                    >
                      <div className="relative w-32 h-32 mx-auto mb-6 rounded-xl overflow-hidden">
                        {member.image.startsWith('http') ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">
                        {member.name}
                      </h3>
                      <p className="text-[#f5b642] font-medium text-center mb-1">
                        {member.role}
                      </p>
                      <p className="text-white/60 text-sm text-center mb-4">
                        {member.department}
                      </p>
                      
                      {member.social && (
                        <div className="flex justify-center gap-3">
                          {member.social.instagram && (
                            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" 
                               className="text-white/60 hover:text-[#E1306C] transition-colors">
                              <Instagram className="w-5 h-5" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" 
                               className="text-white/60 hover:text-[#1DA1F2] transition-colors">
                              <Twitter className="w-5 h-5" />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" 
                               className="text-white/60 hover:text-[#0077b5] transition-colors">
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                          {member.social.github && (
                            <a href={member.social.github} target="_blank" rel="noopener noreferrer" 
                               className="text-white/60 hover:text-white transition-colors">
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {index % 2 === 1 ? (
                <>
                  <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-[#78123e] blur-[130px] opacity-20"></div>
                  <div className="absolute bottom-1/4 right-20 w-64 h-64 rounded-full bg-[#172c5c] blur-[100px] opacity-20"></div>
                </>
              ) : (
                <>
                  <div className="absolute top-1/4 right-10 w-80 h-80 rounded-full bg-[#3a0d27] blur-[150px] opacity-15"></div>
                  <div className="absolute bottom-1/3 left-20 w-96 h-96 rounded-full bg-[#172c5c] blur-[120px] opacity-20"></div>
                </>
              )}
            </div>
          </section>
        ))}

        {/* Join Us Section */}
        <section className="min-h-[50vh] flex flex-col justify-center items-center px-4 py-20 relative">
          <div className="text-center z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Ekibimizin Bir Parçası <span className="text-[#f5b642]">Olmak İster misiniz?</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg mb-12">
              Yeteneklerinizi ve tutkularınızı bizimle paylaşın. FÜBET ailesine katılın ve birlikte geleceği şekillendirelim.
            </p>
            <Link 
              href="/join-team"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#78123e] to-[#a71255] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-[#78123e]/30 transition-all duration-300 cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span>Ekibimize Katılın</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#78123e] blur-[200px] opacity-20"></div>
          </div>
        </section>

        <style jsx global>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fade-in-delay {
            0% { opacity: 0; transform: translateY(20px); }
            20% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fade-in 1s ease forwards;
          }
          
          .animate-fade-in-delay {
            animation: fade-in-delay 1.4s ease forwards;
          }
          
          .animate-slide-up {
            animation: slide-up 0.8s ease forwards;
          }
        `}</style>
      </div>
    </SuggestEventHoverProvider>
  );
} 