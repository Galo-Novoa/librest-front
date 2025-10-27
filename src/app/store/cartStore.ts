// Solución alternativa - prueba con importación por defecto
import { create } from 'zustand';

// Si la importación nombrada falla, descomenta esta línea:
// import create from 'zustand';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  publisher: string;
  dateAdded: string;
  sale: number;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  username: string;
}

interface CartStore {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  cartItemCount: number;
  totalPrice: number;
  
  loadCart: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  retry: () => void;
}

// Servicio temporal inline
const cartService = {
  async getCart(): Promise<{ items: CartItem[]; total: number }> {
    const API_URL = 'http://localhost:8080/cart';
    const CURRENT_USER = 'demo-user';
    
    const response = await fetch(`${API_URL}?username=${CURRENT_USER}`);
    if (!response.ok) throw new Error('Error al cargar el carrito');
    return response.json();
  },

  async addToCart(productId: number): Promise<CartItem> {
    const API_URL = 'http://localhost:8080/cart';
    const CURRENT_USER = 'demo-user';
    
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
    const API_URL = 'http://localhost:8080/cart';
    const CURRENT_USER = 'demo-user';
    
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

// Función de store con tipos explícitos para evitar errores
const createCartStore = () => {
  return create<CartStore>((set: any, get: any) => ({
    cart: [],
    loading: false,
    error: null,
    cartItemCount: 0,
    totalPrice: 0,

    loadCart: async () => {
      set({ loading: true, error: null });
      try {
        const response = await cartService.getCart();
        set({ 
          cart: response.items,
          cartItemCount: response.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
          totalPrice: response.total
        });
      } catch (error) {
        set({ error: 'Error al cargar el carrito' });
        console.error('Error loading cart:', error);
      } finally {
        set({ loading: false });
      }
    },

    addToCart: async (productId: number) => {
      try {
        const newItem = await cartService.addToCart(productId);
        
        set((state: CartStore) => {
          const existing = state.cart.find((item: CartItem) => item.product.id === productId);
          if (existing) {
            const updatedCart = state.cart.map((item: CartItem) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return {
              cart: updatedCart,
              cartItemCount: updatedCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
              totalPrice: updatedCart.reduce((sum: number, item: CartItem) => sum + (Number(item.product.price) * item.quantity), 0)
            };
          } else {
            const updatedCart = [...state.cart, newItem];
            return {
              cart: updatedCart,
              cartItemCount: updatedCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
              totalPrice: updatedCart.reduce((sum: number, item: CartItem) => sum + (Number(item.product.price) * item.quantity), 0)
            };
          }
        });
      } catch (error) {
        set({ error: 'Error al agregar al carrito' });
        console.error('Error adding to cart:', error);
        get().loadCart();
      }
    },

    removeFromCart: async (productId: number) => {
      try {
        await cartService.removeFromCart(productId);
        set((state: CartStore) => {
          const updatedCart = state.cart.filter((item: CartItem) => item.product.id !== productId);
          return {
            cart: updatedCart,
            cartItemCount: updatedCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
            totalPrice: updatedCart.reduce((sum: number, item: CartItem) => sum + (Number(item.product.price) * item.quantity), 0)
          };
        });
      } catch (error) {
        set({ error: 'Error al eliminar del carrito' });
        console.error('Error removing from cart:', error);
        get().loadCart();
      }
    },

    updateQuantity: async (productId: number, newQuantity: number) => {
      if (newQuantity <= 0) {
        await get().removeFromCart(productId);
        return;
      }

      try {
        const currentItem = get().cart.find((item: CartItem) => item.product.id === productId);
        if (!currentItem) return;

        const difference = newQuantity - currentItem.quantity;
        
        if (difference > 0) {
          for (let i = 0; i < difference; i++) {
            await cartService.addToCart(productId);
          }
        } else if (difference < 0) {
          for (let i = 0; i < Math.abs(difference); i++) {
            await cartService.removeFromCart(productId);
          }
        }

        set((state: CartStore) => {
          const updatedCart = state.cart.map((item: CartItem) =>
            item.product.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
          return {
            cart: updatedCart,
            cartItemCount: updatedCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
            totalPrice: updatedCart.reduce((sum: number, item: CartItem) => sum + (Number(item.product.price) * item.quantity), 0)
          };
        });
      } catch (error) {
        set({ error: 'Error al actualizar cantidad' });
        console.error('Error updating quantity:', error);
        get().loadCart();
      }
    },

    clearCart: async () => {
      try {
        const deletePromises = get().cart.map((item: CartItem) =>
          cartService.removeFromCart(item.product.id)
        );
        await Promise.all(deletePromises);
        set({ cart: [], cartItemCount: 0, totalPrice: 0 });
      } catch (error) {
        set({ error: 'Error al vaciar el carrito' });
        console.error('Error clearing cart:', error);
        get().loadCart();
      }
    },

    retry: () => {
      get().loadCart();
    }
  }));
};

export const useCartStore = createCartStore();