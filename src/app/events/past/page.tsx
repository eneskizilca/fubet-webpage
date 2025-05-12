'use client';

export default function PastEventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#172c5c] to-[#78123e] px-4 py-8 relative">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_70%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05)_0%,transparent_70%)] animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Geçmiş Etkinlikler</h1>
        {/* Past events content will go here */}
      </div>
    </div>
  );
} 