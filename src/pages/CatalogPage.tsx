import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryMenu from '../components/CategoryMenu';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../context/ProductContext';
import { Search, SlidersHorizontal } from 'lucide-react';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get min and max prices from all products
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  useEffect(() => {
    // Update price range when products load
    if (products.length > 0 && !loading) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products, loading, minPrice, maxPrice]);
  
  useEffect(() => {
    // Update the page title based on category
    const categoryName = category 
      ? category === 'pod-systems' 
        ? 'Под-системы'
        : category === 'liquids'
          ? 'Жидкости'
          : category === 'accessories'
            ? 'Аксессуары'
            : 'Каталог'
      : 'Каталог товаров';
      
    document.title = `${categoryName} | VapeShop`;
  }, [category]);
  
  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    // Filter by category
    const categoryMatch = !category || product.category === category;
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by price range
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return categoryMatch && searchMatch && priceMatch;
  });
  
  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };
  
  const getCategoryTitle = () => {
    if (!category) return 'Все товары';
    
    switch (category) {
      case 'pod-systems':
        return 'Под-системы';
      case 'liquids':
        return 'Жидкости';
      case 'accessories':
        return 'Аксессуары';
      default:
        return 'Каталог';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{getCategoryTitle()}</h1>
      
      {/* Search and filter controls */}
      <div className="flex flex-col lg:flex-row lg:items-center mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Поиск товаров..."
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Фильтры
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Sidebar with filters */}
        <div className={`lg:w-1/4 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <CategoryMenu vertical />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h3 className="font-bold text-lg">Цена</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <span>{priceRange[0]} ₽</span>
                <span>{priceRange[1]} ₽</span>
              </div>
              
              <div className="mb-4">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="number"
                  min={minPrice}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-1/2 px-2 py-1 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  min={priceRange[0]}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-1/2 px-2 py-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4">
          {/* Category filter pills for mobile */}
          <div className="lg:hidden mb-6">
            <CategoryMenu />
          </div>
          
          {/* Products */}
          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;