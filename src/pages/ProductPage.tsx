import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ChevronLeft, Minus, Plus, Info } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const product = products.find(p => p.id === id);
  
  // Get related products (same category, exclude current product)
  const relatedProducts = products
    .filter(p => product && p.category === product.category && p.id !== product.id)
    .slice(0, 4);
    
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  useEffect(() => {
    // Update page title
    if (product) {
      document.title = `${product.name} | VapeShop`;
    }
  }, [product]);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      
      // Reset the "Added to cart" message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-96 bg-gray-200 rounded-lg mb-6 md:mb-0 md:mr-6"></div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mt-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3 mt-6"></div>
              <div className="h-12 bg-gray-200 rounded w-full mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
        <p className="text-gray-600 mb-6">К сожалению, запрашиваемый товар не существует или был удален.</p>
        <button
          onClick={() => navigate('/catalog')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Назад
      </button>
      
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain max-h-96 mx-auto"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {product.variant && (
            <p className="text-gray-600 mb-4">{product.variant}</p>
          )}
          
          <p className="text-3xl font-bold text-blue-600 mb-6">{product.price} ₽</p>
          
          {product.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Описание</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}
          
          {/* Stock Status */}
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-green-600 font-medium">В наличии</span>
          </div>
          
          {/* Quantity selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 text-gray-700">Количество:</span>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              addedToCart 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {addedToCart ? (
              <>
                Добавлено ✓
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                Добавить в корзину
              </>
            )}
          </button>
          
          {/* Additional info */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Этот товар доступен для доставки по всей России. Оплата при получении или онлайн.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product specifications */}
      {product.specifications && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Характеристики</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium bg-gray-50 w-1/3">{key}</td>
                    <td className="px-6 py-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;