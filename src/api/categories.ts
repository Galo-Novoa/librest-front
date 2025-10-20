import type { Category } from '../types/Product';

const API_URL = 'http://localhost:8080/categories';

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al cargar categorías');
  return res.json();
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
}

export async function updateCategory(id: number, category: Partial<Category>): Promise<Category> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Error al actualizar categoría');
  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar categoría');
}