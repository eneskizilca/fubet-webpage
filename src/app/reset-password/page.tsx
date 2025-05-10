'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    if (!token) {
      setError('Geçersiz bağlantı.');
      return;
    }

    // Şifre sıfırlama isteği
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!res.ok) throw new Error('Şifre sıfırlama başarısız oldu.');

      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err) {
      setError('Şifre sıfırlanamadı. Bağlantı süresi dolmuş olabilir.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#172c5c] to-[#78123e] px-4 overflow-hidden relative">
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

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#172c5c] mb-6">
          Yeni Şifre Belirle
        </h2>

        {success ? (
          <p className="text-green-700 text-center">
            Şifreniz başarıyla güncellendi. Giriş sayfasına yönlendiriliyorsunuz...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Yeni Şifre"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError('');
              }}
              className="input-style"
              required
            />
            <input
              type="password"
              placeholder="Yeni Şifre (Tekrar)"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              className="input-style"
              required
            />

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#78123e] text-white py-3 rounded-xl hover:bg-[#601031] transition-shadow shadow-md hover:shadow-lg"
            >
              Şifreyi Güncelle
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
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
