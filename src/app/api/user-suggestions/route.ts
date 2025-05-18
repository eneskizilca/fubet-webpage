import { NextResponse } from 'next/server';

// Gerçek uygulamada, bu veriler veritabanından gelecektir
const mockUserSuggestions = [
  {
    id: 1,
    title: 'Fırat Nehri Kıyısında Piknik',
    date: '12.05.2024',
    status: 'onaylandı'
  },
  {
    id: 2,
    title: 'Teknoloji Kulübü Hackathon',
    date: '23.04.2024',
    status: 'beklemede'
  },
  {
    id: 3,
    title: 'Kampüs Müzik Festivali',
    date: '05.03.2024',
    status: 'reddedildi'
  },
  {
    id: 4,
    title: 'Kariyer Günleri Buluşması',
    date: '18.02.2024',
    status: 'onaylandı'
  },
  {
    id: 5,
    title: 'Yapay Zeka Workshop',
    date: '10.01.2024',
    status: 'onaylandı'
  }
];

export async function GET() {
  // Burada veritabanından kullanıcının önerilerini alacak gerçek bir sorgu olacaktır
  // Kullanıcı kimliği, bir oturum tanımlayıcısından veya giriş bilgilerinden alınabilir

  try {
    // Simule edilmiş bir gecikme (gerçek bir API çağrısını simüle etmek için)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(mockUserSuggestions);
  } catch (error) {
    console.error('Kullanıcı önerileri alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Öneriler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 