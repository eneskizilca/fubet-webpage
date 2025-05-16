'use client';

import { useEffect, useState, JSX } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const [stars, setStars] = useState<JSX.Element[]>([]);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{success: boolean, message: string} | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isDirectAccess, setIsDirectAccess] = useState(true); // Assume direct access initially
  const router = useRouter();

  // Kullanıcının doğrulama durumunu backend'den kontrol eden fonksiyon
  const checkVerificationStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('/api/check-verification-status', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Kullanıcı bilgilerini güncelle
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Doğrulama durumunu state'e kaydet
          if (data.user.isMailValidated) {
            setIsValidated(true);
          }
        }
      }
    } catch (error) {
      console.error('Doğrulama durumu kontrol edilirken hata:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // Doğrulama durumu değiştiğinde ana sayfaya yönlendir
  useEffect(() => {
    if (isValidated) {
      router.push('/');
      
      // Yönlendirme problemine karşı yedek çözüm
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  }, [isValidated, router]);

  useEffect(() => {
    // Yıldızları oluştur
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

    // Kullanıcı oturum bilgisini kontrol et
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    // Doğrudan kayıt sayfasından gelmiş olabileceği için token kontrolünü atlayalım
    // Bu durumda API çağrısı yapmayız, kullanıcı form alanlarını görebilir
    if (!token || !userStr) {
      // Direkt erişim olduğu için sadece durumu kaydet
      setIsDirectAccess(true);
      return;
    }
    
    // Artık token ve user bilgisi var, direkt erişim değil
    setIsDirectAccess(false);
    
    try {
      const user = JSON.parse(userStr);
      setUserEmail(user.email || '');
      
      // Eğer e-posta doğrulanmışsa ana sayfaya yönlendir
      if (user.isMailValidated) {
        setIsValidated(true);
        return;
      }
      
      // Sayfa yüklendiğinde doğrulama durumunu kontrol et
      checkVerificationStatus();
      
      // Her 10 saniyede bir doğrulama durumunu kontrol et
      const intervalId = setInterval(checkVerificationStatus, 10000);
      
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error('Kullanıcı bilgisi çözümlenirken hata oluştu:', error);
    }
  }, [router]);

  const handleResendVerification = async () => {
    setIsSending(true);
    setSendResult(null);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSendResult({
          success: true,
          message: 'Doğrulama e-postası başarıyla gönderildi. Lütfen e-posta kutunuzu kontrol edin.'
        });
      } else {
        setSendResult({
          success: false,
          message: data.message || 'Doğrulama e-postası gönderilirken bir hata oluştu.'
        });
      }
    } catch (error) {
      setSendResult({
        success: false,
        message: 'Sunucu ile iletişim kurulurken bir hata oluştu.'
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
    
    // Yönlendirme problemine karşı yedek çözüm
    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  };

  const handleLoginRedirect = () => {
    router.push('/login');
    
    // Yönlendirme problemine karşı yedek çözüm
    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  };

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
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-16 h-16 mx-auto">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center drop-shadow">E-posta Doğrulaması Gerekli</h1>
        
        <p className="text-white/90 text-lg text-center max-w-md mb-6 drop-shadow">
          Hesabınıza tam erişim sağlamak için e-posta adresinizi doğrulamanız gerekmektedir.
          {userEmail && (
            <span className="block mt-2 font-medium">
              <span className="opacity-80">Kayıtlı e-posta:</span> {userEmail}
            </span>
          )}
        </p>
        
        {isCheckingStatus && (
          <div className="mb-4 flex items-center justify-center text-white/80">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Doğrulama durumu kontrol ediliyor...
          </div>
        )}
        
        {sendResult && (
          <div className={`mb-6 p-4 rounded-xl w-full max-w-md text-center ${sendResult.success ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
            {sendResult.message}
          </div>
        )}
        
        {isDirectAccess ? (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <p className="text-white/90 text-center">Kayıt işleminiz başarıyla tamamlandı. Lütfen e-posta kutunuzu kontrol edin.</p>
            <button 
              onClick={handleLoginRedirect}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#78123e] to-[#172c5c] text-white font-bold text-md shadow hover:scale-105 transition-transform duration-200 w-full"
            >
              Giriş Yap
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <button 
              onClick={handleResendVerification}
              disabled={isSending || isCheckingStatus}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#78123e] to-[#172c5c] text-white font-bold text-md shadow hover:scale-105 transition-transform duration-200 w-full disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSending ? 'Gönderiliyor...' : 'Doğrulama E-postasını Gönder'}
            </button>
            
            <button 
              onClick={handleLogout}
              className="px-6 py-3 rounded-full bg-white/20 text-white font-bold text-md shadow hover:scale-105 transition-transform duration-200 w-full"
            >
              Çıkış Yap
            </button>
          </div>
        )}
        
        {!isDirectAccess && (
          <button 
            onClick={checkVerificationStatus}
            disabled={isCheckingStatus}
            className="mt-4 px-6 py-2 text-white/80 hover:text-white text-sm underline underline-offset-2 disabled:opacity-50"
          >
            Doğrulama durumunu kontrol et
          </button>
        )}
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
      `}</style>
    </div>
  );
} 