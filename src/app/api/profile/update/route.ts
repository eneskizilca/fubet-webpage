import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // İstek ve token bilgilerini al
    const body = await request.json();
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Yetkilendirme hatası' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    console.log('Profile update request data:', body);
    
    // Backend API'ye istek gönder
    const backendResponse = await fetch('http://127.0.0.1:8000/api/profile/update', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await backendResponse.json();
    console.log('Backend response:', data, 'Status:', backendResponse.status);
    
    if (!backendResponse.ok) {
      // Laravel validation errors handling
      if (data.errors && typeof data.errors === 'object') {
        const errorMessages = Object.values(data.errors)
          .flat()
          .filter(Boolean)
          .join(', ');
          
        return NextResponse.json(
          { 
            message: errorMessages || data.message || 'Profil güncellenirken bir hata oluştu',
            errors: data.errors 
          }, 
          { status: backendResponse.status }
        );
      }
      
      return NextResponse.json(
        { 
          message: data.message || 'Profil güncellenirken bir hata oluştu'
        }, 
        { status: backendResponse.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 