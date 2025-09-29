import { useEffect, useState } from "react";
import ProductCard from "./card/ProductCard";
import AddButton from "./AddButton";
import type { Product } from "../../types/Product";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../../services/products";

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

	const handleUpdate = async (id: number, field: keyof Product, value: string) => {
		try {
			const updated = await updateProduct(id, { [field]: value });
			setProducts((prev) =>
				prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
			);
		} catch (err) {
			console.error(err);
		}
	};

  return (
    <main className="p-4 overflow-y-auto flex-1 relative">
      <AddButton onAdd={handleAdd} />
      <div className="grid grid-cols-4 gap-4 mt-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </main>
  );
}

export default ProductFeed;