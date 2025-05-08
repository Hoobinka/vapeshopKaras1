import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">VapeShop</h3>
            <p className="text-blue-200 mb-4">
              Магазин электронных сигарет и аксессуаров. Широкий выбор под-систем, жидкостей и комплектующих.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-300" />
                <span>+7 (XXX) XXX-XX-XX</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-300" />
                <span>Brothersteam480@gmail.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-300" />
                <span>г. Москва, ул. Примерная, д. 123</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-blue-200 hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/catalog/pod-systems" className="text-blue-200 hover:text-white transition-colors">
                  Под-системы
                </Link>
              </li>
              <li>
                <Link to="/catalog/liquids" className="text-blue-200 hover:text-white transition-colors">
                  Жидкости
                </Link>
              </li>
              <li>
                <Link to="/catalog/accessories" className="text-blue-200 hover:text-white transition-colors">
                  Аксессуары
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/delivery" className="text-blue-200 hover:text-white transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-blue-200 hover:text-white transition-colors">
                  Возврат и обмен
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  Пользовательское соглашение
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-800 text-center text-blue-300">
          <p>© {new Date().getFullYear()} VapeShop. Все права защищены.</p>
          <p className="mt-2 text-sm">
            Сайт предназначен для лиц старше 18 лет. Продажа никотинсодержащей продукции несовершеннолетним запрещена.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;