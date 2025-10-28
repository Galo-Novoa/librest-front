// ./src/features/products/services/productService.ts
import type { Product, ProductFormData } from '../types/product.types';
import { cloudinaryService } from './cloudinaryService';

const API_URL = "http://localhost:8080/products";

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al cargar productos: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  async addProduct(product: Omit<Product, "id">): Promise<Product> {
    console.log('📤 Enviando producto al servidor:', product);
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', response.status, errorText);
        throw new Error(`Error ${response.status}: ${errorText || 'Error del servidor'}`);
      }
      
      const savedProduct = await response.json();
      console.log('✅ Producto guardado:', savedProduct);
      return savedProduct;
    } catch (error) {
      console.error('💥 Error de red:', error);
      throw new Error('Error de conexión. Verifica que el servidor esté funcionando.');
    }
  },

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar producto: ${response.status} - ${errorText}`);
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
      throw new Error(`Error al actualizar producto: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  async addNewProduct(productData: ProductFormData): Promise<Product> {
    try {
      // 1. Subir imagen si existe
      let imageUrl = "";
      if (productData.imageFile) {
        console.log('🖼️ Subiendo imagen...');
        imageUrl = await cloudinaryService.uploadImage(productData.imageFile);
        console.log('✅ Imagen subida:', imageUrl);
      }

      // 2. Preparar datos para el servidor
      const productToSave: Omit<Product, "id"> = {
        name: productData.name.trim(),
        price: Number(productData.price),
        description: productData.description.trim(),
        image: imageUrl,
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