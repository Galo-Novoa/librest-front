import { useState, type FormEvent } from "react";
import type { Product } from "../../types/Product";

type Props = {
  onAdd: (newProduct: Omit<Product, "id">) => void;
};

function AddForm({ onAdd }: Readonly<Props>) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description) return;

    onAdd({
      name,
      price: Number(price),
      description,
      image,
    });

    setName("");
    setPrice("");
    setDescription("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white p-4 rounded shadow">
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Precio"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
        className="border p-2 rounded"
      />
      <input
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="URL Imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-lime-500 text-white p-2 rounded mt-2">
        Añadir
      </button>
    </form>
  );
}

export default AddForm;