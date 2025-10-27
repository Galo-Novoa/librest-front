import type { Product } from '../../products/types/product.types';

export interface CartResponse {
  items: CartItem[];
  total: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  username: string;
}