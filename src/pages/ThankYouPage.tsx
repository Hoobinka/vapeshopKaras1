import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Заказ оформлен | VapeShop';
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Спасибо за заказ!</h1>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-lg mb-6">
            Ваш заказ успешно оформлен и передан в обработку. 
            Мы свяжемся с вами в ближайшее время для подтверждения деталей заказа.
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-blue-800 mb-2">Что дальше?</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
                <span>Вам придет письмо с подтверждением заказа на указанный email</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
                <span>Наш менеджер свяжется с вами для уточнения деталей заказа</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
                <span>После подтверждения заказ будет передан в службу доставки</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Вернуться на главную
            </button>
            
            <button
              onClick={() => navigate('/catalog')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;