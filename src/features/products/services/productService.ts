import type { Product, ProductFormData } from '../types/product.types';
import { cloudinaryService } from './cloudinaryService';

const API_URL = "http://localhost:8080/products";

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar productos");
    return response.json();
  },

  async addProduct(product: Omit<Product, "id">): Promise<Product> {
    console.log('📤 Enviando producto:', product);
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error del servidor:', errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    
    const savedProduct = await response.json();
    console.log('✅ Producto guardado:', savedProduct);
    return savedProduct;
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
    try {
      // 1. Subir imagen si existe
      let imageUrl = "";
      if (productData.imageFile) {
        console.log('🖼️ Subiendo imagen...');
        imageUrl = await cloudinaryService.uploadImage(productData.imageFile);
      }

      // 2. Preparar datos para el servidor (SOLO campos que el backend espera)
      const productToSave = {
        name: productData.name.trim(),
        price: Number(productData.price),
        description: productData.description.trim(),
        image: imageUrl,
        // El backend probablemente asigna estos valores automáticamente
        rating: 0,
        publisher: "admin", 
        dateAdded: new Date().toISOString(),
        sale: productData.sale || 0,
      };

      console.log('💾 Guardando producto:', productToSave);
      
      // 3. Llamar al endpoint
      return await this.addProduct(productToSave);
      
    } catch (error) {
      console.error('💥 Error en addNewProduct:', error);
      throw error;
    }
  }
};