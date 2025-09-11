import React from "react";
import type { Product } from "../types/Product";

type Props = {
	product: Product;
	onDelete: (id: number) => void;
};

const ProductCard: React.FC<Props> = ({ product, onDelete }) => {
	return (
		<div className="relative grid grid-cols-2 gap-6 border rounded-xl shadow p-4">
			<button
				onClick={() => onDelete(product.id)}
				className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
			>
				✖
			</button>
			<div className="flex flex-col justify-start flex-1">
				<h2 className="text-lg font-bold mb-1">{product.name}</h2>
				<p className="text-gray-700 text-sm mb-1">{product.description}</p>
				<p className="text-green-600 font-semibold">${product.price}</p>
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
