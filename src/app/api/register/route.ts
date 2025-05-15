import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Forward the request to the backend API
    const backendResponse = await fetch('http://127.0.0.1:8000/api/register', {
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
        { message: data.message || 'Kayıt işlemi başarısız oldu' },
        { status: backendResponse.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 