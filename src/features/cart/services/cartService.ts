import type { CartResponse, CartItem } from '../types/cart.types';

const API_URL = 'http://localhost:8080/cart';
const CURRENT_USER = 'demo-user';

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const response = await fetch(`${API_URL}?username=${CURRENT_USER}`);
    if (!response.ok) throw new Error('Error al cargar el carrito');
    return response.json();
  },

  async addToCart(productId: number): Promise<CartItem> {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: CURRENT_USER, 
        productId: productId 
      }),
    });
    if (!response.ok) throw new Error('Error al agregar al carrito');
    return response.json();
  },

  async removeFromCart(productId: number): Promise<void> {
    const response = await fetch(`${API_URL}/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: CURRENT_USER, 
        productId: productId 
      }),
    });
    if (!response.ok) throw new Error('Error al eliminar del carrito');
  }
};