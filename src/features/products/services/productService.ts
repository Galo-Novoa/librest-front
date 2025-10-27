import type { Product, ProductFormData } from '../types/product.types';
import { cloudinaryService } from './cloudinaryService'; // Importación agregada

const API_URL = "http://localhost:8080/products";

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar productos");
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al cargar el producto");
    return response.json();
  },

  async addProduct(product: Omit<Product, "id"> & { categoryId?: number }): Promise<Product> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Error al agregar producto");
    return response.json();
  },

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar producto");
  },

  async updateProduct(
    id: number,
    updatedFields: Partial<Omit<Product, "id">> & { categoryId?: number }
  ): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) throw new Error("Error al actualizar producto");
    return response.json();
  },

  async addNewProduct(productData: ProductFormData): Promise<Product> {
    let imageUrl = "";
    if (productData.imageFile) {
      imageUrl = await cloudinaryService.uploadImage(productData.imageFile);
      imageUrl += `?t=${Date.now()}`;
    }

    const productToSave = {
      name: productData.name,
      price: Number(productData.price),
      description: productData.description,
      image: imageUrl,
      rating: 0,
      publisher: "admin",
      dateAdded: new Date().toISOString(),
      sale: productData.sale || 0,
      ...(productData.categoryId && { categoryId: productData.categoryId })
    };

    const saved = await this.addProduct(productToSave);
    return saved;
  }
};