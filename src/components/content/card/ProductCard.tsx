import React, { useState } from "react";
import type { Product } from "../../../types/Product";
import EditableField from "./EditableField";
import { AlertCircle, Trash2 } from "lucide-react";

type Props = {
  product: Product & { _ts?: number };
  onDelete: (id: number) => void;
  onUpdate: (id: number, field: keyof Product, value: string) => void;
};

const ProductCard: React.FC<Props> = ({ product, onDelete, onUpdate }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      className="relative flex flex-col border rounded-xl shadow-md p-4 bg-white hover:shadow-xl transition-all duration-300 overflow-hidden group text-left"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsHovered((prev) => !prev);
        }
      }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Botón de eliminar */}
      <button
        onClick={() => onDelete(product.id)}
        className={`absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full transition-all duration-300 z-10 hover:bg-red-600 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        aria-label="Eliminar producto"
        title="Eliminar producto"
      >
        <Trash2 size={16} />
      </button>

      {/* Imagen del producto */}
      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <AlertCircle className="text-gray-400 mb-2" size={48} />
            <span className="text-gray-500 text-sm">Imagen no disponible</span>
          </div>
        ) : (
          <img
            src={product.image || "https://via.placeholder.com/400x300?text=Sin+Imagen"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      {/* Contenido del producto */}
      <div className="flex flex-col gap-2 flex-1">
        <EditableField
          value={product.name}
          onSave={(val) => onUpdate(product.id, "name", val)}
          as="h2"
          className="text-lg font-bold text-gray-800 line-clamp-2"
        />
        
        <EditableField
          value={product.description}
          onSave={(val) => onUpdate(product.id, "description", val)}
          as="p"
          className="text-gray-600 text-sm line-clamp-3 flex-1"
        />
        
        <div className="mt-auto pt-2 border-t border-gray-200">
          <EditableField
            value={`$${Number(product.price).toFixed(2)}`}
            onSave={(val) => {
              // Remover el símbolo $ y espacios antes de guardar
              const numericValue = val.replace(/[$\s]/g, '');
              onUpdate(product.id, "price", numericValue);
            }}
            as="p"
            className="text-2xl font-bold text-lime-600"
          />
        </div>
      </div>

      {/* Indicador visual de hover */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-1 bg-lime-500 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
};
export default ProductCard;