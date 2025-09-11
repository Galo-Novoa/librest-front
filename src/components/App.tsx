import { useEffect, useState } from "react";
import ProductoCard from "./ProductCard";
import AgregarProducto from "./AgregarProducto";
import type { Producto } from "../types/Producto";

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((res) => res.json())
      .then((data: Producto[]) => setProductos(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAgregar = (nuevoProducto: Producto) => {
    setProductos((prev) => [...prev, nuevoProducto]);
  };

  const handleEliminar = (id: number) => {
    fetch(`http://localhost:8080/productos/${id}`, { method: "DELETE" })
      .then(() => {
        setProductos((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  return (
    <div className="p-4">
      <AgregarProducto onAgregar={handleAgregar} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} onEliminar={handleEliminar} />
        ))}
      </div>
    </div>
  );
}

export default App;
