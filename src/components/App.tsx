import { useEffect, useState } from "react";
import ProductoCard from "./ProductCard";
import type { Producto } from "../types/Producto";

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);

	useEffect(() => {
		fetch("http://localhost:8080/productos")
			.then(res => res.json())
			.then((data: Producto[]) => setProductos(data))
			.catch(err => console.error(err));
	}, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} />
      ))}
    </div>
  );
}

export default App;