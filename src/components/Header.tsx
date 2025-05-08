import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { isAdmin, logout } = useAdmin();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`sticky top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-blue-600 shadow-md' : 'bg-blue-700'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">VapeShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors font-medium">
              Главная
            </Link>
            <Link to="/catalog" className="text-white hover:text-blue-200 transition-colors font-medium">
              Каталог
            </Link>
            <Link to="/catalog/pod-systems" className="text-white hover:text-blue-200 transition-colors font-medium">
              Под-системы
            </Link>
            <Link to="/catalog/liquids" className="text-white hover:text-blue-200 transition-colors font-medium">
              Жидкости
            </Link>
            <Link to="/catalog/accessories" className="text-white hover:text-blue-200 transition-colors font-medium">
              Аксессуары
            </Link>
          </nav>

          {/* Right section with Cart and Admin */}
          <div className="flex items-center space-x-4">
            {/* Admin Button */}
            <Link 
              to="/admin/login" 
              className="text-white hover:text-blue-200 transition-colors flex items-center"
            >
              <User className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">
                {isAdmin ? 'Админ панель' : 'Вход'}
              </span>
            </Link>
            
            <Link to="/cart" className="relative flex items-center text-white">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-white font-medium">
              Главная
            </Link>
            <Link to="/catalog" className="block py-2 text-white font-medium">
              Каталог
            </Link>
            <Link to="/catalog/pod-systems" className="block py-2 text-white font-medium">
              Под-системы
            </Link>
            <Link to="/catalog/liquids" className="block py-2 text-white font-medium">
              Жидкости
            </Link>
            <Link to="/catalog/accessories" className="block py-2 text-white font-medium">
              Аксессуары
            </Link>
            {isAdmin && (
              <>
                <Link to="/admin" className="block py-2 text-white font-medium">
                  Панель управления
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left py-2 text-white font-medium"
                >
                  Выйти
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;