'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('E-posta adresiniz doğrulanıyor...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setStatus('error');
          setMessage('Geçersiz doğrulama bağlantısı.');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }

        // Doğrulama API'sine istek gönder
        const response = await fetch(`/api/verify-email?token=${token}`);
        
        if (response.ok) {
          setStatus('success');
          setMessage('E-posta adresiniz başarıyla doğrulandı! Ana sayfaya yönlendiriliyorsunuz...');
          
          // Başarılı doğrulama durumunda ana sayfaya yönlendir
          setTimeout(() => {
            // Kullanıcı oturum açmışsa doğrudan ana sayfaya git
            const token = localStorage.getItem('token');
            if (token) {
              // Kullanıcı bilgisini güncelle
              localStorage.setItem('isMailValidated', 'true');
              // email_verified_at alanını da ayarla
              const userStr = localStorage.getItem('user');
              if (userStr) {
                try {
                  const user = JSON.parse(userStr);
                  user.email_verified_at = new Date().toISOString();
                  localStorage.setItem('user', JSON.stringify(user));
                } catch (e) {
                  console.error('User data update error:', e);
                }
              }
              
              // Ana sayfaya yönlendir
              router.push('/');
              setTimeout(() => window.location.href = '/', 300);
            } else {
              // Kullanıcı oturum açmamışsa login sayfasına yönlendir
              router.push('/login');
              setTimeout(() => window.location.href = '/login', 300);
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage('E-posta doğrulama işlemi başarısız oldu.');
          
          // Başarısız doğrulama durumunda login sayfasına yönlendir
          setTimeout(() => {
            router.push('/login');
            setTimeout(() => window.location.href = '/login', 300);
          }, 2000);
        }
      } catch (error) {
        console.error('Doğrulama hatası:', error);
        setStatus('error');
        setMessage('Doğrulama sırasında bir hata oluştu.');
        
        // Hata durumunda login sayfasına yönlendir
        setTimeout(() => {
          router.push('/login');
          setTimeout(() => window.location.href = '/login', 300);
        }, 2000);
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(120deg, #172c5c 60%, #78123e 100%)' }}>
      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-12 rounded-3xl shadow-2xl" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)' }}>
        <div className="mb-6">
          {status === 'loading' && (
            <svg className="animate-spin h-14 w-14 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          
          {status === 'success' && (
            <svg className="h-14 w-14 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          
          {status === 'error' && (
            <svg className="h-14 w-14 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
          {status === 'loading' && 'E-posta Doğrulaması'}
          {status === 'success' && 'Doğrulama Başarılı'}
          {status === 'error' && 'Doğrulama Hatası'}
        </h1>
        
        <p className="text-white/90 text-lg text-center max-w-md">
          {message}
        </p>
      </div>
    </div>
  );
} 