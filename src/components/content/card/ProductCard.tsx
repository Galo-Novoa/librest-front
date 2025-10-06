import React from "react";
import type { Product } from "../../../types/Product";
import EditableField from "./EditableField";

type Props = {
  product: Product & { _ts?: number };
  onDelete: (id: number) => void;
  onUpdate: (id: number, field: keyof Product, value: string) => void;
};

const ProductCard: React.FC<Props> = ({ product, onDelete, onUpdate }) => {
  return (
    <div className="relative grid grid-cols-2 gap-6 border rounded-xl shadow p-4 bg-white">
      <button
        onClick={() => onDelete(product.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
      >
        ✖
      </button>
      <div className="flex flex-col justify-start flex-1 gap-1">
        <EditableField
          value={product.name}
          onSave={(val) => onUpdate(product.id, "name", val)}
          as="h2"
          className="text-lg font-bold"
        />
        <EditableField
          value={product.description}
          onSave={(val) => onUpdate(product.id, "description", val)}
          as="p"
          className="text-gray-700 text-sm"
        />
        <EditableField
          value={product.price}
          onSave={(val) => onUpdate(product.id, "price", val)}
          as="p"
          className="text-green-600 font-semibold"
        />
      </div>
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover rounded ml-4"
      />
    </div>
  );
};

export default ProductCard;