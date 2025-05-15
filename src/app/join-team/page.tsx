'use client';

import { useEffect, useState, JSX } from 'react';
import Link from 'next/link';
import { Users, Home } from 'lucide-react';

export default function JoinTeamPage() {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 80 }, (_, i) => (
      <circle
        key={i}
        cx={Math.random() * 100 + '%'}
        cy={Math.random() * 100 + '%'}
        r={Math.random() * 1.5 + 0.5}
        fill="#fff"
        opacity={Math.random() * 0.7 + 0.3}
      />
    ));
    setStars(arr);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f1a35] via-[#172c5c] to-[#2a0919]">
      {/* Home Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all cursor-pointer shadow-md">
          <Home size={18} />
          <span className="font-medium">Siteye Dön</span>
        </Link>
      </div>
      
      <div className="flex-grow relative w-full flex items-center justify-center overflow-hidden">
        {/* Animated stars */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" className="absolute inset-0">
            {stars}
          </svg>
        </div>
        
        {/* Centered frosted glass box */}
        <div className="relative z-10 flex flex-col items-center justify-center px-8 py-12 rounded-3xl shadow-2xl animate-float" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)' }}>
          <div className="mb-4">
            <Users size={64} className="text-white animate-pulse mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center drop-shadow">Üye Alımları</h1>
          <p className="text-white/90 text-lg md:text-xl text-center max-w-md mb-6 drop-shadow">
            <span className="font-bold text-[#f5b642]">Üye Alımımız Kapalıdır.</span><br />
            Açıldığında duyurular kısmından yayınlanacaktır.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/events/calendar" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#78123e] to-[#a71255] text-white font-bold text-base shadow hover:scale-105 transition-transform duration-200">
              Etkinliklerimize Katıl
            </Link>
            <Link href="/about/team" className="px-6 py-3 rounded-full bg-white/20 text-white font-bold text-base shadow hover:scale-105 transition-transform duration-200 backdrop-blur-sm border border-white/10">
              Ekibimizi Tanı
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(15px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 