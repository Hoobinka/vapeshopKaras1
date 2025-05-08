import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

const AdminProductCreate: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    image: '',
    description: '',
    variant: '',
  });
  
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };
  
  const addSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };
  
  const removeSpec = (index: number) => {
    const newSpecs = [...specs];
    newSpecs.splice(index, 1);
    setSpecs(newSpecs);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Convert specs array to object
    const specifications = specs.reduce((obj, { key, value }) => {
      if (key.trim()) {
        obj[key.trim()] = value;
      }
      return obj;
    }, {} as Record<string, string>);
    
    const newProduct = {
      ...formData,
      specifications: Object.keys(specifications).length > 0 ? specifications : undefined,
    };
    
    addProduct(newProduct);
    
    setTimeout(() => {
      setIsSaving(false);
      navigate('/admin/products');
    }, 500);
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="mr-3 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold">Новый товар</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Left column - Basic Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Название товара <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="variant">
                  Вариант / Модель
                </label>
                <input
                  type="text"
                  id="variant"
                  name="variant"
                  value={formData.variant}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Например: 1000mAh, Черный и т.д."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                  Описание
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
                    Цена <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">₽</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                    Категория <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Выберите категорию</option>
                    <option value="pod-systems">Под-системы</option>
                    <option value="liquids">Жидкости</option>
                    <option value="accessories">Аксессуары</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Right column - Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Изображение товара <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="mb-4 bg-gray-100 p-2 rounded-md h-48 flex items-center justify-center">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Product Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      Предпросмотр изображения
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
                    URL изображения
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Specifications */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Характеристики</h3>
              <button
                type="button"
                onClick={addSpec}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                Добавить характеристику
              </button>
            </div>
            
            {specs.length === 0 ? (
              <p className="text-gray-500 text-sm">Нет характеристик. Добавьте характеристики товара.</p>
            ) : (
              <div className="space-y-3">
                {specs.map((spec, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-1/3">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                        placeholder="Название"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                        placeholder="Значение"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-4"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-4 py-2 rounded-md text-white flex items-center ${
                isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Save className="h-5 w-5 mr-2" />
              {isSaving ? 'Сохранение...' : 'Создать товар'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductCreate;