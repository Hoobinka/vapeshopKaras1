import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useProducts } from '../context/ProductContext';
import { 
  Package, Users, Settings, LogOut, Grid, PlusCircle, Search, 
  ChevronRight, Bot
} from 'lucide-react';
import AdminProductEdit from './admin/AdminProductEdit';
import AdminProductsList from './admin/AdminProductsList';
import AdminProductCreate from './admin/AdminProductCreate';
import AdminAIChat from './admin/AdminAIChat';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAdmin();
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    document.title = 'Панель администратора | VapeShop';
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const isRouteActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <div className="flex flex-col min-h-[80vh]">
      <div className="bg-gray-800 text-white py-4 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Панель администратора</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-300 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-md md:min-h-[80vh] z-10">
          <div className="p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Поиск..."
              />
            </div>
          </div>
          
          <nav className="mt-2">
            <Link
              to="/admin"
              className={`flex items-center px-4 py-3 text-sm ${
                isRouteActive('/admin') && !isRouteActive('/admin/products') && !isRouteActive('/admin/settings') && !isRouteActive('/admin/ai')
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Grid className="mr-3 h-5 w-5" />
              Обзор
            </Link>
            
            <Link
              to="/admin/products"
              className={`flex items-center px-4 py-3 text-sm ${
                isRouteActive('/admin/products')
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Package className="mr-3 h-5 w-5" />
              Товары
              <span className="ml-auto bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded-full">
                {products.length}
              </span>
            </Link>
            
            <Link
              to="/admin/customers"
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Users className="mr-3 h-5 w-5" />
              Клиенты
            </Link>
            
            <Link
              to="/admin/settings"
              className={`flex items-center px-4 py-3 text-sm ${
                isRouteActive('/admin/settings')
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Настройки
            </Link>

            <Link
              to="/admin/ai"
              className={`flex items-center px-4 py-3 text-sm ${
                isRouteActive('/admin/ai')
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bot className="mr-3 h-5 w-5" />
              Искусственный интеллект
            </Link>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/products" element={<AdminProductsList />} />
            <Route path="/products/new" element={<AdminProductCreate />} />
            <Route path="/products/edit/:id" element={<AdminProductEdit />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/ai" element={<AdminAIChat />} />
            <Route path="*" element={<AdminOverview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Admin Overview Component
const AdminOverview: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  
  // Count products by category
  const podSystems = products.filter(p => p.category === 'pod-systems').length;
  const liquids = products.filter(p => p.category === 'liquids').length;
  const accessories = products.filter(p => p.category === 'accessories').length;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Обзор</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Всего товаров</h3>
          <p className="text-3xl font-bold text-blue-600">{products.length}</p>
          <button
            onClick={() => navigate('/admin/products')}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Управление товарами
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Заказы</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
            Просмотр заказов
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Клиенты</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
            Управление клиентами
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Товары по категориям</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Под-системы</span>
                <span className="text-sm font-medium text-gray-700">{podSystems}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(podSystems / products.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Жидкости</span>
                <span className="text-sm font-medium text-gray-700">{liquids}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(liquids / products.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Аксессуары</span>
                <span className="text-sm font-medium text-gray-700">{accessories}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${(accessories / products.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/admin/products/new')}
            className="mt-6 flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Добавить новый товар
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Недавние действия</h3>
          
          <div className="border-l-2 border-gray-200 pl-4 space-y-6">
            <div className="relative">
              <div className="absolute -left-6 w-4 h-4 rounded-full bg-blue-600"></div>
              <div className="mb-1 text-sm text-gray-500">Сегодня, 12:30</div>
              <p className="text-gray-700">Вход в панель администратора</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-6 w-4 h-4 rounded-full bg-green-600"></div>
              <div className="mb-1 text-sm text-gray-500">Сегодня, 12:31</div>
              <p className="text-gray-700">Инициализация системы</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Settings Component
const AdminSettings: React.FC = () => {
  const [siteName, setSiteName] = useState('VapeShop');
  const [email, setEmail] = useState('Brothersteam480@gmail.com');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      alert('Настройки сохранены');
    }, 1000);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Настройки</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium">Основные настройки</h3>
        </div>
        
        <form onSubmit={handleSave} className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="siteName">
                Название сайта
              </label>
              <input
                type="text"
                id="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email для уведомлений
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className={`px-4 py-2 rounded-md text-white ${
                  isSaving 
                    ? 'bg-gray-400' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSaving ? 'Сохранение...' : 'Сохранить настройки'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;