import { useState, useEffect } from "react";
import type { Category } from "../types/Product";
import * as categoryAPI from "../api/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryAPI.getCategories();
      setCategories(data);
    } catch (err) {
      setError("Error al cargar las categorías");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category: Omit<Category, "id">) => {
    try {
      const saved = await categoryAPI.createCategory(category);
      setCategories(prev => [...prev, saved]);
      return saved;
    } catch (err) {
      console.error("Error al crear categoría:", err);
      throw new Error("No se pudo crear la categoría");
    }
  };

  const updateCategory = async (id: number, updatedFields: Partial<Category>) => {
    try {
      const updated = await categoryAPI.updateCategory(id, updatedFields);
      setCategories(prev => prev.map(cat => cat.id === id ? updated : cat));
      return updated;
    } catch (err) {
      console.error("Error al actualizar categoría:", err);
      throw new Error("No se pudo actualizar la categoría");
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoryAPI.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
      throw new Error("No se pudo eliminar la categoría");
    }
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    retry: loadCategories,
  };
}