"use client";
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);
  return [ref, inView] as const;
}

export default function HomeAnimatedSections() {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  return (
    <>
      <section ref={ref1} className={`w-full py-16 bg-[#f8f8fa] transition-all duration-700 ${inView1 ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#78123e] mb-12">Etkinliklerimizden Kareler</h2>
          {/* Basit slider/carousel */}
          <div className="relative w-full overflow-x-auto flex gap-6 pb-2">
            {/* Placeholder images, replace with your own */}
            <img src="/event1.jpg" alt="Etkinlik 1" className="h-56 w-80 object-cover rounded-xl shadow-md flex-shrink-0" />
            <img src="/event2.jpg" alt="Etkinlik 2" className="h-56 w-80 object-cover rounded-xl shadow-md flex-shrink-0" />
            <img src="/event3.jpg" alt="Etkinlik 3" className="h-56 w-80 object-cover rounded-xl shadow-md flex-shrink-0" />
          </div>
        </div>
      </section>
      <section ref={ref2} className={`w-full py-16 bg-white transition-all duration-700 ${inView2 ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#78123e] mb-12">Sponsorluk ve İşbirliklerimiz</h2>
          <div className="flex justify-center">
            {/* Flip Card */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center">
                  <img src="/techcareer.svg" alt="Techcareer" width={185} height={20} className="w-[185px] h-[20px] object-contain mb-2" />
                </div>
                <div className="flip-card-back absolute inset-0 bg-[#78123e] rounded-2xl shadow-xl flex flex-col items-center justify-center text-white px-4 text-center">
                  <span className="text-lg font-bold mb-2">Techcareer</span>
                  <span className="text-base">Yazılım ve kariyer konusunda bootcamp, eğitim ve etkinlik desteği anlaşması yapılmıştır.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 