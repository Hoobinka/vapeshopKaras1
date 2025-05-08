import { Product } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialProducts: Product[] = [
  // Pod Systems
  {
    id: uuidv4(),
    name: 'Vaporesso XROS 3',
    price: 1990,
    category: 'pod-systems',
    image: 'https://images.pexels.com/photos/3905868/pexels-photo-3905868.jpeg',
    description: 'XROS 3 от Vaporesso - компактный под с системой автозатяжки и аккумулятором на 1000 мАч. Оснащен COREX технологией нагрева для насыщенного вкуса и теплого пара.',
    variant: '1000mAh, Черный',
    specifications: {
      'Ёмкость аккумулятора': '1000 мАч',
      'Объем картриджа': '2 мл',
      'Сопротивление испарителя': '0.8/1.2 Ом',
      'Тип затяжки': 'Автоматическая',
      'Материал корпуса': 'Алюминий',
    }
  },
  {
    id: uuidv4(),
    name: 'Smoant Knight 80',
    price: 2990,
    category: 'pod-systems',
    image: 'https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg',
    description: 'Smoant Knight 80 - мощный под-мод с регулировкой мощности до 80 Вт. Оснащен OLED-дисплеем и поддерживает режим TC (контроль температуры).',
    variant: '18650, Серебристый',
    specifications: {
      'Максимальная мощность': '80 Вт',
      'Тип аккумулятора': '18650 (не входит в комплект)',
      'Объем картриджа': '4 мл',
      'Диапазон сопротивления': '0.1-3.0 Ом',
      'Дисплей': 'OLED 0.96"',
    }
  },
  {
    id: uuidv4(),
    name: 'JUUL Starter Kit',
    price: 1490,
    category: 'pod-systems',
    image: 'https://images.pexels.com/photos/3038458/pexels-photo-3038458.jpeg',
    description: 'JUUL - компактная под-система с предзаправленными картриджами. Идеально подходит для начинающих.',
    variant: '200mAh, Черный',
    specifications: {
      'Ёмкость аккумулятора': '200 мАч',
      'Объем картриджа': '0.7 мл',
      'Тип затяжки': 'Автоматическая',
      'Время зарядки': '1 час',
    }
  },
  {
    id: uuidv4(),
    name: 'MINIFIT Pod Kit',
    price: 990,
    category: 'pod-systems',
    image: 'https://images.pexels.com/photos/1619149/pexels-photo-1619149.jpeg',
    description: 'MINIFIT - ультракомпактный под с автоматической активацией и возможностью заправки собственными жидкостями.',
    variant: '350mAh, Синий',
    specifications: {
      'Ёмкость аккумулятора': '350 мАч',
      'Объем картриджа': '1.5 мл',
      'Сопротивление испарителя': '1.8 Ом',
      'Тип затяжки': 'Автоматическая',
      'Вес': '21 г',
    }
  },
  
  // Liquids
  {
    id: uuidv4(),
    name: 'Jam Monster Blueberry',
    price: 790,
    category: 'liquids',
    image: 'https://images.pexels.com/photos/4753890/pexels-photo-4753890.jpeg',
    description: 'Насыщенный вкус черничного джема с маслом и хрустящим тостом. Сладкий и насыщенный вкус с нотками хлеба.',
    variant: '30мл, 3мг',
    specifications: {
      'Объем': '30 мл',
      'Крепость': '3 мг/мл',
      'Соотношение VG/PG': '70/30',
      'Вкусовой профиль': 'Черничный джем, масло, тост',
    }
  },
  {
    id: uuidv4(),
    name: 'Bad Drip Don\'t Care Bear',
    price: 850,
    category: 'liquids',
    image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg',
    description: 'Сладкий и кислый микс фруктовых мармеладных мишек с разными вкусовыми профилями.',
    variant: '60мл, 0мг',
    specifications: {
      'Объем': '60 мл',
      'Крепость': '0 мг/мл',
      'Соотношение VG/PG': '70/30',
      'Вкусовой профиль': 'Фруктовый мармелад',
    }
  },
  {
    id: uuidv4(),
    name: 'Nasty Juice Cush Man',
    price: 690,
    category: 'liquids',
    image: 'https://images.pexels.com/photos/3513889/pexels-photo-3513889.jpeg',
    description: 'Освежающий вкус спелого манго с нотками сладости и легкой прохлады в послевкусии.',
    variant: '50мл, 6мг',
    specifications: {
      'Объем': '50 мл',
      'Крепость': '6 мг/мл',
      'Соотношение VG/PG': '70/30',
      'Вкусовой профиль': 'Манго, прохлада',
    }
  },
  {
    id: uuidv4(),
    name: 'Salt Nic Labs Mint',
    price: 490,
    category: 'liquids',
    image: 'https://images.pexels.com/photos/3493690/pexels-photo-3493690.jpeg',
    description: 'Освежающая мятная жидкость на никотиновой соли. Идеально подходит для под-систем.',
    variant: '15мл, 20мг (Солевой)',
    specifications: {
      'Объем': '15 мл',
      'Крепость': '20 мг/мл (солевой никотин)',
      'Соотношение VG/PG': '50/50',
      'Вкусовой профиль': 'Мята',
      'Тип': 'Солевой никотин',
    }
  },
  
  // Accessories
  {
    id: uuidv4(),
    name: 'Картридж XROS 3',
    price: 290,
    category: 'accessories',
    image: 'https://images.pexels.com/photos/5806862/pexels-photo-5806862.jpeg',
    description: 'Оригинальный картридж для Vaporesso XROS 3 с сеткой из mesh-сетки для насыщенного вкуса.',
    variant: '0.8 Ом, 2 шт. в упаковке',
    specifications: {
      'Совместимость': 'Vaporesso XROS 3',
      'Сопротивление': '0.8 Ом',
      'Объем': '2 мл',
      'Количество в упаковке': '2 шт',
    }
  },
  {
    id: uuidv4(),
    name: 'Испаритель Smoant Knight',
    price: 390,
    category: 'accessories',
    image: 'https://images.pexels.com/photos/209807/pexels-photo-209807.jpeg',
    description: 'Сменный испаритель для Smoant Knight 80. Mesh-сетка обеспечивает быстрый нагрев и чистый вкус.',
    variant: '0.3 Ом, 5 шт. в упаковке',
    specifications: {
      'Совместимость': 'Smoant Knight 80',
      'Сопротивление': '0.3 Ом',
      'Тип': 'Mesh-сетка',
      'Количество в упаковке': '5 шт',
    }
  },
  {
    id: uuidv4(),
    name: 'Кейс для MINIFIT',
    price: 350,
    category: 'accessories',
    image: 'https://images.pexels.com/photos/4115131/pexels-photo-4115131.jpeg',
    description: 'Защитный кейс для MINIFIT Pod Kit из прочного силикона с карабином для удобного ношения.',
    variant: 'Черный',
    specifications: {
      'Совместимость': 'MINIFIT Pod Kit',
      'Материал': 'Силикон',
      'Цвет': 'Черный',
      'Особенности': 'Карабин, полная защита',
    }
  },
  {
    id: uuidv4(),
    name: 'Внешний аккумулятор 18650',
    price: 590,
    category: 'accessories',
    image: 'https://images.pexels.com/photos/220039/pexels-photo-220039.jpeg',
    description: 'Высокотоковый аккумулятор формата 18650 для под-модов и других устройств. Емкость 3000 мАч.',
    variant: '3000 mAh',
    specifications: {
      'Тип': '18650',
      'Емкость': '3000 мАч',
      'Максимальный ток разряда': '25А',
      'Напряжение': '3.7В',
      'Производитель': 'Samsung',
    }
  },
];

export default initialProducts;