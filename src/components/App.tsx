import { useEffect, useState } from "react";
import ProductoCard from "./ProductCard";
import type { Producto } from "../types/Producto";

// Lista estática de prueba
const productosMock: Producto[] = [
	{
		id: 1,
		nombre: "Laptop",
		precio: 1500,
		descripcion: "Laptop potente",
		imagen: "/laptop.jpeg",
	},
	{
		id: 2,
		nombre: "Mouse",
		precio: 20,
		descripcion: "Mouse ergonómico",
		imagen: "/mouse.png",
	},
	{
		id: 3,
		nombre: "Teclado",
		precio: 45,
		descripcion: "Teclado mecánico",
		imagen: "/teclado.png",
	},
];

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [producto, setProducto] = useState<Producto | null>(null);

	// Fetch sin uso aún
  useEffect(() => {
    const id = 1;
    fetch(`http://localhost:8080/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setProductos(productosMock);
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