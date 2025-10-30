import type { Product, ProductFormData } from "../types/product.types";
import { cloudinaryService } from "./cloudinaryService";

const API_URL = "http://localhost:8080/products";

export const productService = {
	async getProducts(): Promise<Product[]> {
		const response = await fetch(API_URL);
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Error al cargar productos: ${response.status} - ${errorText}`
			);
		}
		return response.json();
	},

	async addProduct(product: Omit<Product, "id">): Promise<Product> {
		console.log(
			"📤 Enviando producto al servidor:",
			JSON.stringify(product, null, 2)
		);

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(product),
			});

			console.log("📨 Respuesta del servidor - Status:", response.status);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("❌ Error del servidor:", response.status, errorText);
				throw new Error(
					`Error ${response.status}: ${errorText || "Error del servidor"}`
				);
			}

			const savedProduct = await response.json();
			console.log("✅ Producto guardado:", savedProduct);
			return savedProduct;
		} catch (error) {
			console.error("💥 Error de red:", error);
			throw new Error(
				"Error de conexión. Verifica que el servidor esté funcionando."
			);
		}
	},

	async deleteProduct(id: number): Promise<void> {
		const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Error al eliminar producto: ${response.status} - ${errorText}`
			);
		}
	},

	async updateProduct(
		id: number,
		updatedFields: Partial<Omit<Product, "id">>
	): Promise<Product> {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedFields),
		});
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Error al actualizar producto: ${response.status} - ${errorText}`
			);
		}
		return response.json();
	},

	async addNewProduct(productData: ProductFormData): Promise<Product> {
		try {
			console.log("🔄 Iniciando addNewProduct con datos:", productData);

			let imageUrl = "";
			if (productData.imageFile) {
				console.log("🖼️ Subiendo imagen...");
				try {
					imageUrl = await cloudinaryService.uploadImage(productData.imageFile);
					console.log("✅ Imagen subida:", imageUrl);
				} catch (imageError) {
					console.error("❌ Error al subir imagen:", imageError);
					throw new Error("Error al subir la imagen");
				}
			} else {
				console.log("ℹ️ No hay imagen para subir");
				imageUrl = "https://via.placeholder.com/300x300?text=Sin+Imagen";
			}

			const productToSave: any = {
				name: productData.name.trim(),
				price: Number(productData.price),
				description: productData.description.trim(),
				image: imageUrl,
				rating: 0,
				publisher: "admin",
				sale: productData.sale || 0,
			};

			if (productData.categoryId) {
				productToSave.categoryId = productData.categoryId;
			}

			console.log(
				"💾 Producto a guardar (corregido):",
				JSON.stringify(productToSave, null, 2)
			);

			return await this.addProduct(productToSave);
		} catch (error) {
			console.error("💥 Error en addNewProduct:", error);
			throw error;
		}
	},
};