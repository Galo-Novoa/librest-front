import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../../app/store/cartStore';

export const CartIcon = () => {
  const { cartItemCount, loading } = useCartStore();

  return (
    <Link 
      to="/cart" 
      className="relative"
      aria-label={`Carrito de compras con ${cartItemCount} items`}
    >
      <ShoppingCart 
        size={45} 
        strokeWidth={3} 
        className={`text-white hover:text-lime-200 transition-colors ${
          loading ? 'opacity-50' : ''
        }`}
      />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {cartItemCount}
        </span>
      )}
    </Link>
  );
};