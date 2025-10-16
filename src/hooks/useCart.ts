import { useState, useEffect } from 'react';
import type { Product } from '../types/Product';

export function useCart() {
  const [cart, setCart] = useState<Product[]>([]);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('mercado-librest-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('mercado-librest-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('mercado-librest-cart');
  };

  const totalPrice = cart.reduce((sum, p) => sum + Number(p.price), 0);

  const cartItemCount = cart.length;

  return { 
    cart, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    totalPrice,
    cartItemCount
  };
}