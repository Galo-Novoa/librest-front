import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import AddButton from "./AddButton";
import type { Product } from "../../types/Product";
import {
	getProducts,
	addProduct,
	deleteProduct,
} from "../../services/products";

function ProductFeed() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		getProducts().then(setProducts).catch(console.error);
	}, []);

	const handleAdd = async (newProduct: Omit<Product, "id">) => {
		try {
			const saved = await addProduct(newProduct);
			setProducts((prev) => [...prev, saved]);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteProduct(id);
			setProducts((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<main className="p-4 overflow-y-auto flex-1">
			<AddButton />
			<div className="grid grid-cols-4 gap-4 mt-4">
				{products.map((p) => (
					<ProductCard key={p.id} product={p} onDelete={handleDelete} />
				))}
			</div>
		</main>
	);
}

export default ProductFeed;
