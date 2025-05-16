import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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
    const backendResponse = await fetch('http://127.0.0.1:8000/api/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await backendResponse.json();
    
    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || 'Kullanıcı bilgileri alınırken bir hata oluştu' },
        { status: backendResponse.status }
      );
    }
    
    // Kullanıcı verisini ve doğrulama durumunu hazırla
    const userData = data.user || data;
    
    // Kullanıcı verisinin yapısına göre doğrulama durum bilgisini kontrol et
    const isMailValidated = userData.isMailValidated || userData.is_mail_validated || false;
    
    // Yanıtı standardize et
    const response = {
      user: {
        ...userData,
        isMailValidated: isMailValidated // Standardize edilmiş alan
      },
      original: data // Debug için orijinal veriyi de koru
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Kullanıcı doğrulama durumu kontrol hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 