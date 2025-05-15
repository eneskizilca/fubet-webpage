'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Mail, MapPin, Phone, Calendar, Edit, Save, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Default user data structure and type
interface UserData {
  id?: string;
  _id?: string;  // MongoDB genellikle _id kullanır
  name: string;
  surname: string;
  student_number: string;
  phone: string;
  email: string;
  faculty: string;
  department: string;
  class: number;
  birth_date: string;
  avatar: string;
  joinDate: string;
}

const defaultUser: UserData = {
  name: '',
  surname: '',
  student_number: '',
  phone: '',
  email: '',
  faculty: '',
  department: '',
  class: 1,
  birth_date: '',
  avatar: '/user-neutral.png',
  joinDate: ''
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData>(defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(defaultUser);
  const [animateProfile, setAnimateProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Check authentication and get user data from localStorage
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as any; // API'den gelen veriyi önce any olarak işleyelim
      
      // Format join date from created_at
      const joinDate = parsedUser.created_at ? 
        new Date(parsedUser.created_at).toLocaleDateString('tr-TR', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }) : '';
      
      const userData: UserData = {
        ...parsedUser,
        // MongoDB'den gelen _id'yi id olarak da saklayalım
        id: parsedUser.id || parsedUser._id,
        avatar: '/user-neutral.png', // Default avatar
        joinDate
      };
      
      setUser(userData);
      setFormData(userData);
      setIsLoading(false);
      
      // Trigger animations after data is loaded
      setTimeout(() => {
        setAnimateProfile(true);
      }, 100);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    setUpdateLoading(true);
    setUpdateError("");
    setUpdateSuccess(false);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error("Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
      }
      
      // MongoDB ID'sini al (user.id)
      const userId = user.id;
      console.log("Update edilecek ID:", userId);
      
      // API'ye istek gönder
      const response = await fetch(`http://127.0.0.1:8000/api/panel/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          faculty: formData.faculty,
          department: formData.department,
          class: parseInt(formData.class.toString()),
          birth_date: formData.birth_date,
          student_number: formData.student_number
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Güncelleme işlemi başarısız oldu');
      }
      
      const data = await response.json();
      console.log("Update başarılı:", data);
      
      // State ve localStorage güncelle
      setUser({
        ...user,
        ...data
      });
      
      localStorage.setItem('user', JSON.stringify({
        ...JSON.parse(localStorage.getItem('user') || '{}'),
        ...data
      }));
      
      setUpdateSuccess(true);
      
      setTimeout(() => {
        setUpdateSuccess(false);
        setIsEditing(false);
      }, 2000);
      
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      setUpdateError(error instanceof Error ? error.message : 'Güncelleme sırasında bir hata oluştu');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };
  
  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowLogoutConfirm(false);
    router.push('/');
  };
  
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  // Format birth date for display
  const formatBirthDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gradient-to-br from-[#172c5c] to-[#78123e] flex items-center justify-center">
          <div className="text-white text-xl">Yükleniyor...</div>
        </main>
      </div>
    );
  }

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
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-[#78123e] text-white px-4 py-2 rounded-lg hover:bg-[#5a0e2c] transition-colors flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                      <Edit size={18} />
                      Profili Düzenle
                    </button>
                    <button 
                      onClick={handleLogoutClick}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Çıkış Yap
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <button 
                        onClick={handleSave}
                        disabled={updateLoading}
                        className={`text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300 ${
                          updateSuccess 
                            ? "bg-green-500" 
                            : updateLoading 
                              ? "bg-blue-400 cursor-not-allowed" 
                              : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {updateLoading ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
                        ) : updateSuccess ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <Save size={18} />
                        )}
                        {updateLoading ? "Kaydediliyor..." : updateSuccess ? "Kaydedildi!" : "Kaydet"}
                      </button>
                      <button 
                        onClick={handleCancel}
                        disabled={updateLoading}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X size={18} />
                        İptal
                      </button>
                    </div>
                    
                    {updateError && (
                      <p className="text-red-600 text-sm mt-2">
                        {updateError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              {updateError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 relative" role="alert">
                  <strong className="font-bold">Hata! </strong>
                  <span className="block sm:inline">{updateError}</span>
                </div>
              )}
              
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
                            <option value={0}>Hazırlık</option>
                            <option value={1}>1. Sınıf</option>
                            <option value={2}>2. Sınıf</option>
                            <option value={3}>3. Sınıf</option>
                            <option value={4}>4. Sınıf</option>
                            <option value={5}>5. Sınıf</option>
                            <option value={6}>6. Sınıf</option>
                            <option value={99}>Yüksek Lisans</option>
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
                            placeholder="Öğrenci numaranızı giriniz"
                          />
                          <p className="text-xs text-gray-500 mt-1">Öğrenci numarası yazınız. Numaranızı değiştirirseniz kayıt etmeden önce şifreniz size tekrar sorulacaktır.</p>
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

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      {/* Çıkış Onayı Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div 
            className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#172c5c] mb-4 text-center">Çıkış Yapmak İstiyor musunuz?</h3>
            
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={confirmLogout}
                className="w-full py-2.5 rounded-xl bg-[#78123e] text-white font-bold hover:bg-[#5a0e2c] transition-colors"
              >
                Çıkış Yap
              </button>
              <button
                onClick={cancelLogout}
                className="w-full py-2.5 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 