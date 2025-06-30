'use client';

import Navbar from '@/components/Navbar';
import { useEffect, useState, useRef } from 'react';

// Öneri tipi tanımlaması - kullanıcı önerilerinin veri yapısı
interface Suggestion {
  id: number;
  title: string;
  date: string;
  status: string;
  description?: string;
}

// CSS keyframes animasyonu için style etiketi ekle - buton animasyonları
const pulseGlowStyle = `
  @keyframes pulseGlow {
    0% {
      box-shadow: 0 0 0 0 rgba(120, 18, 62, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(120, 18, 62, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(120, 18, 62, 0);
    }
  }

  @keyframes shine {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes particleAnimation {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }

  @keyframes borderGlow {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 1px rgba(120, 18, 62, 0.7);
    }
    50% {
      box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.3), 0 0 4px 2px rgba(120, 18, 62, 0.5);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0), 0 0 0 1px rgba(120, 18, 62, 0.7);
    }
  }

  @keyframes textGlow {
    0% {
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.3);
    }
    50% {
      text-shadow: 0 0 16px rgba(255, 255, 255, 0.9), 0 0 24px rgba(255, 255, 255, 0.5);
    }
    100% {
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.3);
    }
  }

  @keyframes spark {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      background-color: #fff;
    }
    100% {
      transform: translateY(-100px) rotate(180deg);
      opacity: 0;
      background-color: #ff6ec4;
    }
  }

  .submit-button {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 1;
  }

  .submit-button:hover {
    transform: translateY(-3px);
    background: linear-gradient(45deg, #78123e, #c3255c, #78123e, #a72352);
    background-size: 300% 300%;
    animation: shine 3s ease-in-out infinite;
    box-shadow: 0 7px 20px rgba(120, 18, 62, 0.5), 0 0 0 1px rgba(120, 18, 62, 0.2);
    letter-spacing: 0.5px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .submit-button:hover .button-text {
    animation: textGlow 2s ease-in-out infinite;
    color: white;
  }

  .submit-button:hover::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.05)
    );
    transform: rotate(30deg) translateY(20%);
    transition: 0.5s;
    z-index: -1;
    pointer-events: none;
  }

  .submit-button:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0.75rem;
    animation: borderGlow 1.5s infinite ease-in-out;
    z-index: -1;
    pointer-events: none;
  }

  .submit-button .particle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    pointer-events: none;
    z-index: 2;
  }
  
  .button-wrapper {
    position: relative;
    width: 100%;
  }
  
  .button-wrapper::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 0.85rem;
    background: linear-gradient(45deg, #ff6ec4, #7873f5, #ffb86c, #2cccff);
    background-size: 400% 400%;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: shine 3s ease-in-out infinite;
    z-index: 0;
  }
  
  .button-wrapper:hover::before {
    opacity: 0.5;
  }
  
  .spark {
    position: absolute;
    width: 3px;
    height: 6px;
    border-radius: 2px;
    background-color: #fff;
    pointer-events: none;
    z-index: 3;
  }
`;

