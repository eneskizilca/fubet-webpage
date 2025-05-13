'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentNumber: '',
    phone: '',
    email: '',
    faculty: '',
    department: '',
    classYear: '',
    birthDate: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.classYear) {
      setError('Lütfen sınıfınızı seçin.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(response);
      if (!response.ok) {
        throw new Error(data.message || 'Kayıt işlemi başarısız oldu');
      }

      // Başarılı kayıt sonrası ana sayfaya yönlendir
      router.push('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#172c5c] to-[#78123e] flex items-center justify-center px-4 overflow-hidden relative">

      {/* Sol Üst Logo ve Yazı */}
      <div className="flex items-center space-x-3 absolute top-6 left-6 z-50 animate-slide-in-left">
        <Link href="/">
          <img
            src="/logo.png"
            alt="FÜBET Logo"
            width={80}
            height={80}
            className="w-14 h-14 object-contain"
          />
        </Link>
        <Link href="/" className="border-l-4 border-white pl-3 text-white flex flex-col justify-center space-y-0.5 leading-tight">
          <p className="text-base sm:text-lg font-bold tracking-tight">FIRAT ÜNİVERSİTESİ</p>
          <p className="text-base sm:text-lg font-bold tracking-tight">BİLİŞİM VE EĞİTİM</p>
          <p className="text-base sm:text-lg font-bold tracking-tight">TOPLULUĞU</p>
        </Link>
      </div>

      {/* Arka plan efektleri */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_70%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05)_0%,transparent_70%)] animate-pulse"></div>
      </div>

      {/* Form alanı */}
      <div className="z-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-down">
        <h2 className="text-2xl font-bold text-center text-[#172c5c] mb-6">
          Topluluğumuza Katıl
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ad ve Soyad yan yana */}
          <div className="flex gap-x-4">
            <input
              name="firstName"
              placeholder="Ad"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input-style w-1/2"
            />
            <input
              name="lastName"
              placeholder="Soyad"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input-style w-1/2"
            />
          </div>

          {/* Diğer inputlar aynı şekilde devam ediyor */}
          {[
            { name: 'studentNumber', placeholder: 'Okul Numarası', type: 'text' },
            { name: 'phone', placeholder: 'Telefon Numarası', type: 'text' },
            { name: 'email', placeholder: 'Öğrenci Maili (@firat.edu.tr\'li mailiniz)', type: 'email' },
            { name: 'faculty', placeholder: 'Fakülte', type: 'text' },
            { name: 'department', placeholder: 'Bölüm', type: 'text' },
          ].map((input, idx) => (
            <input
              key={idx}
              name={input.name}
              placeholder={input.placeholder}
              type={input.type}
              value={formData[input.name as keyof typeof formData]}
              onChange={handleChange}
              required
              className="input-style"
            />
          ))}


          <select
            name="classYear"
            value={formData.classYear}
            onChange={handleChange}
            required
            className="input-style"
          >
            <option value="" disabled hidden>
              Sınıfınızı Seçin
            </option>
            <option value="Hazırlık">Hazırlık</option>
            <option value="1">1. Sınıf</option>
            <option value="2">2. Sınıf</option>
            <option value="3">3. Sınıf</option>
            <option value="4">4. Sınıf</option>
            <option value="5">5. Sınıf</option>
            <option value="6">6. Sınıf</option>
            <option value="Yüksek Lisans">Yüksek Lisans</option>
          </select>

          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="input-style"
          />

          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-style"
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#78123e] text-white py-3 rounded-xl hover:bg-[#601031] transition-shadow shadow-md hover:shadow-lg"
          >
            Kayıt Ol
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="text-[#172c5c] hover:underline">
            Zaten üye misiniz? Giriş yapın
          </Link>
        </div>
      </div>

      {/* Stil tanımı */}
      <style jsx>{`
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in-down {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        .input-style {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          border: 1px solid #ccc;
          outline: none;
          background-color: white;
          transition: 0.2s;
          appearance: none;
        }

        .input-style:focus {
          border-color: #78123e;
          box-shadow: 0 0 0 2px #78123e40;
        }

        select.input-style {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='10' viewBox='0 0 14 10'%3E%3Cpath fill='%2378123e' d='M7 10L0 0h14z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
        }
      `}</style>
    </div>
  );
}
