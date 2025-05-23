'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const QUESTIONS = [
  {
    question: 'Hangi etkinlik türleri seni daha çok motive eder?',
    options: [
      { label: 'Atölye', icon: '🛠️' },
      { label: 'Seminer', icon: '🎤' },
      { label: 'Hackathon', icon: '💻' },
      { label: 'Sosyal Sorumluluk', icon: '🤲' },
      { label: 'Teknik Gezi', icon: '🚌' },
      { label: 'Yarışma', icon: '🏆' },
      { label: 'Eğlence', icon: '🎉' },
      { label: 'Spor', icon: '⚽' },
      { label: 'Sanat', icon: '🎨' },
    ],
  },
  {
    question: 'Hangi becerileri geliştirmek istersin?',
    options: [
      { label: 'Liderlik', icon: '🦸' },
      { label: 'Takım Çalışması', icon: '🤼' },
      { label: 'Yazılım', icon: '💻' },
      { label: 'Sunum', icon: '🗣️' },
      { label: 'Yaratıcılık', icon: '💡' },
      { label: 'İletişim', icon: '📞' },
      { label: 'Problem Çözme', icon: '🧩' },
      { label: 'Zaman Yönetimi', icon: '⏰' },
      { label: 'Girişimcilik', icon: '🚀' },
    ],
  },
  {
    question: 'Etkinliklerde hangi ortamları tercih edersin?',
    options: [
      { label: 'Açık Hava', icon: '🌳' },
      { label: 'Kapalı Alan', icon: '🏢' },
      { label: 'Online', icon: '💻' },
      { label: 'Kampüs', icon: '🏫' },
      { label: 'Şehir Dışı', icon: '🗺️' },
      { label: 'Küçük Grup', icon: '👥' },
      { label: 'Büyük Grup', icon: '👨‍👩‍👧‍👦' },
      { label: 'Resmi', icon: '🕴️' },
      { label: 'Gayriresmi', icon: '🧢' },
    ],
  },
  {
    question: 'Etkinlikten beklentin nedir?',
    options: [
      { label: 'Bilgi Edinmek', icon: '📚' },
      { label: 'Eğlenmek', icon: '😄' },
      { label: 'Ağ Kurmak', icon: '🔗' },
      { label: 'İlham Almak', icon: '✨' },
      { label: 'Kariyer Fırsatı', icon: '💼' },
      { label: 'Topluma Katkı', icon: '🌟' },
      { label: 'Yarışmak', icon: '🏁' },
      { label: 'Öğretmek', icon: '👨‍🏫' },
      { label: 'Deneyim Kazanmak', icon: '🧪' },
    ],
  },
  {
    question: 'Etkinlik süresi tercihin nedir?',
    options: [
      { label: '1 Saat', icon: '⏱️' },
      { label: 'Yarım Gün', icon: '🌗' },
      { label: '1 Gün', icon: '🌞' },
      { label: 'Hafta Sonu', icon: '📆' },
      { label: '1 Hafta', icon: '🗓️' },
      { label: 'Uzun Süreli', icon: '🔄' },
      { label: 'Akşam', icon: '🌙' },
      { label: 'Sabah', icon: '🌅' },
      { label: 'Farketmez', icon: '🤷' },
    ],
  },
];

const MAX_SELECTION = 3;
const MIN_SELECTION = 1;

export default function SuggestEventWithAiPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Array<number[]>>(Array(QUESTIONS.length).fill([]));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelect = (optionIdx: number) => {
    setAnswers(prev => {
      const current = prev[step];
      let updated;
      if (current.includes(optionIdx)) {
        updated = current.filter(i => i !== optionIdx);
      } else if (current.length < MAX_SELECTION) {
        updated = [...current, optionIdx];
      } else {
        updated = current;
      }
      return prev.map((arr, idx) => idx === step ? updated : arr);
    });
  };

  const canProceed = answers[step].length >= MIN_SELECTION;

  const handleFinish = async () => {
    setLoading(true);
    try {
      // Seçilen metinleri al
      const allSelectedTexts = answers.flatMap(
        (selectedIdxs, stepIdx) => selectedIdxs.map(idx => QUESTIONS[stepIdx].options[idx].label)
      );

      // Backend API'ye gönder
      const response = await fetch('http://127.0.0.1:8000/api/deneme', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: allSelectedTexts
        })
      });

      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }

      const data = await response.json();
      
      // Başlık ve açıklamayı URL parametreleri olarak gönder
      const params = new URLSearchParams({
        title: data.title,
        description: data.description
      });

      // Suggest event sayfasına yönlendir
      router.push(`/suggest-event?${params.toString()}`);
    } catch (error) {
      console.error('API hatası:', error);
      setLoading(false);
      // Hata durumunda kullanıcıya bilgi ver
      alert('Etkinlik önerisi oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-white py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="mb-6">
              <svg className="animate-spin h-12 w-12 text-[#78123e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
            <div className="text-xl font-bold text-[#78123e] text-center">Yapay zeka etkinlik fikrini oluşturuluyor...</div>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="w-full max-w-2xl mx-auto mb-10">
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#78123e] transition-all duration-500"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500 text-center">
                {step + 1} / {QUESTIONS.length}
              </div>
            </div>
            {/* Soru */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
              {QUESTIONS[step].question}
            </h2>
            {/* Kartlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
              {QUESTIONS[step].options.map((opt, idx) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(idx)}
                  className={`flex flex-col items-center justify-center border-2 rounded-xl p-7 transition-all duration-200 text-xl font-semibold shadow-md animate-fade-in-up
                    ${answers[step].includes(idx) ? 'border-[#78123e] bg-[#f3e6ee]' : 'border-gray-200 bg-white hover:border-[#78123e]/60'}
                    select-none`}
                  style={{ animationDelay: `${0.04 * idx}s`, animationFillMode: 'both' }}
                >
                  <span className="text-4xl mb-3">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
            <style jsx>{`
              @keyframes fade-in-up {
                from {
                  opacity: 0;
                  transform: translateY(32px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-fade-in-up {
                animation: fade-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1);
              }
            `}</style>
            <div className="text-gray-500 text-base mb-5">En fazla 3 seçenek seçin</div>
            {/* Navigation */}
            <div className="flex gap-5 mt-1">
              <button
                className="px-7 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-bold text-base disabled:opacity-50 shadow cursor-pointer"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0 || loading}
              >
                Geri
              </button>
              <button
                className="px-7 py-2.5 rounded-lg bg-[#78123e] text-white font-bold text-base disabled:opacity-50 shadow cursor-pointer"
                onClick={step === QUESTIONS.length - 1 ? handleFinish : () => setStep(s => Math.min(QUESTIONS.length - 1, s + 1))}
                disabled={!canProceed || loading}
              >
                {step === QUESTIONS.length - 1 ? 'Bitir' : 'İleri'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 