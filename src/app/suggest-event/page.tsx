'use client';

import Navbar from '@/components/Navbar';

export default function SuggestEventPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-white py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#78123e] mb-6 text-center">Etkinlik Öner</h1>
        <p className="text-gray-700 text-lg text-center max-w-xl mb-8">
          Buraya farklı bir içerik eklenecek.
        </p>
      </main>
    </div>
  );
} 