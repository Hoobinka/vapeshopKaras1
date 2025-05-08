import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check, CreditCard, Coins } from 'lucide-react';

type PaymentMethod = 'sbp' | 'crypto';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    comment: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('sbp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Пожалуйста, укажите ФИО';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, укажите корректный email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Пожалуйста, укажите адрес доставки';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Пожалуйста, укажите город';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Пожалуйста, укажите почтовый индекс';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this to a server
      // For now, we'll just simulate a server request
      const orderData = {
        customer: formData,
        items: cart.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        totalPrice,
        paymentMethod,
        orderDate: new Date().toISOString(),
      };
      
      console.log('Order data:', orderData);
      
      // Simulate sending email
      const emailData = {
        to: 'Brothersteam480@gmail.com',
        subject: `Новый заказ от ${formData.fullName}`,
        body: `
          Новый заказ:
          
          Информация о клиенте:
          ФИО: ${formData.fullName}
          Email: ${formData.email}
          Телефон: ${formData.phone}
          Адрес: ${formData.address}
          Город: ${formData.city}
          Индекс: ${formData.zipCode}
          
          Способ оплаты: ${paymentMethod === 'sbp' ? 'СБП' : 'Криптовалюта'}
          
          Комментарий: ${formData.comment || 'Нет'}
          
          Товары:
          ${cart.map(item => `- ${item.product.name} x ${item.quantity} = ${item.product.price * item.quantity} руб.`).join('\n')}
          
          Итого: ${totalPrice} руб.
        `
      };
      
      console.log('Email data:', emailData);
      
      // Wait 1 second to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear cart and redirect to thank you page
      clearCart();
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Данные для доставки</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
              ФИО <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Иванов Иван Иванович"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="example@mail.ru"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
              Телефон <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="+7 (XXX) XXX-XX-XX"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
              Город <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Москва"
            />
            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
              Адрес <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="ул. Примерная, д. 123, кв. 45"
            />
            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="zipCode">
              Почтовый индекс <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="123456"
            />
            {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="comment">
            Комментарий к заказу
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Дополнительная информация к заказу..."
          ></textarea>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Способ оплаты</h2>
        
        <div className="space-y-4">
          <div 
            className={`flex items-center border rounded-md p-4 cursor-pointer transition-all ${
              paymentMethod === 'sbp' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-300'
            }`}
            onClick={() => setPaymentMethod('sbp')}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
              paymentMethod === 'sbp' ? 'bg-blue-500' : 'border border-gray-400'
            }`}>
              {paymentMethod === 'sbp' && <Check className="h-4 w-4 text-white" />}
            </div>
            <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium">Система быстрых платежей (СБП)</h3>
              <p className="text-sm text-gray-500">Мгновенный перевод через СБП по QR-коду</p>
            </div>
          </div>
          
          <div 
            className={`flex items-center border rounded-md p-4 cursor-pointer transition-all ${
              paymentMethod === 'crypto' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-300'
            }`}
            onClick={() => setPaymentMethod('crypto')}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
              paymentMethod === 'crypto' ? 'bg-blue-500' : 'border border-gray-400'
            }`}>
              {paymentMethod === 'crypto' && <Check className="h-4 w-4 text-white" />}
            </div>
            <Coins className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium">Криптовалюта</h3>
              <p className="text-sm text-gray-500">Оплата в USDT через TRC20</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Итого:</h3>
          <span className="text-2xl font-bold text-blue-600">{totalPrice.toLocaleString()} ₽</span>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || cart.length === 0}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            isSubmitting || cart.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-300'
          }`}
        >
          {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
        </button>
        
        <p className="mt-4 text-sm text-gray-500 text-center">
          Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями покупки и политикой конфиденциальности
        </p>
      </div>
    </form>
  );
};

export default OrderForm;