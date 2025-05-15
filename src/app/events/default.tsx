'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DefaultEventsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/events/past');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#172c5c] to-[#78123e]">
      <p className="text-white text-xl">Yönlendiriliyor...</p>
    </div>
  );
} 