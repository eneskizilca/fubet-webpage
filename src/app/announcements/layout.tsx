'use client';
import Navbar from '../../components/Navbar';

export default function AnnouncementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
} 