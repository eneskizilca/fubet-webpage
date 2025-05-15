'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PanelIndex() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/panel/dashboard');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Yönlendiriliyor...</p>
    </div>
  );
} 