import { ShoppingCart } from "lucide-react";

type Props = {
  count: number;
  onClick: () => void;
};

function CartIcon({ count, onClick }: Props) {
  return (
    <button onClick={onClick} className="relative">
      <ShoppingCart size={45} strokeWidth={3} />
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
          {count}
        </span>
      )}
    </button>
  );
}

export default CartIcon;