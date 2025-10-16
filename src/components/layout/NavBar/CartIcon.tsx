import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  count: number;
};

function CartIcon({ count }: Props) {
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart size={45} strokeWidth={3} className="text-white hover:text-lime-200 transition-colors" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {count}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;