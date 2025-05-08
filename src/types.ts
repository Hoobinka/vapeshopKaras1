export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'pod-systems' | 'liquids' | 'accessories';
  image: string;
  description?: string;
  variant?: string;
  specifications?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}