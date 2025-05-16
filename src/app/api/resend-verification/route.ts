import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('API Route: Resend verification request received');
    
    // Token'ı al
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      console.log('API Route: No token provided');
      return NextResponse.json(
        { message: 'Yetkilendirme hatası' },
        { status: 401 }
      );
    }
    
    console.log('API Route: Sending verification email resend request');
    // Backend API'sine istek gönder
    const backendResponse = await fetch('http://127.0.0.1:8000/api/mail/resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('API Route: Backend response status:', backendResponse.status);
    const data = await backendResponse.json();
    console.log('API Route: Backend response data:', data);
    
    if (!backendResponse.ok) {
      console.log('API Route: Backend response was not OK');
      return NextResponse.json(
        { message: data.message || 'Doğrulama e-postası gönderilirken bir hata oluştu' },
        { status: backendResponse.status }
      );
    }
    
    console.log('API Route: Verification email sent successfully');
    return NextResponse.json({
      message: 'Doğrulama e-postası başarıyla gönderildi',
      ...data
    });
  } catch (error) {
    console.error('API Route: Resend verification error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 