import { NextResponse } from 'next/server';

// API Base URL - can be modified in one place if the backend URL changes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const RESEND_ENDPOINT = `${API_BASE_URL}/mail/resend`;

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
    
    console.log(`API Route: Sending verification email resend request to ${RESEND_ENDPOINT}`);
    // Backend API'sine istek gönder
    const backendResponse = await fetch(RESEND_ENDPOINT, {
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