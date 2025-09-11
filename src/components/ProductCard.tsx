import React from "react";
import type { Producto } from "../types/Producto";

type Props = {
  producto: Producto;
  onEliminar: (id: number) => void;
};

const ProductoCard: React.FC<Props> = ({ producto, onEliminar }) => {
  return (
    <div className="relative grid grid-cols-2 gap-6 border rounded-xl shadow p-4">
      <button
        onClick={() => onEliminar(producto.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
      >
        ✖
      </button>
      <div className="flex flex-col justify-start flex-1">
        <h2 className="text-lg font-bold mb-1">{producto.nombre}</h2>
        <p className="text-gray-700 text-sm mb-1">{producto.descripcion}</p>
        <p className="text-green-600 font-semibold">${producto.precio}</p>
      </div>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-32 h-32 object-cover rounded ml-4"
      />
    </div>
  );
};

export default ProductoCard;