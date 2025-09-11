import { useState } from "react";
import type { FormEvent } from "react";
import type { Producto } from "../types/Producto";

interface Props {
  onAgregar: (p: Producto) => void;
}

const AgregarProducto: React.FC<Props> = ({ onAgregar }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nombre || !precio || !descripcion) return;

    const nuevoProducto = { nombre, precio: Number(precio), descripcion, imagen };

    try {
      const res = await fetch("http://localhost:8080/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });
      const productoGuardado: Producto = await res.json();
      onAgregar(productoGuardado);

      setNombre("");
      setPrecio("");
      setDescripcion("");
      setImagen("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input
        placeholder="Precio"
        type="number"
        value={precio}
        onChange={e => setPrecio(e.target.value === "" ? "" : Number(e.target.value))}
      />
      <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      <input placeholder="Imagen URL" value={imagen} onChange={e => setImagen(e.target.value)} />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AgregarProducto;