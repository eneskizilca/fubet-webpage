'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, Mail, Phone, MapPin, ArrowLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Ad Soyad gereklidir';
    if (!formData.email.trim()) newErrors.email = 'E-posta gereklidir';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    if (!formData.subject.trim()) newErrors.subject = 'Konu gereklidir';
    if (!formData.message.trim()) newErrors.message = 'Mesaj gereklidir';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Bize Ulaşın</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Her türlü istek, öneri ve şikayetleriniz için bizimle iletişime geçebilirsiniz. En kısa sürede size dönüş yapacağız.
            </p>
          </div>

          <div className={`bg-white rounded-lg shadow-lg overflow-hidden mb-16 transition-all duration-700 delay-100 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">İletişim Formu</h2>
                  <p className="text-gray-600">
                    Dilek, istek ve önerilerinizi bize iletmek için aşağıdaki formu doldurabilirsiniz.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-green-800 mb-2">Mesajınız Gönderildi!</h3>
                    <p className="text-sm text-green-600 mb-4">
                      İletişim talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Yeni Mesaj Gönder
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ad Soyad*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon (İsteğe Bağlı)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Konu*
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mesaj*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.message ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#172c5c] hover:bg-[#0f1d3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Gönder
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
              
              <div className="md:w-1/2 bg-[#172c5c] text-white p-8 flex flex-col justify-center">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-center">FÜBET İletişim</h3>
                  <p className="text-gray-300 mb-6">
                    Fırat Üniversitesi Bilişim ve Eğitim Topluluğu olarak öğrencilerimizin her türlü istek, öneri ve şikayetlerini değerlendiriyoruz.
                  </p>
                  <p className="text-gray-300">
                    Ayrıca etkinliklerimiz, eğitimlerimiz ve projelerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 text-gray-300 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-white">E-posta</p>
                      <a href="mailto:fubet@firat.edu.tr" className="text-gray-300 hover:text-white cursor-pointer">fubet@firat.edu.tr</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 text-gray-300 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-white">Telefon</p>
                      <a href="tel:+904241234567" className="text-gray-300 hover:text-white cursor-pointer">+90 424 123 45 67</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-gray-300 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-white">Adres</p>
                      <p className="text-gray-300">
                        Fırat Üniversitesi Teknoloji Fakültesi<br />
                        23119 Elazığ, Türkiye
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                  <h4 className="text-lg font-medium mb-4 text-center">Sosyal Medya</h4>
                  <div className="flex justify-center space-x-6">
                    <a href="https://www.linkedin.com/company/fırat-üniversitesi-eğitim-ve-bilişim-topluluğu-fübet/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white cursor-pointer">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/fubet.firat" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white cursor-pointer">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/@fubett" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white cursor-pointer">
                      <span className="sr-only">YouTube</span>
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Mail className="w-6 h-6 text-blue-600" />,
                bgColor: "bg-blue-100",
                title: "E-posta",
                description: "Sorularınız için e-posta gönderebilirsiniz",
                contact: "fubet@firat.edu.tr",
                linkColor: "text-blue-600",
                href: "mailto:fubet@firat.edu.tr"
              },
              {
                icon: <Phone className="w-6 h-6 text-green-600" />,
                bgColor: "bg-green-100",
                title: "Telefon",
                description: "Hafta içi 09:00-17:00 arası arayabilirsiniz",
                contact: "+90 424 123 45 67",
                linkColor: "text-green-600",
                href: "tel:+904241234567"
              },
              {
                icon: <MapPin className="w-6 h-6 text-purple-600" />,
                bgColor: "bg-purple-100",
                title: "Adres",
                description: "Fırat Üniversitesi Teknoloji Fakültesi",
                contact: "23119 Elazığ, Türkiye",
                linkColor: "text-purple-600",
                href: "#"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className={`${item.bgColor} p-3 rounded-full mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a href={item.href} className={`${item.linkColor} hover:underline cursor-pointer`}>{item.contact}</a>
              </div>
            ))}
          </div>
          
          <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.1234567890123!2d39.19608212726022!3d38.68128665453678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQwJzUyLjYiTiAzOcKwMTEnNDUuOSJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
              className="w-full h-[250px]" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
} 