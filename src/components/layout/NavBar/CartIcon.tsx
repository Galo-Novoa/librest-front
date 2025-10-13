import { ShoppingCart } from "lucide-react";

type Props = {
  count: number;
  onClick?: () => void;
};

export default function CartIcon({ count, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-lime-300 transition-all"
      aria-label="Carrito"
    >
      <ShoppingCart size={24} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 text-xs font-bold">
          {count}
        </span>
      )}
    </button>
  );
}