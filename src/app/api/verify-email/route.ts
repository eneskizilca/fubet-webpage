import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  try {
    console.log('API Route: Email verification request received');
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
      console.log('API Route: No token provided');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    console.log('API Route: Verifying email with token');
    const backendResponse = await fetch('http://127.0.0.1:8000/api/mail/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    
    console.log('API Route: Backend verification response status:', backendResponse.status);
    const data = await backendResponse.json();
    console.log('API Route: Backend verification data:', data);
    
    // Kullanıcı zaten giriş yapmış ve token geçerli ise ana sayfaya yönlendir
    if (backendResponse.ok) {
      // Token'ın geçerli olduğunu ve kullanıcının doğrulandığını biliyoruz
      // Kullanıcı bilgilerini ve token varsa localStorage'a kaydet
      if (data.token) {
        console.log('API Route: Received new token, will store in sessionStorage');
        // Tam sayfa yönlendirme yapılacağı için, geçici olarak sessionStorage kullanabiliriz
        // Ana sayfada bu bilgi kullanılıp normal localStorage'a aktarılabilir
        sessionStorage.setItem('temp_verification_token', data.token);
        
        if (data.user) {
          sessionStorage.setItem('temp_verification_user', JSON.stringify(data.user));
        }
      }
      
      console.log('API Route: Verification successful, redirecting to root');
      // Ana sayfaya yönlendir
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      console.log('API Route: Verification failed, redirecting to login');
      // Doğrulama başarısız oldu, login sayfasına yönlendir
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('API Route: Email verification error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
} 