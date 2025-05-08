import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { ArrowRight, Gift, Truck, Shield } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  
  // Get featured products (top 8)
  const featuredProducts = products.slice(0, 8);
  
  // Get products by category
  const podSystems = products.filter(product => product.category === 'pod-systems').slice(0, 4);
  const liquids = products.filter(product => product.category === 'liquids').slice(0, 4);
  
  useEffect(() => {
    // Update the page title
    document.title = 'VapeShop - Магазин электронных сигарет';
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Лучшие под-системы и жидкости</h1>
              <p className="text-xl mb-8 text-blue-100">
                Широкий выбор электронных сигарет, жидкостей и аксессуаров по доступным ценам
              </p>
              <button 
                onClick={() => navigate('/catalog')}
                className="bg-white text-blue-600 font-medium px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors transform hover:scale-105 duration-300 shadow-lg"
              >
                Перейти в каталог
              </button>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-xl backdrop-blur-sm">
                <img 
                  src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg" 
                  alt="Vape devices collection" 
                  className="rounded-lg w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставка во все регионы России курьером или почтой</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Только оригинальная и сертифицированная продукция</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Gift className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Бонусы и скидки</h3>
              <p className="text-gray-600">Накопительная система скидок для постоянных клиентов</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Популярные товары</h2>
            <button 
              onClick={() => navigate('/catalog')}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Смотреть все <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Наши категории</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="relative bg-blue-600 rounded-lg overflow-hidden h-64 shadow-md cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg"
              onClick={() => navigate('/catalog/pod-systems')}
            >
              <img 
                src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg" 
                alt="Pod Systems" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Под-системы</h3>
                <p className="text-blue-100 mb-4">Современные и компактные устройства</p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Перейти
                </button>
              </div>
            </div>
            
            <div 
              className="relative bg-blue-600 rounded-lg overflow-hidden h-64 shadow-md cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg"
              onClick={() => navigate('/catalog/liquids')}
            >
              <img 
                src="https://images.pexels.com/photos/4753890/pexels-photo-4753890.jpeg" 
                alt="E-Liquids" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Жидкости</h3>
                <p className="text-blue-100 mb-4">Разнообразие вкусов для любых предпочтений</p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Перейти
                </button>
              </div>
            </div>
            
            <div 
              className="relative bg-blue-600 rounded-lg overflow-hidden h-64 shadow-md cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg"
              onClick={() => navigate('/catalog/accessories')}
            >
              <img 
                src="https://images.pexels.com/photos/3818433/pexels-photo-3818433.jpeg" 
                alt="Accessories" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Аксессуары</h3>
                <p className="text-blue-100 mb-4">Картриджи, испарители и многое другое</p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Перейти
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pod Systems Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Популярные под-системы</h2>
            <button 
              onClick={() => navigate('/catalog/pod-systems')}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Все под-системы <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <ProductGrid products={podSystems} loading={loading} />
        </div>
      </section>
      
      {/* Liquids Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Популярные жидкости</h2>
            <button 
              onClick={() => navigate('/catalog/liquids')}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Все жидкости <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <ProductGrid products={liquids} loading={loading} />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы сделать заказ?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Широкий ассортимент электронных сигарет, жидкостей и аксессуаров ждет вас в нашем каталоге.
          </p>
          <button 
            onClick={() => navigate('/catalog')}
            className="bg-white text-blue-600 font-medium px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors transform hover:scale-105 duration-300 shadow-lg"
          >
            Перейти в каталог
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;