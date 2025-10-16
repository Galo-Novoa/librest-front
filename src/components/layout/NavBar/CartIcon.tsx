type Props = {
  count: number;
  onClick: () => void;
};

function CartIcon({ count, onClick }: Props) {
  return (
    <button onClick={onClick} className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
      </svg>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
          {count}
        </span>
      )}
    </button>
  );
}

export default CartIcon;