import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Forward the request to the backend API
    const backendResponse = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await backendResponse.json();
    
    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || 'Giriş yapılırken bir hata oluştu' },
        { status: backendResponse.status }
      );
    }
    
    // Yanıtı standardize et - eğer backend'den gelen veri yapısı farklıysa
    const response = {
      token: data.token || data.access_token || '',
      user: {
        ...(data.user || {}),
        // Eğer backend'den gelen alan adı farklıysa burada standardize et
        isMailValidated: data.user?.isMailValidated || 
                         data.user?.is_mail_validated || 
                         (data.user?.email_verified_at !== null && 
                          data.user?.email_verified_at !== undefined)
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 