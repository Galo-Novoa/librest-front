import React from "react";

interface Producto {
	id: number;
	nombre: string;
	precio: number;
	descripcion: string;
	imagen: string;
}

interface Props {
	producto: Producto;
}

const ProductoCard: React.FC<Props> = ({ producto }) => {
	return (
		<div className="grid grid-cols-2 gap-6">
			<div className="border rounded-xl shadow p-4 flex items-center justify-center">
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
		</div>
	);
};

export default ProductoCard;
