import { NextResponse } from 'next/server';

// API Base URL - can be modified in one place if the backend URL changes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const USER_PROFILE_ENDPOINT = `${API_BASE_URL}/me`;

export async function GET(request: Request) {
  try {
    console.log('API Route: Check verification status request received');
    
    // Token'ı al
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      console.log('API Route: No token provided');
      return NextResponse.json(
        { message: 'Yetkilendirme hatası' },
        { status: 401 }
      );
    }
    
    console.log(`API Route: Fetching user profile to check verification status from ${USER_PROFILE_ENDPOINT}`);
    // Backend API'sine istek gönder
    const backendResponse = await fetch(USER_PROFILE_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('API Route: Backend response status:', backendResponse.status);
    const data = await backendResponse.json();
    console.log('API Route: Backend response data (partial):', JSON.stringify(data).substring(0, 300) + '...');
    
    if (!backendResponse.ok) {
      console.log('API Route: Backend response was not OK');
      return NextResponse.json(
        { message: data.message || 'Kullanıcı bilgileri alınırken bir hata oluştu' },
        { status: backendResponse.status }
      );
    }
    
    // Kullanıcı verisini ve doğrulama durumunu hazırla
    const userData = data.user || data;
    
    // Kullanıcı verisinin yapısına göre doğrulama durum bilgisini kontrol et
    // email_verified_at varsa ve null değilse kullanıcı doğrulanmış demektir
    const isMailValidated = userData.email_verified_at !== null && userData.email_verified_at !== undefined;
    
    console.log('API Route: User verification status:', isMailValidated);
    console.log('API Route: email_verified_at value:', userData.email_verified_at);
    
    // Yanıtı standardize et
    const response = {
      user: {
        ...userData,
        isMailValidated: isMailValidated, // Standardize edilmiş alan
        email_verified_at: userData.email_verified_at // Orijinal doğrulama zaman damgası
      },
      original: data // Debug için orijinal veriyi de koru
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('API Route: Verification status check error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 