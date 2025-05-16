import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('API Route: Register request received');
    
    // İstek gövdesinden verileri al
    const requestData = await request.json();
    console.log('API Route: Request data:', requestData);
    
    // Backend API'sine istek gönder
    console.log('API Route: Sending request to backend');
    const backendResponse = await fetch('http://127.0.0.1:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    console.log('API Route: Backend response status:', backendResponse.status);
    const data = await backendResponse.json();
    console.log('API Route: Backend response data:', data);
    
    if (!backendResponse.ok) {
      console.log('API Route: Backend response was not OK');
      return NextResponse.json(
        { message: data.message || 'Kayıt işlemi başarısız oldu' },
        { status: backendResponse.status }
      );
    }
    
    // Backend'in döndüğü token ve kullanıcı verisini standardize et
    const token = data.token || data.access_token;
    const user = data.user || {};
    
    const response = {
      token: token,
      user: {
        ...user,
        isMailValidated: user.isMailValidated || user.is_mail_validated || false
      }
    };
    
    console.log('API Route: Returning success response', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('API Route: Registration error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 