export default function SuggestEventPage() {
  // Form state yönetimi - kullanıcı girişleri
  const [title, setTitle] = useState('Fırat Nehri Kıyısında Teknoloji ve Doğa Buluşması');
  const [description, setDescription] = useState('Fırat Nehri kıyısındaki muhteşem bir alanda,  teknik bir gezi ve eğlenceli takım oyunlarının birleşiminden oluşan bir hafta sonu etkinliği öneriyoruz.  Öncelikle, Elazığ\'daki önemli bir teknoloji şirketini ziyaret ederek sektör hakkında bilgi edinme ve liderlik becerilerinizi gözlemleme fırsatı yakalayabilirsiniz. Ardından, nehir kenarında, doğanın içinde yaratıcılığınızı ve takım çalışmanızı ortaya koyacağınız eğlenceli takım oyunları düzenleyebiliriz.  Örneğin, nehir kıyısında bir ip atlama parkuru kurarak ve farklı takım oyunları oynayarak hem eğlenebilir hem de  takım çalışması ve liderlik becerilerinizi geliştirebiliriz.  Bu etkinlikte hem bilgi edinecek hem de eğlenceli vakit geçireceksiniz.');
  
  // Geçmiş öneriler ve seçili öneri
  const [pastSuggestions, setPastSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  
  // Loading, hata ve başarı durumları
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // URL parametrelerini kontrol et - yapay zeka önerisinden gelen veriler
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const titleParam = params.get('title');
    const descriptionParam = params.get('description');

    if (titleParam && descriptionParam) {
      setTitle(titleParam);
      setDescription(descriptionParam);
      // URL'den parametreleri temizle
      window.history.replaceState({}, '', '/suggest-event');
    }
  }, []);

  // Partikül efekti için referans ve state
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const [sparks, setSparks] = useState<Array<{id: number, x: number, y: number, rotation: number}>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // API'den kullanıcının geçmiş önerilerini al
  const fetchPastSuggestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/user-suggestions');
      
      if (!response.ok) {
        throw new Error('Öneriler yüklenirken bir hata oluştu');
      }
      
      const data = await response.json();
      setPastSuggestions(data);
    } catch (err) {
      console.error('Önerileri alma hatası:', err);
      setError('Öneriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa yüklendiğinde geçmiş önerileri getir
  useEffect(() => {
    fetchPastSuggestions();
  }, []);

  // Form gönderme işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form verilerini doğrula
    if (!title.trim() || !description.trim()) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);
      
      // API'ye gönder
      const response = await fetch('/api/add-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          // Eğer bir öneriyi düzenliyorsak, orijinal ID'yi de gönderebiliriz
          originalId: selectedSuggestion?.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Öneri gönderilirken bir hata oluştu');
      }

      // Başarılı gönderimden sonra formu sıfırla
      setTitle('');
      setDescription('');
      setSelectedSuggestion(null);
      setSuccessMessage('Öneri başarıyla gönderildi!');
      
      // Önerileri yeniden yükle
      fetchPastSuggestions();

    } catch (err: any) {
      console.error('Öneri gönderme hatası:', err);
      setError(err.message || 'Öneri gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
      
      // Başarı mesajını 5 saniye sonra temizle
      if (successMessage) {
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    }
  };

  // Seçilen öneriyi form alanlarına doldur
  const loadSuggestion = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setTitle(suggestion.title);
    setDescription(suggestion.description || `Bu öneri daha önce gönderildi ve şu anda ${suggestion.status} durumunda.`);
    setSuccessMessage(null);
    setError(null);
  };

  // Durum rengini belirleme fonksiyonu
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'onaylandı': return 'text-green-600';
      case 'beklemede': return 'text-amber-600';
      case 'reddedildi': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Durum arka plan rengini belirle
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'onaylandı': return 'bg-green-50';
      case 'beklemede': return 'bg-amber-50';
      case 'reddedildi': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  // Durum için border rengini belirle
  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'onaylandı': return 'border-green-200';
      case 'beklemede': return 'border-amber-200';
      case 'reddedildi': return 'border-red-200';
      default: return 'border-gray-200';
    }
  };

  // Yeni öneri oluşturma - formu temizle
  const createNewSuggestion = () => {
    setSelectedSuggestion(null);
    setTitle('');
    setDescription('');
    setError(null);
    setSuccessMessage(null);
  };

  // Partikül efekti oluşturma fonksiyonu - buton etkileşimleri için
  const createParticle = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    if (isSubmitting || !buttonRef.current) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    // Dokunma veya fare olayına göre koordinatları belirle
    let clientX, clientY;
    
    if ('touches' in e) {
      // Dokunma olayı
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Fare olayı
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Tıklanan pozisyona göre partikül oluştur
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Rastgele boyut
    const size = Math.random() * 5 + 5;
    
    // Partiküllere yeni ekle
    const newParticle = {
      id: Date.now(),
      x,
      y,
      size
    };
    
    setParticles(prev => [...prev, newParticle]);
    
    // Partikülü 1 saniye sonra kaldır
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };
  
  // Kıvılcım efekti oluşturma - buton hover efekti
  const createSparks = () => {
    if (isSubmitting || !buttonRef.current) return;
    
    // 8 kıvılcım oluştur
    const newSparks = Array.from({ length: 8 }).map((_, index) => {
      const button = buttonRef.current!;
      const rect = button.getBoundingClientRect();
      
      // Button içinde rastgele pozisyon
      const x = Math.random() * rect.width;
      const y = rect.height;
      
      // Rastgele rotasyon
      const rotation = Math.random() * 90 - 45;
      
      return {
        id: Date.now() + index,
        x,
        y,
        rotation
      };
    });
    
    setSparks(prev => [...prev, ...newSparks]);
    
    // Kıvılcımları temizle
    setTimeout(() => {
      setSparks(prev => prev.filter(s => !newSparks.some(ns => ns.id === s.id)));
    }, 1000);
  };
  
  // Buton üzerine gelindiğinde kıvılcım efektini başlat
  useEffect(() => {
    // Mouse over olduğunda ve dokunmalarda 
    const mouseover = () => {
      const interval = setInterval(createSparks, 300);
      return () => clearInterval(interval);
    };
    
    const button = buttonRef.current;
    if (button && !isSubmitting) {
      const hoverListener = mouseover();
      
      return () => {
        hoverListener();
      };
    }
  }, [isSubmitting]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Style etiketini sayfaya ekle - CSS animasyonları */}
      <style jsx global>{pulseGlowStyle}</style>
      
      <Navbar />
      <main className="flex-grow flex flex-col md:flex-row bg-white py-6">
        {/* Sol Taraftaki Geçmiş Öneriler Paneli */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-200 p-4 md:h-[calc(100vh-80px)] overflow-y-auto bg-gray-50/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#78123e]">Önceki Öneriler</h2>
          </div>
          
          {/* Yeni öneri oluştur butonu */}
          <button 
            onClick={createNewSuggestion}
            className="flex items-center justify-center w-full mb-4 text-[#78123e] hover:text-white text-sm font-medium cursor-pointer py-2.5 px-4 rounded-md hover:bg-[#78123e] transition-all border border-[#78123e] shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yeni Öneri Oluştur
          </button>
          
          {/* Geçmiş öneriler listesi */}
          <div className="space-y-3 mt-4">
            {isLoading ? (
              // Loading spinner
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#78123e]"></div>
              </div>
            ) : error && pastSuggestions.length === 0 ? (
              // Hata durumu
              <div className="text-red-500 p-3 text-sm bg-white rounded-md shadow-sm">{error}</div>
            ) : pastSuggestions.length === 0 ? (
              // Öneri yoksa gösterilecek mesaj
              <div className="flex flex-col items-center justify-center py-8 px-4 bg-white rounded-md shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#78123e" className="w-12 h-12 mb-3 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <p className="text-gray-500 text-center">Henüz öneri yapmadınız.</p>
                <p className="text-gray-400 text-xs text-center mt-1">Yeni bir öneri oluşturmak için yukarıdaki butonu kullanabilirsiniz.</p>
              </div>
            ) :
              <>
                <h3 className="text-xs uppercase font-medium text-gray-500 mb-1 px-1">Önerileriniz ({pastSuggestions.length})</h3>
                {/* Öneri kartları */}
                {pastSuggestions.map(suggestion => (
                  <div 
                    key={suggestion.id}
                    onClick={() => loadSuggestion(suggestion)}
                    className={`p-4 rounded-lg cursor-pointer transition-all 
                      ${selectedSuggestion?.id === suggestion.id 
                        ? 'border-l-4 border-[#78123e] bg-white border-t border-b border-r border-gray-200 shadow-md' 
                        : 'border border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'}`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className={`font-semibold truncate mr-2 ${selectedSuggestion?.id === suggestion.id ? 'text-[#78123e]' : 'text-gray-900'}`}>
                        {suggestion.title}
                      </h3>
                      {/* Seçili önerinin göstergesi */}
                      {selectedSuggestion?.id === suggestion.id && (
                        <div className="w-2 h-2 rounded-full bg-[#78123e] mt-1.5 shadow-sm"></div>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-500 text-xs">{suggestion.date}</span>
                      {/* Durum badge'i */}
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)} ${getStatusBgColor(suggestion.status)} ${getStatusBorderColor(suggestion.status)} border`}>
                        {suggestion.status}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Sağ Taraftaki Form Bölümü */}
        <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 mt-6 md:mt-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#78123e] mb-6 text-center">Etkinlik Öner</h1>
          
          {/* Başarı Mesajı */}
          {successMessage && (
            <div className="w-full max-w-xl mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg shadow-sm">
              {successMessage}
            </div>
          )}
          
          {/* Hata Mesajı */}
          {error && !isLoading && (
            <div className="w-full max-w-xl mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
              {error}
            </div>
          )}
          
          {/* Ana Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6 border border-gray-100">
            {/* Başlık Input */}
            <div>
              <label htmlFor="title" className="block text-lg font-bold text-[#78123e] mb-2">Başlık</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#78123e] outline-none text-lg"
                placeholder="Etkinlik başlığını girin"
                required
                disabled={isSubmitting}
              />
            </div>
            
            {/* Açıklama Textarea */}
            <div>
              <label htmlFor="description" className="block text-lg font-bold text-[#78123e] mb-2">Açıklama</label>
              <textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#78123e] outline-none text-lg min-h-[140px] resize-vertical"
                placeholder="Etkinlik fikrini detaylıca anlat..."
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Düzenleme uyarısı */}
            {selectedSuggestion && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm shadow-sm">
                <strong>Not:</strong> Daha önce gönderilen bir öneriyi düzenliyorsunuz. Değişiklikler yeni bir öneri olarak kaydedilecektir.
              </div>
            )}

            {/* Gönder Butonu */}
            <div className="button-wrapper">
              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                onMouseMove={createParticle}
                onTouchMove={createParticle}
                onMouseEnter={createSparks}
                className={`w-full py-3 rounded-xl text-white text-lg font-bold shadow transition cursor-pointer submit-button relative z-10 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#78123e]'
                }`}
              >
                {/* Partikül efektleri */}
                {particles.map(particle => (
                  <span
                    key={particle.id}
                    className="particle"
                    style={{
                      left: `${particle.x}px`,
                      top: `${particle.y}px`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      animation: `particleAnimation 1s ease-out forwards`
                    }}
                  />
                ))}
                
                {/* Kıvılcım efektleri */}
                {sparks.map(spark => (
                  <span
                    key={spark.id}
                    className="spark"
                    style={{
                      left: `${spark.x}px`,
                      bottom: 0,
                      transform: `rotate(${spark.rotation}deg)`,
                      animation: `spark 1s ease-out forwards`
                    }}
                  />
                ))}
                
                {/* Buton içeriği */}
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İşleniyor...
                  </span>
                ) : (
                  <span className="button-text">
                    {selectedSuggestion ? 'Güncelle ve Gönder' : 'Gönder'}
                  </span>
                )}
              </button>
            </div>

            {/* Yeniden Yarat Butonu - yapay zeka ile yeniden öneri oluşturmak için */}
            <div className="button-wrapper mt-4">
              <button
                type="button"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl text-white text-lg font-bold shadow transition cursor-pointer submit-button relative z-10 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#1a237e]'
                }`}
              >
                <span className="button-text">
                  Yeniden Yarat
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 