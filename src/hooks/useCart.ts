import { useState } from "react";
import type { Product } from "../types/Product";

export function useCart() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, p) => sum + Number(p.price), 0);

  return { cart, addToCart, removeFromCart, clearCart, totalPrice };
}