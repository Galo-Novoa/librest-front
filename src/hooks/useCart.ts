import { useState, useEffect, useCallback } from 'react';
import * as cartAPI from '../api/cart.ts';
import type { CartItem } from '../api/cart.ts';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.getCart();
      setCart(response.items);
    } catch (err) {
      setError('Error al cargar el carrito');
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // CAMBIADO: Ahora recibe productId en lugar de Product
  const addToCart = async (productId: number) => {
    try {
      setError(null);
      const newItem = await cartAPI.addToCart(productId);
      
      setCart(prev => {
        const existing = prev.find(item => item.product.id === productId);
        if (existing) {
          return prev.map(item =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, newItem];
        }
      });
    } catch (err) {
      setError('Error al agregar al carrito');
      console.error('Error adding to cart:', err);
      loadCart();
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setError(null);
      await cartAPI.removeFromCart(productId);
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } catch (err) {
      setError('Error al eliminar del carrito');
      console.error('Error removing from cart:', err);
      loadCart();
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      setError(null);
      const currentItem = cart.find(item => item.product.id === productId);
      if (!currentItem) return;

      const difference = newQuantity - currentItem.quantity;
      
      if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          await cartAPI.addToCart(productId);
        }
      } else if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
          await cartAPI.removeFromCart(productId);
        }
      }

      setCart(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      setError('Error al actualizar cantidad');
      console.error('Error updating quantity:', err);
      loadCart();
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const deletePromises = cart.map(item =>
        cartAPI.removeFromCart(item.product.id)
      );
      await Promise.all(deletePromises);
      setCart([]);
    } catch (err) {
      setError('Error al vaciar el carrito');
      console.error('Error clearing cart:', err);
      loadCart();
    }
  };

  const totalPrice = cart.reduce((sum, item) => 
    sum + (Number(item.product.price) * item.quantity), 0
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    loading,
    error,
    addToCart, // ← Ahora recibe productId
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    cartItemCount,
    retry: loadCart,
  };
}