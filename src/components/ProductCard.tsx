import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative pb-[100%] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain object-center p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2 h-12 overflow-hidden">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">{product.price} ₽</span>
            
            <div className="flex space-x-2">
              <Link 
                to={`/product/${product.id}`}
                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              >
                <Eye className="h-5 w-5" />
              </Link>
              
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center p-2 bg-blue-100 text-blue-600 rounded-full 
                transform transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110"
                aria-label="Добавить в корзину"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;