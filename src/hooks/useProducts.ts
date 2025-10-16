import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import * as productAPI from "../api/products";
import { uploadImage } from "../api/cloudinary";

export function useProducts() {
	const [products, setProducts] = useState<(Product & { _ts?: number })[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await productAPI.getProducts();
			setProducts(data.map((p) => ({ ...p, _ts: Date.now() })));
		} catch (err) {
			setError("Error al cargar los productos. Por favor, intenta de nuevo.");
			console.error("Error loading products:", err);
		} finally {
			setLoading(false);
		}
	};

	const addNewProduct = async ({
		name,
		price,
		description,
		imageFile,
	}: {
		name: string;
		price: number;
		description: string;
		imageFile?: File | null;
	}) => {
		try {
			let image = "";
			if (imageFile) {
				image = await uploadImage(imageFile);
				image += `?t=${Date.now()}`;
			}
			const saved = await productAPI.addProduct({
				name,
				price,
				description,
				image,
			});
			setProducts((prev) => [saved, ...prev]);
			return saved;
		} catch (err) {
			console.error("Error al agregar producto:", err);
			throw new Error(
				"No se pudo agregar el producto. Verifica tu conexión e intenta de nuevo."
			);
		}
	};

	const deleteExistingProduct = async (id: number) => {
		try {
			await productAPI.deleteProduct(id);
			setProducts((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error("Error al eliminar producto:", err);
			throw new Error("No se pudo eliminar el producto. Intenta de nuevo.");
		}
	};

	const updateExistingProduct = async (
		id: number,
		updatedFields: Partial<Product>
	) => {
		try {
			const updated = await productAPI.updateProduct(id, updatedFields);
			setProducts((prev) =>
				prev.map((p) =>
					p.id === id ? { ...p, ...updated, _ts: Date.now() } : p
				)
			);
			return updated;
		} catch (err) {
			console.error("Error al actualizar producto:", err);
			throw new Error("No se pudo actualizar el producto. Intenta de nuevo.");
		}
	};

	return {
		products,
		loading,
		error,
		addNewProduct,
		deleteExistingProduct,
		updateExistingProduct,
		retry: loadProducts,
	};
}
