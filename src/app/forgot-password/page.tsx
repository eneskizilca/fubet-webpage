'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Geçerli bir e-posta girin.');
      return;
    }

    // Backend'e gönderme işlemi burada olacak (şifre sıfırlama e-postası)
    setSubmitted(true);
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
          Şifremi Unuttum
        </h2>

        {submitted ? (
          <p className="text-center text-green-700 font-semibold">
            Eğer bu e-posta ile kayıtlıysanız sıfırlama bağlantısı gönderildi.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Öğrenci Maili"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
              className="input-style"
            />

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#78123e] text-white py-3 rounded-xl hover:bg-[#601031] transition-shadow shadow-md hover:shadow-lg cursor-pointer"
            >
              Sıfırlama Bağlantısı Gönder
            </button>
          </form>
        )}

        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="text-[#172c5c] hover:underline">
            Giriş sayfasına dön
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
        }

        .input-style:focus {
          border-color: #78123e;
          box-shadow: 0 0 0 2px #78123e40;
        }
      `}</style>
    </div>
  );
}
