import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import type { Product } from "../types/Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
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