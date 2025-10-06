import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import * as productAPI from "../services/products";
import { uploadImage } from "../services/cloudinary";

export function useProducts() {
  const [products, setProducts] = useState<(Product & { _ts?: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getProducts().then(data => {
      setProducts(data.map(p => ({ ...p, _ts: Date.now() })));
    }).finally(() => setLoading(false));
  }, []);

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
    let image = "";
    if (imageFile) {
      image = await uploadImage(imageFile);
      image += `?t=${Date.now()}`;
    }
    const saved = await productAPI.addProduct({ name, price, description, image });
    setProducts((prev) => [...prev, saved]);
    return saved;
  };

  const deleteExistingProduct = async (id: number) => {
    await productAPI.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateExistingProduct = async (id: number, field: keyof Product, value: string) => {
    const updated = await productAPI.updateProduct(id, { [field]: value });
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated, _ts: Date.now() } : p)));
    return updated;
  };

  return {
    products,
    loading,
    addNewProduct,
    deleteExistingProduct,
    updateExistingProduct,
  };
}