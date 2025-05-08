import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Droplets, Zap } from 'lucide-react';

const categories = [
  { id: 'pod-systems', name: 'Под-системы', icon: <Box className="h-5 w-5" /> },
  { id: 'liquids', name: 'Жидкости', icon: <Droplets className="h-5 w-5" /> },
  { id: 'accessories', name: 'Аксессуары', icon: <Zap className="h-5 w-5" /> },
];

interface CategoryMenuProps {
  vertical?: boolean;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ vertical = false }) => {
  if (vertical) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h3 className="font-bold text-lg">Категории</h3>
        </div>
        <div className="divide-y divide-gray-200">
          <NavLink 
            to="/catalog" 
            end
            className={({ isActive }) => 
              `block p-4 hover:bg-blue-50 transition-colors ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`
            }
          >
            Все товары
          </NavLink>
          
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/catalog/${category.id}`}
              className={({ isActive }) => 
                `flex items-center p-4 hover:bg-blue-50 transition-colors ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`
              }
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 md:gap-4">
      <NavLink
        to="/catalog"
        end
        className={({ isActive }) => 
          `px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
            isActive 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
          }`
        }
      >
        Все товары
      </NavLink>
      
      {categories.map((category) => (
        <NavLink
          key={category.id}
          to={`/catalog/${category.id}`}
          className={({ isActive }) => 
            `flex items-center px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
              isActive 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
            }`
          }
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </NavLink>
      ))}
    </div>
  );
};

export default CategoryMenu;