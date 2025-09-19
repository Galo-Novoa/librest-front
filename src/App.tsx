import { useEffect, useState } from "react";
import ProductCard from "./components/content/ProductCard";
import AddProduct from "./components/content/AddProduct";
import type { Product } from "./types/Product";
import { getProducts, addProduct, deleteProduct } from "./services/products";

function App() {
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

  return (
    <div className="p-4">
      <AddProduct onAdd={handleAdd} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;