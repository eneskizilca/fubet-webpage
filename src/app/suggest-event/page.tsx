'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function SuggestEventPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada form submit işlemleri yapılacak
    alert(`Başlık: ${title}\nAçıklama: ${description}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-white py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#78123e] mb-6 text-center">Etkinlik Öner</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <div>
            <label htmlFor="title" className="block text-lg font-bold text-[#78123e] mb-2">Başlık</label>
            <input
              id="title"
              type="text"
              value="Fırat Nehri Kıyısında Teknoloji ve Doğa Buluşması"
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#78123e] outline-none text-lg"
              placeholder="Etkinlik başlığını girin"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-bold text-[#78123e] mb-2">Açıklama</label>
            <textarea
              id="description"
              value="Fırat Nehri kıyısındaki muhteşem bir alanda,  teknik bir gezi ve eğlenceli takım oyunlarının birleşiminden oluşan bir hafta sonu etkinliği öneriyoruz.  Öncelikle, Elazığ'daki önemli bir teknoloji şirketini ziyaret ederek sektör hakkında bilgi edinme ve liderlik becerilerinizi gözlemleme fırsatı yakalayabilirsiniz. Ardından, nehir kenarında, doğanın içinde yaratıcılığınızı ve takım çalışmanızı ortaya koyacağınız eğlenceli takım oyunları düzenleyebiliriz.  Örneğin, nehir kıyısında bir ip atlama parkuru kurarak ve farklı takım oyunları oynayarak hem eğlenebilir hem de  takım çalışması ve liderlik becerilerinizi geliştirebiliriz.  Bu etkinlikte hem bilgi edinecek hem de eğlenceli vakit geçireceksiniz."
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#78123e] outline-none text-lg min-h-[140px] resize-vertical"
              placeholder="Etkinlik fikrini detaylıca anlat..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#78123e] text-white text-lg font-bold shadow hover:bg-[#5a0e2c] transition cursor-pointer"
          >
            Gönder
          </button>
        </form>
      </main>
    </div>
  );
} 