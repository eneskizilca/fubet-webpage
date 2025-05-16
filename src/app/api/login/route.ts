import { NextResponse } from 'next/server';

// API Base URL - can be modified in one place if the backend URL changes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;

export async function POST(request: Request) {
  try {
    console.log('API Route: Login request received');
    const body = await request.json();
    console.log('API Route: Login request data:', { email: body.email, password: '****' });
    
    // Forward the request to the backend API
    console.log(`API Route: Sending login request to ${LOGIN_ENDPOINT}`);
    const backendResponse = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    }).catch(error => {
      console.error('API Route: Login fetch error:', error);
      throw new Error('Backend sunucusuna bağlanılamıyor. Sunucunun çalıştığından emin olun.');
    });
    
    console.log('API Route: Login response status:', backendResponse.status);
    const data = await backendResponse.json().catch(error => {
      console.error('API Route: Login JSON parse error:', error);
      throw new Error('Sunucu cevabı işlenemedi.');
    });
    
    if (!backendResponse.ok) {
      console.log('API Route: Login failed:', data);
      return NextResponse.json(
        { message: data.message || data.error || 'Giriş yapılırken bir hata oluştu' },
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
                          data.user?.email_verified_at !== undefined),
        email_verified_at: data.user?.email_verified_at
      }
    };
    
    console.log('API Route: Login successful for user:', data.user?.email);
    return NextResponse.json(response);
  } catch (error) {
    console.error('API Route: Login error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
} 