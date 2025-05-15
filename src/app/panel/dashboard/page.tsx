'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  Calendar, 
  Megaphone, 
  MessageSquare, 
  DollarSign, 
  Menu, 
  ChevronRight,
  LogOut,
  BarChart3,
  TrendingUp,
  UserPlus,
  CalendarCheck,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Flag
} from 'lucide-react';

export default function Dashboard() {
  const [activePage, setActivePage] = useState('İstatistikler');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'İstatistikler', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Üye İşlemleri', icon: <Users className="w-5 h-5" /> },
    { name: 'Etkinlik İşlemleri', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Duyuru İşlemleri', icon: <Megaphone className="w-5 h-5" /> },
    { name: 'Gelen İletiler', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Bütçe İşlemleri', icon: <DollarSign className="w-5 h-5" /> },
  ];

  const handlePageChange = (pageName: string) => {
    setActivePage(pageName);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#172c5c] text-white transition-all duration-300 ease-in-out fixed h-full z-10`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="FÜBET Logo" 
              width={32} 
              height={32} 
              className={`mr-2 ${!sidebarOpen && 'hidden'}`} 
            />
            <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>FÜBET</h1>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-full hover:bg-gray-700 cursor-pointer">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="py-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handlePageChange(item.name)}
              className={`w-full flex items-center p-4 ${activePage === item.name ? 'bg-[#78123e]' : 'hover:bg-gray-700'} transition-colors cursor-pointer`}
            >
              <div className="flex items-center">
                {item.icon}
                <span className={`ml-4 ${!sidebarOpen && 'hidden'}`}>{item.name}</span>
              </div>
              {activePage === item.name && sidebarOpen && (
                <ChevronRight className="ml-auto w-5 h-5" />
              )}
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 w-full border-t border-gray-700">
          <Link href="/" className="flex items-center p-4 hover:bg-gray-700 transition-colors cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span className={`ml-4 ${!sidebarOpen && 'hidden'}`}>Çıkış Yap (Siteye Dön)</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-20'} bg-gray-100 flex flex-col h-screen`}>
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{activePage}</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#78123e] text-white flex items-center justify-center">
                  <span className="font-medium">YA</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pb-20">
            {activePage === 'İstatistikler' && (
              <div className="space-y-6">
                {/* İstatistik Kartları */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Toplam Üye</p>
                        <h3 className="text-2xl font-bold">754</h3>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>%12 artış</span>
                      <span className="text-gray-500 ml-1">(son ay)</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Toplam Etkinlik</p>
                        <h3 className="text-2xl font-bold">48</h3>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>6 yeni etkinlik</span>
                      <span className="text-gray-500 ml-1">(bu ay)</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
                        <UserPlus className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Etkinlik Katılımı</p>
                        <h3 className="text-2xl font-bold">789</h3>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>%23 artış</span>
                      <span className="text-gray-500 ml-1">(son etkinlik)</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
                        <CalendarCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Yaklaşan Etkinlikler</p>
                        <h3 className="text-2xl font-bold">5</h3>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-blue-600">
                      <span>Haftaya: 2 etkinlik</span>
                    </div>
                  </div>
                </div>

                {/* Grafikler */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Etkinlik Katılımı Grafiği */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Etkinlik Katılım Oranları</h3>
                      <select className="text-sm border rounded-md px-2 py-1 cursor-pointer">
                        <option>Son 6 Ay</option>
                        <option>Son 3 Ay</option>
                        <option>Bu Yıl</option>
                      </select>
                    </div>
                    <div className="h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400">Etkinlik katılım grafiği burada görüntülenecek</p>
                    </div>
                  </div>

                  {/* Bölümlere Göre Üye Dağılımı */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Bölümlere Göre Üye Dağılımı</h3>
                      <select className="text-sm border rounded-md px-2 py-1 cursor-pointer">
                        <option>Tüm Bölümler</option>
                        <option>Mühendislik</option>
                        <option>Diğer Fakülteler</option>
                      </select>
                    </div>
                    <div className="h-64 w-full bg-gray-50 rounded-lg flex flex-col items-center justify-center p-4">
                      <div className="w-full flex flex-col space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Yazılım Mühendisliği</span>
                            <span className="font-medium">35%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Bilgisayar Mühendisliği</span>
                            <span className="font-medium">28%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Elektrik-Elektronik Mühendisliği</span>
                            <span className="font-medium">15%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Adli Bilişim Mühendisliği</span>
                            <span className="font-medium">12%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Diğer Bölümler</span>
                            <span className="font-medium">10%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">Toplam 754 üye</div>
                    </div>
                  </div>
                </div>

                {/* Popüler Etkinlikler ve Son Aktiviteler */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Popüler Etkinlikler */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">En Popüler Etkinlikler</h3>
                    <div className="space-y-4">
                      {[
                        {name: 'AI ve Makine Öğrenmesi Workshop', category: 'Yazılım', attendance: 95},
                        {name: 'Kariyer ve Networking Günü', category: 'Kariyer', attendance: 87},
                        {name: 'Web Geliştirme Bootcamp', category: 'Yazılım', attendance: 83}, 
                        {name: 'Siber Güvenlik Eğitimi', category: 'Yazılım', attendance: 78},
                      ].map((event, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div>
                            <h4 className="font-medium">{event.name}</h4>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{event.category}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold">{event.attendance}%</span>
                            <p className="text-xs text-gray-500">katılım oranı</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Son Aktiviteler */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">Son Aktiviteler</h3>
                    <ul className="space-y-3">
                      {[
                        {text: 'Yeni bir üye kaydoldu', time: '5 dakika önce'},
                        {text: 'React Workshop etkinliği oluşturuldu', time: '1 saat önce'},
                        {text: '3 üye Siber Güvenlik etkinliğine katıldı', time: '3 saat önce'},
                        {text: 'Yeni bir duyuru paylaşıldı', time: '5 saat önce'},
                        {text: 'Web Geliştirme Bootcamp etkinliği güncellendi', time: '1 gün önce'},
                      ].map((activity, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                          <div>
                            <p className="text-sm">{activity.text}</p>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'Üye İşlemleri' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Üye Listesi</h3>
                  <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Üye ara..."
                        className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#172c5c]"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
                        <Filter className="h-4 w-4" />
                        <span>Filtrele</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#172c5c] text-white rounded-md hover:bg-[#0f1d3d] transition-colors cursor-pointer">
                        <Plus className="h-4 w-4" />
                        <span>Yeni Üye</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bölüm</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Üyelik Tarihi</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: 'Ahmet Yılmaz', email: 'ahmet.yilmaz@firat.edu.tr', department: 'Bilgisayar Mühendisliği', status: 'Aktif', joinDate: '12 Mart 2023' },
                        { name: 'Ayşe Demir', email: 'ayse.demir@firat.edu.tr', department: 'Elektrik-Elektronik Mühendisliği', status: 'Aktif', joinDate: '5 Nisan 2023' },
                        { name: 'Mehmet Kaya', email: 'mehmet.kaya@firat.edu.tr', department: 'Yazılım Mühendisliği', status: 'Pasif', joinDate: '23 Mayıs 2023' },
                        { name: 'Zeynep Çelik', email: 'zeynep.celik@firat.edu.tr', department: 'Bilgisayar Mühendisliği', status: 'Aktif', joinDate: '10 Haziran 2023' },
                        { name: 'Emre Şahin', email: 'emre.sahin@firat.edu.tr', department: 'Endüstri Mühendisliği', status: 'Aktif', joinDate: '18 Eylül 2023' },
                        { name: 'Deniz Arslan', email: 'deniz.arslan@firat.edu.tr', department: 'Makine Mühendisliği', status: 'Pasif', joinDate: '7 Ekim 2023' },
                        { name: 'Elif Yıldız', email: 'elif.yildiz@firat.edu.tr', department: 'Yazılım Mühendisliği', status: 'Aktif', joinDate: '15 Ekim 2023' },
                        { name: 'Can Öztürk', email: 'can.ozturk@firat.edu.tr', department: 'Adli Bilişim Mühendisliği', status: 'Aktif', joinDate: '22 Ekim 2023' },
                        { name: 'Selin Aydın', email: 'selin.aydin@firat.edu.tr', department: 'Elektrik-Elektronik Mühendisliği', status: 'Aktif', joinDate: '3 Kasım 2023' },
                        { name: 'Burak Koç', email: 'burak.koc@firat.edu.tr', department: 'Bilgisayar Mühendisliği', status: 'Pasif', joinDate: '12 Kasım 2023' },
                        { name: 'İrem Aksoy', email: 'irem.aksoy@firat.edu.tr', department: 'Yazılım Mühendisliği', status: 'Aktif', joinDate: '25 Kasım 2023' },
                        { name: 'Onur Yılmaz', email: 'onur.yilmaz@firat.edu.tr', department: 'Adli Bilişim Mühendisliği', status: 'Aktif', joinDate: '4 Aralık 2023' },
                        { name: 'Gizem Kaya', email: 'gizem.kaya@firat.edu.tr', department: 'Bilgisayar Mühendisliği', status: 'Aktif', joinDate: '15 Aralık 2023' },
                        { name: 'Mert Demir', email: 'mert.demir@firat.edu.tr', department: 'Elektrik-Elektronik Mühendisliği', status: 'Pasif', joinDate: '22 Aralık 2023' },
                        { name: 'Ceren Şahin', email: 'ceren.sahin@firat.edu.tr', department: 'Yazılım Mühendisliği', status: 'Aktif', joinDate: '10 Ocak 2024' },
                        { name: 'Kaan Yıldırım', email: 'kaan.yildirim@firat.edu.tr', department: 'Bilgisayar Mühendisliği', status: 'Aktif', joinDate: '18 Ocak 2024' },
                        { name: 'Ece Çelik', email: 'ece.celik@firat.edu.tr', department: 'Adli Bilişim Mühendisliği', status: 'Aktif', joinDate: '27 Ocak 2024' },
                        { name: 'Berk Aydın', email: 'berk.aydin@firat.edu.tr', department: 'Elektrik-Elektronik Mühendisliği', status: 'Aktif', joinDate: '5 Şubat 2024' },
                        { name: 'Sude Kaya', email: 'sude.kaya@firat.edu.tr', department: 'Yazılım Mühendisliği', status: 'Pasif', joinDate: '14 Şubat 2024' },
                        { name: 'Arda Özkan', email: 'arda.ozkan@firat.edu.tr', department: 'Bilgisayar Mühendisliği', status: 'Aktif', joinDate: '23 Şubat 2024' },
                        { name: 'Yağmur Demir', email: 'yagmur.demir@firat.edu.tr', department: 'Adli Bilişim Mühendisliği', status: 'Aktif', joinDate: '3 Mart 2024' },
                        { name: 'Emir Şahin', email: 'emir.sahin@firat.edu.tr', department: 'Elektrik-Elektronik Mühendisliği', status: 'Aktif', joinDate: '12 Mart 2024' },
                        { name: 'Zehra Yıldız', email: 'zehra.yildiz@firat.edu.tr', department: 'Yazılım Mühendisliği', status: 'Aktif', joinDate: '21 Mart 2024' },
                        { name: 'Efe Kaya', email: 'efe.kaya@firat.edu.tr', department: 'Bilgisayar Mühendisliği', status: 'Pasif', joinDate: '30 Mart 2024' },
                        { name: 'Naz Çetin', email: 'naz.cetin@firat.edu.tr', department: 'Adli Bilişim Mühendisliği', status: 'Aktif', joinDate: '8 Nisan 2024' },
                        { name: 'Umut Aksoy', email: 'umut.aksoy@firat.edu.tr', department: 'Elektrik-Elektronik Mühendisliği', status: 'Aktif', joinDate: '17 Nisan 2024' },
                        { name: 'Defne Yılmaz', email: 'defne.yilmaz@firat.edu.tr', department: 'Yazılım Mühendisliği', status: 'Aktif', joinDate: '26 Nisan 2024' },
                        { name: 'Alp Kaya', email: 'alp.kaya@firat.edu.tr', department: 'Bilgisayar Mühendisliği', status: 'Aktif', joinDate: '5 Mayıs 2024' },
                        { name: 'Duru Demir', email: 'duru.demir@firat.edu.tr', department: 'Adli Bilişim Mühendisliği', status: 'Pasif', joinDate: '14 Mayıs 2024' },
                        { name: 'Kerem Şahin', email: 'kerem.sahin@firat.edu.tr', department: 'Elektrik-Elektronik Mühendisliği', status: 'Aktif', joinDate: '23 Mayıs 2024' }
                      ].map((user, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#172c5c] text-white flex items-center justify-center">
                                <span>{user.name.charAt(0)}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer">Düzenle</button>
                              <button className="text-red-600 hover:text-red-900 cursor-pointer">Sil</button>
                              <button className="cursor-pointer">
                                <MoreHorizontal className="h-5 w-5 text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        Önceki
                      </button>
                      <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        Sonraki
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">754</span> üyeden <span className="font-medium">1</span>-<span className="font-medium">30</span> arası gösteriliyor
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                            <span className="sr-only">Previous</span>
                            &lt;
                          </button>
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#172c5c] text-sm font-medium text-white hover:bg-[#0f1d3d] cursor-pointer">
                            1
                          </button>
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                            2
                          </button>
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                            3
                          </button>
                          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                            <span className="sr-only">Next</span>
                            &gt;
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'Etkinlik İşlemleri' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Etkinlik Yönetimi</h3>
                  <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Etkinlik ara..."
                        className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#172c5c]"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#78123e] text-white rounded-md hover:bg-[#5a0e2c] transition-colors cursor-pointer">
                        <Plus className="h-4 w-4" />
                        <span>Yeni Etkinlik</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      title: 'React.js Workshop', 
                      date: '15 Nisan 2024', 
                      category: 'Yazılım', 
                      location: 'Teknoloji Fakültesi - Lab 3',
                      capacity: '30',
                      registered: '18',
                      image: '/workshop-react.jpg'
                    },
                    { 
                      title: 'Python ile Veri Bilimi', 
                      date: '22 Nisan 2024', 
                      category: 'Yazılım', 
                      location: 'Mühendislik Fakültesi - Konferans Salonu',
                      capacity: '50',
                      registered: '35',
                      image: '/workshop-python.jpg'
                    },
                    { 
                      title: 'Yapay Zeka Sempozyumu', 
                      date: '3 Mayıs 2024', 
                      category: 'Konferans', 
                      location: 'Rektörlük Büyük Salon',
                      capacity: '200',
                      registered: '145',
                      image: '/ai-symposium.jpg'
                    },
                    { 
                      title: 'Teknoloji Kariyer Günü', 
                      date: '12 Mayıs 2024', 
                      category: 'Kariyer', 
                      location: 'Merkez Kampüs Fuar Alanı',
                      capacity: '500',
                      registered: '312',
                      image: '/career-day.jpg'
                    },
                    { 
                      title: 'İnovasyon ve Girişimcilik', 
                      date: '20 Mayıs 2024', 
                      category: 'Eğitim', 
                      location: 'İktisadi ve İdari Bilimler Fakültesi',
                      capacity: '80',
                      registered: '45',
                      image: '/innovation.jpg'
                    },
                    { 
                      title: 'Flutter Mobile App Geliştirme', 
                      date: '28 Mayıs 2024', 
                      category: 'Yazılım', 
                      location: 'Teknoloji Fakültesi - Lab 2',
                      capacity: '25',
                      registered: '23',
                      image: '/flutter-workshop.jpg'
                    }
                  ].map((event, idx) => (
                    <div key={idx} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-40 bg-gray-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          <span>{event.image ? 'Etkinlik Görseli' : 'Görsel Yok'}</span>
                        </div>
                        <div className="absolute top-0 left-0 bg-[#78123e] text-white px-2 py-1 text-xs">
                          {event.date}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-1">{event.title}</h4>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{event.category}</span>
                          <span className="text-xs text-gray-500">{event.location}</span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Katılım: {event.registered}/{event.capacity}</span>
                            <span className="font-medium">{Math.round((parseInt(event.registered) / parseInt(event.capacity)) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-[#172c5c] h-1.5 rounded-full" 
                              style={{ width: `${Math.round((parseInt(event.registered) / parseInt(event.capacity)) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <button className="text-indigo-600 hover:text-indigo-900 text-sm mr-2 cursor-pointer">Düzenle</button>
                            <button className="text-red-600 hover:text-red-900 text-sm cursor-pointer">Sil</button>
                          </div>
                          <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                      <span className="sr-only">Previous</span>
                      &lt;
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#172c5c] text-sm font-medium text-white hover:bg-[#0f1d3d] cursor-pointer">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                      <span className="sr-only">Next</span>
                      &gt;
                    </button>
                  </nav>
                </div>
              </div>
            )}

            {activePage === 'Duyuru İşlemleri' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Duyuru Yönetimi</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Duyuru ara..."
                        className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#172c5c]"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <button className="bg-[#78123e] text-white px-4 py-2 rounded-md hover:bg-[#5a0e2c] transition-colors flex items-center gap-2 cursor-pointer">
                      <Plus className="h-4 w-4" />
                      <span>Yeni Duyuru</span>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      title: 'Bahar Şenliği Duyurusu',
                      content: 'Bu yıl bahar şenliğimiz 15-16 Mayıs tarihlerinde kampüs alanında gerçekleştirilecektir. Tüm öğrencilerimiz davetlidir.',
                      category: 'Etkinlik',
                      date: '10 Nisan 2024',
                      important: true
                    },
                    {
                      title: 'Yazılım Staj Programı Başvuruları',
                      content: 'XYZ Teknoloji firmasının yaz staj programı başvuruları başlamıştır. Son başvuru tarihi 30 Nisan 2024.',
                      category: 'Staj',
                      date: '5 Nisan 2024',
                      important: true
                    },
                    {
                      title: 'Mezuniyet Töreni Bilgilendirmesi',
                      content: 'Mezuniyet töreni 20 Haziran 2024 tarihinde saat 14:00\'da Ana Kampüs Stadyumunda gerçekleştirilecektir.',
                      category: 'Bilgilendirme',
                      date: '1 Nisan 2024',
                      important: false
                    },
                    {
                      title: 'Bilişim Güvenliği Semineri',
                      content: 'Bilişim güvenliği semineri 25 Nisan 2024 tarihinde Merkez Konferans Salonunda düzenlenecektir. Katılım için kayıt gereklidir.',
                      category: 'Seminer',
                      date: '25 Mart 2024',
                      important: false
                    },
                  ].map((announcement, idx) => (
                    <div key={idx} className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${announcement.important ? 'border-l-4 border-l-[#78123e]' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{announcement.title}</h4>
                            {announcement.important && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">Önemli</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {announcement.content}
                          </p>
                        </div>
                        <div className="flex">
                          <button className="text-indigo-600 hover:text-indigo-900 text-sm mr-3 cursor-pointer">Düzenle</button>
                          <button className="text-red-600 hover:text-red-900 text-sm cursor-pointer">Sil</button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">{announcement.category}</span>
                        <span className="text-xs text-gray-500">{announcement.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePage === 'Gelen İletiler' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">İletişim Mesajları</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Mesajlarda ara..."
                        className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#172c5c]"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <select className="border rounded-md px-3 py-2 text-sm cursor-pointer">
                      <option>Tüm Mesajlar</option>
                      <option>Bekleyen</option>
                      <option>Yanıtlanan</option>
                      <option>Arşivlenen</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      name: 'Mehmet Kaya',
                      email: 'mehmet.kaya@example.com',
                      content: 'Merhaba, gelecek ayki Python eğitimi hakkında detaylı bilgi almak istiyorum. Katılım için ön kayıt gerekiyor mu?',
                      date: '5 Nisan 2024',
                      status: 'Bekliyor',
                      phone: '0532 123 4567'
                    },
                    {
                      name: 'Ayşe Yılmaz',
                      email: 'ayse.yilmaz@example.com',
                      content: 'AI ve Makine Öğrenmesi workshopuna kayıt olmuştum ancak katılamayacağım. Kaydımı iptal etmek istiyorum.',
                      date: '4 Nisan 2024',
                      status: 'Yanıtlandı',
                      phone: '0533 456 7890'
                    },
                    {
                      name: 'Ali Demir',
                      email: 'ali.demir@example.com',
                      content: 'FÜBET\'e üye olmak istiyorum. Üyelik şartları ve prosedürü hakkında bilgi alabilir miyim?',
                      date: '3 Nisan 2024',
                      status: 'Bekliyor',
                      phone: '0535 789 0123'
                    },
                    {
                      name: 'Zeynep Çelik',
                      email: 'zeynep.celik@example.com',
                      content: 'Merhaba, topluluğunuzla bir işbirliği projesi geliştirmek istiyoruz. Görüşmek için uygun bir zaman ayarlayabilir miyiz?',
                      date: '2 Nisan 2024',
                      status: 'Yanıtlandı',
                      phone: '0536 012 3456'
                    },
                    {
                      name: 'Burak Şahin',
                      email: 'burak.sahin@example.com',
                      content: 'Web Geliştirme Bootcamp\'i için geç başvuru yapabilir miyim? Son başvuru tarihini kaçırdım ama katılmak istiyorum.',
                      date: '1 Nisan 2024',
                      status: 'Bekliyor',
                      phone: '0537 345 6789'
                    },
                  ].map((message, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{message.name}</h4>
                          <p className="text-sm text-gray-700 mt-1">
                            {message.content}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-3">
                            <div className="flex items-center text-xs text-gray-500">
                              <Mail className="w-3 h-3 mr-1" />
                              {message.email}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Phone className="w-3 h-3 mr-1" />
                              {message.phone}
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          message.status === 'Bekliyor' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {message.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-500">{message.date}</span>
                        <div className="flex gap-2">
                          <button className="text-indigo-600 hover:text-indigo-900 text-sm cursor-pointer">Yanıtla</button>
                          <button className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">Arşivle</button>
                          <button className="text-red-600 hover:text-red-900 text-sm cursor-pointer">Sil</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePage === 'Bütçe İşlemleri' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-6">Bütçe Yönetimi</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="text-sm text-blue-700 mb-2">Mevcut Bakiye</h4>
                    <p className="text-2xl font-bold text-blue-800">₺12,650</p>
                    <p className="text-xs text-blue-600 mt-2">Son güncelleme: 12 Nis 2024</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="text-sm text-green-700 mb-2">Toplam Gelir</h4>
                    <p className="text-2xl font-bold text-green-800">₺25,000</p>
                    <p className="text-xs text-green-600 mt-2">2024 Yılı</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="text-sm text-red-700 mb-2">Toplam Gider</h4>
                    <p className="text-2xl font-bold text-red-800">₺12,350</p>
                    <p className="text-xs text-red-600 mt-2">2024 Yılı</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium">Hesap Hareketleri</h4>
                    <div className="flex space-x-2">
                      <select className="text-sm border rounded-md px-2 py-1 cursor-pointer">
                        <option>Tüm İşlemler</option>
                        <option>Gelirler</option>
                        <option>Giderler</option>
                      </select>
                      <button className="bg-[#78123e] text-white px-3 py-1 rounded-md hover:bg-[#5a0e2c] transition-colors text-sm cursor-pointer">
                        Yeni İşlem
                      </button>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Açıklama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miktar</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { desc: 'A Holding Sponsorluk', date: '15 Nis 2024', amount: '+₺5,000', status: 'Onaylandı', type: 'gelir' },
                        { desc: 'Workshop Malzemeleri', date: '10 Nis 2024', amount: '-₺1,250', status: 'Onaylandı', type: 'gider' },
                        { desc: 'B Firması Sponsorluk', date: '8 Nis 2024', amount: '+₺3,000', status: 'Onaylandı', type: 'gelir' },
                        { desc: 'Konuşmacı Ödemesi', date: '5 Nis 2024', amount: '-₺2,500', status: 'Onaylandı', type: 'gider' },
                        { desc: 'Fakülte Destek Fonu', date: '1 Nis 2024', amount: '+₺2,500', status: 'Onaylandı', type: 'gelir' },
                        { desc: 'Tanıtım Afişleri', date: '28 Mar 2024', amount: '-₺750', status: 'Onaylandı', type: 'gider' },
                        { desc: 'Teknik Ekipman', date: '15 Mar 2024', amount: '-₺3,200', status: 'Onaylandı', type: 'gider' },
                      ].map((item, idx) => (
                        <tr key={idx} className={item.type === 'gelir' ? 'bg-green-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.desc}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${item.type === 'gelir' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 