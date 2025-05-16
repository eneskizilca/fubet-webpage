'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { 
  Users, 
  Target, 
  Compass, 
  Lightbulb, 
  Award,
  Clock, 
  ChevronDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { SuggestEventHoverProvider } from '@/context/SuggestEventHoverContext';

interface ValueItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function AboutUsPage() {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const values: ValueItem[] = [
    {
      title: "Yenilikçilik",
      description: "Sürekli olarak yeni fikirler ve teknolojiler peşinde koşar, kendimizi ve topluluğumuzu geliştiririz.",
      icon: <Lightbulb className="w-10 h-10" />
    },
    {
      title: "İşbirliği",
      description: "Birlikte çalışarak daha güçlü olduğumuza inanır, ekip çalışmasını ve dayanışmayı teşvik ederiz.",
      icon: <Users className="w-10 h-10" />
    },
    {
      title: "Mükemmellik",
      description: "Her projemizde ve etkinliğimizde en yüksek kaliteyi hedefler, sürekli gelişim için çabalarız.",
      icon: <Award className="w-10 h-10" />
    },
    {
      title: "Sürdürülebilirlik",
      description: "Uzun vadeli düşünür, hem topluluğumuzun hem de projelerimizin sürdürülebilir olmasını sağlarız.",
      icon: <Clock className="w-10 h-10" />
    }
  ];

  return (
    <SuggestEventHoverProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#0f1a35] via-[#172c5c] to-[#2a0919]">
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-16">
          <div className="text-center z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Biz <span className="text-[#f5b642]">Kimiz?</span>
            </h1>
            <p className="text-white/70 mx-auto text-lg md:text-xl mb-12 animate-fade-in-delay">
              Fırat Üniversitesi Bilişim ve Eğitim Topluluğu (FÜBET) olarak teknoloji, 
              eğitim ve gelişimi bir araya getiren dinamik bir öğrenci topluluğuyuz.
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

        {/* About Section */}
        <section id="about-section" className="py-20 px-4 relative bg-[#1e1a31]/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Hakkımızda</h2>
              <p className="text-white/70 max-w-4xl mx-auto text-lg">
                FÜBET, 2022 yılında Fırat Üniversitesi öğrencileri tarafından bilişim ve eğitim alanlarında 
                öğrencilere destek olmak, teknoloji ve inovasyon konularında farkındalık oluşturmak amacıyla kurulmuştur. 
                Topluluğumuz, öğrencilerin mesleki ve kişisel gelişimlerini destekleyen etkinlikler düzenlemekte ve 
                projeler geliştirmektedir.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
                <div className="bg-[#78123e] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Misyonumuz</h3>
                <p className="text-white/70 leading-relaxed">
                  Fırat Üniversitesi öğrencilerine bilişim, teknoloji ve eğitim alanlarında 
                  güncel bilgiler sunmak, akademik ve sosyal gelişimlerine katkıda bulunmak, 
                  yenilikçi projeler geliştirerek üniversite-sanayi işbirliğini güçlendirmek ve 
                  mezuniyet sonrası kariyer fırsatlarına hazırlamaktır.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
                <div className="bg-[#78123e] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Vizyonumuz</h3>
                <p className="text-white/70 leading-relaxed">
                  Bilişim ve eğitim alanlarında Türkiye'nin en yenilikçi ve etkin öğrenci topluluklarından biri olmak, 
                  öğrencilere gelecekte ihtiyaç duyacakları bilgi ve becerileri kazandırmak, 
                  ulusal ve uluslararası projelerle üniversitemizi temsil etmek ve 
                  mezunlarımızın iş dünyasında aranan profesyoneller olmalarını sağlamaktır.
                </p>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#78123e] blur-[150px] opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#172c5c] blur-[100px] opacity-20"></div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 px-4 relative bg-[#0c162b]/40">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Değerlerimiz</h2>
              <p className="text-white/70 max-w-4xl mx-auto text-lg">
                FÜBET olarak çalışmalarımızda ve etkinliklerimizde bizi yönlendiren temel değerlerimiz:
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-[#78123e] w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{value.title}</h3>
                  <p className="text-white/70 text-center">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-10 w-80 h-80 rounded-full bg-[#3a0d27] blur-[150px] opacity-15"></div>
            <div className="absolute bottom-1/3 left-20 w-96 h-96 rounded-full bg-[#172c5c] blur-[120px] opacity-20"></div>
          </div>
        </section>
        
        {/* What We Do Section */}
        <section className="py-20 px-4 relative bg-[#1e1a31]/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Neler Yapıyoruz?</h2>
              <p className="text-white/70 max-w-4xl mx-auto text-lg">
                FÜBET olarak öğrencilerin gelişimine katkıda bulunmak için çeşitli etkinlikler ve projeler düzenliyoruz:
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Etkinlikler ve Seminerler</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Teknoloji ve bilişim alanında uzman konuşmacıların katılımıyla seminerler, atölye çalışmaları ve 
                  paneller düzenliyoruz. Öğrencilerin sektördeki profesyonellerle buluşmasını sağlıyoruz.
                </p>
                <Link href="/events/calendar" className="text-[#f5b642] hover:underline inline-flex items-center">
                  Etkinlik takvimine göz atın
                  <ChevronDown className="w-4 h-4 ml-1 rotate-[270deg]" />
                </Link>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Projeler ve Yarışmalar</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Öğrencilerin teorik bilgilerini pratiğe dökebilecekleri projeler geliştiriyor ve 
                  ulusal/uluslararası yarışmalara katılımlarını destekliyoruz. Hackathonlar ve code jams etkinlikleri düzenliyoruz.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Eğitimler ve Workshoplar</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Programlama dilleri, veri bilimi, yapay zeka, tasarım ve dijital pazarlama gibi 
                  alanlarda düzenli eğitimler düzenliyoruz. Öğrencilerin pratik becerilerini geliştirmelerini sağlıyoruz.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Sosyal Sorumluluk Projeleri</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Teknoloji ve eğitim alanında farkındalık oluşturmak amacıyla sosyal sorumluluk projeleri 
                  gerçekleştiriyoruz. Özellikle dezavantajlı grupların teknolojiye erişimini kolaylaştırmayı hedefliyoruz.
                </p>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-[#78123e] blur-[130px] opacity-20"></div>
            <div className="absolute bottom-1/4 right-20 w-64 h-64 rounded-full bg-[#172c5c] blur-[100px] opacity-20"></div>
          </div>
        </section>
        
        {/* Join Us Section */}
        <section className="min-h-[50vh] flex flex-col justify-center items-center px-4 py-20 relative">
          <div className="text-center z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              FÜBET Ailesinin Bir Parçası <span className="text-[#f5b642]">Olmak İster misiniz?</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg mb-12">
              Topluluğumuza katılarak etkinliklerimizden faydalanabilir, projelerimizde yer alabilir 
              ve mesleki/kişisel gelişiminize katkı sağlayabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#78123e] to-[#a71255] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-[#78123e]/30 transition-all duration-300 cursor-pointer"
              >
                <Users className="w-5 h-5" />
                <span>Topluluğumuza Katılın</span>
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <span>Bize Ulaşın</span>
              </Link>
            </div>
          </div>
          
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#78123e] blur-[200px] opacity-20"></div>
          </div>
        </section>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }

          .animate-fade-in-delay {
            animation: fade-in 0.5s ease-out 0.2s forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    </SuggestEventHoverProvider>
  );
} 