import type { Product } from '../types/Product';

const API_URL = 'http://localhost:8080/cart';

// Usuario temporal
const CURRENT_USER = 'demo-user';

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

export async function getCart(): Promise<CartResponse> {
  const res = await fetch(`${API_URL}?username=${CURRENT_USER}`);
  if (!res.ok) throw new Error('Error al cargar el carrito');
  return res.json();
}

export async function addToCart(productId: number): Promise<CartItem> {
  const res = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      username: CURRENT_USER, 
      productId: productId 
    }),
  });
  if (!res.ok) throw new Error('Error al agregar al carrito');
  return res.json();
}

export async function removeFromCart(productId: number): Promise<void> {
  const res = await fetch(`${API_URL}/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      username: CURRENT_USER, 
      productId: productId 
    }),
  });
  if (!res.ok) throw new Error('Error al eliminar del carrito');
}