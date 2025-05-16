import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Token'ı al
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: 'Yetkilendirme hatası' },
        { status: 401 }
      );
    }
    
    // Backend API'sine istek gönder
    const backendResponse = await fetch('http://127.0.0.1:8000/api/mail/resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await backendResponse.json();
    
    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || 'Doğrulama e-postası gönderilirken bir hata oluştu' },
        { status: backendResponse.status }
      );
    }
    
    return NextResponse.json({
      message: 'Doğrulama e-postası başarıyla gönderildi',
      ...data
    });
  } catch (error) {
    console.error('Doğrulama e-postası yeniden gönderme hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 