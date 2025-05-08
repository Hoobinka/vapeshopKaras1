import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderForm from '../components/OrderForm';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  
  useEffect(() => {
    document.title = 'Оформление заказа | VapeShop';
    
    // Redirect to cart if it's empty
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);
  
  if (cart.length === 0) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Form */}
        <div className="lg:w-2/3">
          <OrderForm />
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Ваш заказ</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.product.id} className="flex py-4 px-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">Кол-во: {item.quantity}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString()} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 space-y-2 bg-gray-50">
              <div className="flex justify-between text-gray-600">
                <span>Товаров</span>
                <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Подытог</span>
                <span>
                  {cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toLocaleString()} ₽
                </span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span>
                  {cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) >= 5000 
                    ? 'Бесплатно' 
                    : '300 ₽'}
                </span>
              </div>
              
              <div className="pt-2 border-t border-gray-200 mt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого</span>
                  <span>
                    {(
                      cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) + 
                      (cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) >= 5000 ? 0 : 300)
                    ).toLocaleString()} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;