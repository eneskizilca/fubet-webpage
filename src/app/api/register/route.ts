import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // İstek gövdesinden verileri al
    const requestData = await request.json();
    
    // Backend API'sine istek gönder
    const backendResponse = await fetch('http://127.0.0.1:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    const data = await backendResponse.json();
    
    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || 'Kayıt işlemi başarısız oldu' },
        { status: backendResponse.status }
      );
    }
    
    // Backend'in döndüğü token ve kullanıcı verisini standardize et
    const token = data.token || data.access_token;
    const user = data.user || {};
    
    return NextResponse.json({
      token: token,
      user: {
        ...user,
        isMailValidated: user.isMailValidated || user.is_mail_validated || false
      }
    });
  } catch (error) {
    console.error('Kayıt işlemi hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 