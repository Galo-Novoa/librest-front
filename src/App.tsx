import { useEffect, useState } from "react";
import NavBar from "./components/layout/NavBar";
import About from "./components/layout/About";
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
        <div className="flex flex-col h-screen bg-lime-100">
      <NavBar />
      <main className="p-4 overflow-y-auto flex-1">
        <AddProduct onAdd={handleAdd} />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onDelete={handleDelete} />
          ))}
        </div>
      </main>
      <footer className="p-4 bg-lime-200 text-center text-sm text-gray-600">
        <About />
      </footer>
    </div>
  );
}

export default App;