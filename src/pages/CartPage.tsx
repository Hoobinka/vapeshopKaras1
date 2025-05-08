import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ShoppingBag, ChevronRight, AlertCircle } from 'lucide-react';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  
  useEffect(() => {
    document.title = 'Корзина | VapeShop';
  }, []);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Fixed shipping cost
  const shipping = subtotal > 0 ? (subtotal >= 5000 ? 0 : 300) : 0;
  
  // Total order cost
  const total = subtotal + shipping;
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Корзина</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gray-100">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Ваша корзина пуста</h2>
          <p className="text-gray-600 mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
          <Link 
            to="/catalog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Товары в корзине ({totalItems})</h2>
            </div>
            
            <div className="divide-y divide-gray-200 px-6">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            
            <div className="p-6 bg-gray-50 flex justify-between">
              <button
                onClick={() => clearCart()}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Очистить корзину
              </button>
              <Link to="/catalog" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Сумма заказа</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Товары ({totalItems})</span>
                <span>{subtotal.toLocaleString()} ₽</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span>{shipping > 0 ? `${shipping} ₽` : 'Бесплатно'}</span>
              </div>
              
              {shipping > 0 && (
                <div className="text-sm text-gray-500 flex items-start">
                  <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                  <span>Бесплатная доставка при заказе от 5000 ₽</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] duration-300"
              >
                Оформить заказ
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;