import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 mr-0 sm:mr-4 mb-3 sm:mb-0 bg-gray-100 rounded-md overflow-hidden">
        <Link to={`/product/${item.product.id}`}>
          <img 
            src={item.product.image} 
            alt={item.product.name} 
            className="w-full h-full object-contain p-2"
          />
        </Link>
      </div>
      
      {/* Product Info */}
      <div className="flex-grow mr-0 sm:mr-4">
        <Link to={`/product/${item.product.id}`} className="text-lg font-medium text-blue-900 hover:text-blue-700">
          {item.product.name}
        </Link>
        {item.product.variant && (
          <p className="text-sm text-gray-500">{item.product.variant}</p>
        )}
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center mt-3 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1 hover:bg-gray-100"
            aria-label="Уменьшить количество"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-center min-w-[40px]">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 hover:bg-gray-100"
            aria-label="Увеличить количество"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          className="ml-4 text-red-500 hover:text-red-700 transition-colors"
          aria-label="Удалить товар"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      
      {/* Price */}
      <div className="text-right ml-auto mt-3 sm:mt-0 font-medium text-lg min-w-[100px]">
        {(item.product.price * item.quantity).toLocaleString()} ₽
      </div>
    </div>
  );
};

export default CartItem;