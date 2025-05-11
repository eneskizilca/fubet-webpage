'use client';

import { useEffect, useState, JSX } from 'react';

export default function MaintenancePage() {
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(120deg, #172c5c 60%, #78123e 100%)' }}>
      {/* Animated stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ minHeight: '100vh' }}>
          {stars}
        </svg>
      </div>
      {/* Centered frosted glass box */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-12 rounded-3xl shadow-2xl animate-float" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)' }}>
        <div className="mb-4">
          <img src="/disli-cark.png" alt="Dişli Çark" width={64} height={64} className="animate-spin-slow mx-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center drop-shadow">Bakım Çalışması</h1>
        <p className="text-white/90 text-lg text-center max-w-md mb-4 drop-shadow">
          Sitemiz şu anda bakımda. Daha iyi hizmet verebilmek için çalışıyoruz.<br />
          Kısa süre içinde tekrar hizmetinizdeyiz.
        </p>
        <a href="mailto:fubet@firat.edu.tr" className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#78123e] to-[#172c5c] text-white font-bold text-lg shadow hover:scale-105 transition-transform duration-200">
          İletişim
        </a>
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(18px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
} 