'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Bu komponent, kullanıcının oturum durumunu ve e-posta doğrulama durumunu kontrol eder
export default function VerificationCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  // Temp verification data varsa localStorage'a aktar
  useEffect(() => {
    const tempToken = sessionStorage.getItem('temp_verification_token');
    const tempUser = sessionStorage.getItem('temp_verification_user');

    if (tempToken) {
      localStorage.setItem('token', tempToken);
      sessionStorage.removeItem('temp_verification_token');
      
      if (tempUser) {
        try {
          const user = JSON.parse(tempUser);
          // Set verification flag based on email_verified_at field
          user.isMailValidated = true;
          // Ensure email_verified_at is set to a timestamp if it doesn't exist
          if (!user.email_verified_at) {
            user.email_verified_at = new Date().toISOString();
          }
          localStorage.setItem('user', JSON.stringify(user));
          sessionStorage.removeItem('temp_verification_user');
        } catch (e) {
          console.error('Temp user parsing error:', e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      setIsChecking(true);
      
      // Exclude paths that don't need verification
      const excludedPaths = [
        '/login', 
        '/register', 
        '/verify-email',
        '/please-verify'
      ];
      
      if (excludedPaths.some(path => pathname?.startsWith(path))) {
        setIsChecking(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Kullanıcı oturum açmamış, login'e yönlendir
          console.log('No token found, redirecting to login');
          router.push('/login');
          return;
        }

        // Kullanıcı bilgilerini kontrol et
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            
            // Doğrulama durumunu kontrol et
            if (!user.isMailValidated && !user.email_verified_at) {
              // Doğrulanmamış kullanıcı, doğrulama sayfasına yönlendir
              console.log('User not validated, redirecting to please-verify');
              if (pathname !== '/please-verify') {
                router.push('/please-verify');
              }
              setIsChecking(false);
              return;
            }
          } catch (e) {
            console.error('User data parsing error:', e);
          }
        }

        // Sunucudan güncel doğrulama durumunu al
        const response = await fetch('/api/check-verification-status', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.user) {
            // Kullanıcı verilerini güncelle
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Doğrulama durumunu kontrol et
            if (!data.user.isMailValidated && !data.user.email_verified_at) {
              console.log('Backend says user not validated, redirecting to please-verify');
              if (pathname !== '/please-verify') {
                router.push('/please-verify');
              }
            }
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isChecking) {
    // Kontrol tamamlanana kadar loading göster veya boş sayfa
    return null;
  }

  // Kontrol tamamlandı, children'ı render et
  return <>{children}</>;
} 