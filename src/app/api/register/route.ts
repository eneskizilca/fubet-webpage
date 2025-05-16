import { NextResponse } from 'next/server';

// API Base URL - can be modified in one place if the backend URL changes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const REGISTER_ENDPOINT = `${API_BASE_URL}/register`;

export async function POST(request: Request) {
  try {
    console.log('API Route: Register request received');
    
    // İstek gövdesinden verileri al
    const requestData = await request.json();
    console.log('API Route: Request data:', requestData);
    
    // Backend API'sine istek gönder
    console.log(`API Route: Sending request to backend at ${REGISTER_ENDPOINT}`);
    
    const backendResponse = await fetch(REGISTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData)
    }).catch(error => {
      console.error('API Route: Fetch error:', error);
      throw new Error('Backend sunucusuna bağlanılamıyor. Sunucunun çalıştığından emin olun.');
    });
    
    console.log('API Route: Backend response status:', backendResponse.status);
    
    const data = await backendResponse.json().catch(error => {
      console.error('API Route: JSON parse error:', error);
      throw new Error('Sunucu cevabı işlenemedi.');
    });
    
    console.log('API Route: Backend response data:', data);
    
    if (!backendResponse.ok) {
      console.log('API Route: Backend response was not OK');
      
      // Hata mesajını daha detaylı almaya çalış
      const errorMessage = data.message || 
                          data.error || 
                          data.errors?.[Object.keys(data.errors)[0]]?.[0] || 
                          'Kayıt işlemi başarısız oldu';
      
      return NextResponse.json(
        { message: errorMessage },
        { status: backendResponse.status }
      );
    }
    
    // Backend'in döndüğü token ve kullanıcı verisini standardize et
    const token = data.token || data.access_token;
    const user = data.user || data.data?.user || {};
    
    if (!token) {
      console.warn('API Route: No token received from backend');
    }
    
    if (!user || Object.keys(user).length === 0) {
      console.warn('API Route: No user data received from backend');
    }
    
    const response = {
      token: token,
      user: {
        ...user,
        isMailValidated: user.isMailValidated || user.is_mail_validated || false,
        email_verified_at: user.email_verified_at
      }
    };
    
    console.log('API Route: Returning success response', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('API Route: Registration error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
} 