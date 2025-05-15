'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Mail, MapPin, Phone, Calendar, Edit, Save, X } from 'lucide-react';
import Image from 'next/image';

// Mock user data (this would normally come from an API)
const mockUser = {
  id: 1,
  name: 'Ahmet',
  surname: 'Yılmaz',
  student_number: '123456789',
  phone: '05501234567',
  email: 'ahmet.yilmaz@firat.edu.tr',
  faculty: 'Mühendislik Fakültesi',
  department: 'Bilgisayar Mühendisliği',
  class: 2,
  birth_date: '2002-06-15',
  avatar: '/user-neutral.png',
  joinDate: '15 Eylül 2022'
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockUser);
  const [animateProfile, setAnimateProfile] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateProfile(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // In a real application, you would send this data to your API
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  // Format birth date for display
  const formatBirthDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-[#172c5c] to-[#78123e] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className={`text-3xl font-bold text-white mb-8 text-center transition-all duration-700 transform ${animateProfile ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Profil Sayfası
          </h1>
          
          <div className={`bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transition-all duration-700 delay-200 transform ${animateProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Profile Header */}
            <div className="bg-[#172c5c] p-6 text-white flex items-center justify-between relative">
              <div className="flex items-center gap-6">
                <div className={`w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md transition-all duration-700 delay-300 transform ${animateProfile ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <Image 
                    src={user.avatar} 
                    alt={`${user.name} ${user.surname}`} 
                    width={96} 
                    height={96} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className={`transition-all duration-700 delay-400 transform ${animateProfile ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <h2 className="text-2xl font-bold">{user.name} {user.surname}</h2>
                  <p className="text-blue-200">{user.faculty}</p>
                  <p className="text-blue-200">{user.department}</p>
                  <p className="text-blue-200">Öğrenci No: {user.student_number}</p>
                </div>
              </div>
              <div className={`transition-all duration-700 delay-500 transform ${animateProfile ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-[#78123e] text-white px-4 py-2 rounded-lg hover:bg-[#5a0e2c] transition-colors flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <Edit size={18} />
                    Profili Düzenle
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                      <Save size={18} />
                      Kaydet
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                      <X size={18} />
                      İptal
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className={`bg-gray-50 p-6 rounded-xl transition-all duration-700 delay-600 transform ${animateProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                  <h3 className="text-xl font-bold text-[#172c5c] mb-4 border-b pb-2">Kişisel Bilgiler</h3>
                  
                  {!isEditing ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                        <span className="font-medium">İsim:</span> 
                        <span>{user.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                        <span className="font-medium">Soyisim:</span> 
                        <span>{user.surname}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="text-[#78123e] w-5 h-5" />
                        <span className="font-medium">E-posta:</span> 
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="text-[#78123e] w-5 h-5" />
                        <span className="font-medium">Telefon:</span> 
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="text-[#78123e] w-5 h-5" />
                        <span className="font-medium">Doğum Tarihi:</span> 
                        <span>{formatBirthDate(user.birth_date)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 font-medium">
                          <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                          </svg>
                          İsim
                        </label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78123e] focus:border-transparent"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 font-medium">
                          <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                          </svg>
                          Soyisim
                        </label>
                        <input 
                          type="text" 
                          name="surname" 
                          value={formData.surname} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78123e] focus:border-transparent"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 font-medium">
                          <Mail className="text-[#78123e] w-5 h-5" />
                          E-posta
                        </label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          disabled
                          className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">E-posta adresi değiştirilemez</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 font-medium">
                          <Phone className="text-[#78123e] w-5 h-5" />
                          Telefon
                        </label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78123e] focus:border-transparent"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 font-medium">
                          <Calendar className="text-[#78123e] w-5 h-5" />
                          Doğum Tarihi
                        </label>
                        <input 
                          type="date" 
                          name="birth_date" 
                          value={formData.birth_date} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78123e] focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Account Information */}
                <div className={`bg-gray-50 p-6 rounded-xl transition-all duration-700 delay-800 transform ${animateProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                  <h3 className="text-xl font-bold text-[#172c5c] mb-4 border-b pb-2">Akademik Bilgiler</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="font-medium">Fakülte:</span> 
                      <span>{user.faculty}</span>
                    </div>
                    
                    {!isEditing ? (
                      <>
                        <div className="flex items-center gap-3">
                          <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span className="font-medium">Bölüm:</span> 
                          <span>{user.department}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-medium">Sınıf:</span> 
                          <span>{user.class}. Sınıf</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          <span className="font-medium">Öğrenci No:</span> 
                          <span>{user.student_number}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Calendar className="text-[#78123e] w-5 h-5" />
                          <span className="font-medium">Katılım Tarihi:</span> 
                          <span>{user.joinDate}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col gap-1">
                          <label className="flex items-center gap-2 font-medium">
                            <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Fakülte
                          </label>
                          <input 
                            type="text" 
                            name="faculty" 
                            value={formData.faculty} 
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78123e] focus:border-transparent"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <label className="flex items-center gap-2 font-medium">
                            <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Bölüm
                          </label>
                          <input 
                            type="text" 
                            name="department" 
                            value={formData.department} 
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78123e] focus:border-transparent"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <label className="flex items-center gap-2 font-medium">
                            <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Sınıf
                          </label>
                          <select
                            name="class"
                            value={formData.class}
                            onChange={(e) => setFormData({...formData, class: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78123e] focus:border-transparent"
                          >
                            <option value={1}>Hazırlık</option>
                            <option value={2}>1. Sınıf</option>
                            <option value={3}>2. Sınıf</option>
                            <option value={4}>3. Sınıf</option>
                            <option value={5}>4. Sınıf</option>
                            <option value={6}>5. Sınıf</option>
                            <option value={7}>6. Sınıf</option>
                            <option value={8}>Yüksek Lisans</option>
                          </select>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <label className="flex items-center gap-2 font-medium">
                            <svg className="text-[#78123e] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            Öğrenci No
                          </label>
                          <input 
                            type="text" 
                            name="student_number" 
                            value={formData.student_number} 
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78123e] focus:border-transparent"
                          />
                        </div>
                      </>
                    )}
                    
                    <div className="pt-4">
                      <button className="w-full bg-[#172c5c] text-white py-2 rounded-lg hover:bg-[#0e1a38] transition-colors cursor-pointer">
                        Şifre Değiştir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Events section */}
              <div className={`mt-8 bg-gray-50 p-6 rounded-xl transition-all duration-700 delay-1000 transform ${animateProfile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <h3 className="text-xl font-bold text-[#172c5c] mb-4 border-b pb-2">Katıldığınız Etkinlikler</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#f3e6ee] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-[#78123e] w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#172c5c]">React.js Temel Eğitimi</h4>
                        <p className="text-sm text-gray-500">15 Nisan 2024</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-[#78123e] text-white px-4 py-2 rounded-lg hover:bg-[#5a0e2c] transition-colors cursor-pointer hover:scale-105 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Belge Görüntüle
                    </button>
                  </div>
                  
                  <div className="flex justify-center">
                    <a href="/events/calendar" className="mt-2 inline-block text-[#78123e] font-medium hover:underline cursor-pointer">
                      Daha fazla etkinliğe katılın
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
} 