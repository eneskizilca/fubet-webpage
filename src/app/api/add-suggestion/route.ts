import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Request gövdesinden verileri al
    const data = await request.json();
    
    // Gelen verileri doğrula
    if (!data.title || !data.description) {
      return NextResponse.json(
        { error: 'Başlık ve açıklama alanları zorunludur' },
        { status: 400 }
      );
    }
    
    // Simule edilmiş bir gecikme
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Gerçek uygulamada, burası veritabanına kayıt yapacaktır
    // Burada sadece başarılı bir yanıt döndürüyoruz
    
    // Oluşturulan yeni öneri (gerçekte bu veritabanından dönecektir)
    const newSuggestion = {
      id: Date.now(), // Örnek bir ID
      title: data.title,
      description: data.description,
      date: new Date().toLocaleDateString('tr-TR'),
      status: 'beklemede'
    };
    
    return NextResponse.json({
      success: true,
      message: 'Öneri başarıyla kaydedildi',
      suggestion: newSuggestion
    });
    
  } catch (error) {
    console.error('Öneri kaydederken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Öneri kaydedilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 