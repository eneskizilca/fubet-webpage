'use client';
import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ahmet Yılmaz",
    role: "Topluluk Başkanı",
    image: "/team/ahmet.jpg",
    description: "Yazılım Mühendisliği 4. Sınıf"
  },
  {
    name: "Ayşe Demir",
    role: "Başkan Yardımcısı",
    image: "/team/ayse.jpg",
    description: "Bilgisayar Mühendisliği 3. Sınıf"
  },
  // Diğer ekip üyeleri buraya eklenecek
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#172c5c] to-[#78123e]">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Ekibimiz
        </h1>
        <p className="text-white/80 text-center max-w-2xl mx-auto mb-16">
          Fırat Üniversitesi Bilişim ve Eğitim Topluluğu, teknoloji ve eğitim alanında 
          yenilikçi projeler geliştiren, öğrencilere fırsatlar sunan dinamik bir ekibe sahiptir.
        </p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {member.name}
              </h3>
              <p className="text-[#78123e] font-semibold text-center mb-2">
                {member.role}
              </p>
              {member.description && (
                <p className="text-white/80 text-center text-sm">
                  {member.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-16">
          <Link 
            href="/"
            className="inline-block bg-white text-[#172c5c] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_70%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05)_0%,transparent_70%)] animate-pulse"></div>
      </div>
    </div>
  );
} 