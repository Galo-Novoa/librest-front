import type { Category } from '../types/categories.types';

const API_URL = 'http://localhost:8080/categories';

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar categorías');
    return response.json();
  },

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Error al crear categoría');
    return response.json();
  },

  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Error al actualizar categoría');
    return response.json();
  },

  async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar categoría');
  }
};