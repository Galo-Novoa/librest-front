import { useState, type FormEvent } from "react";
import type { Product } from "../../types/Product";
import { addNewProduct } from "../../services/productHandlers";

type Props = Readonly<{
  onAdd: (newProduct: Omit<Product, "id">) => void;
}>;

export default function AddForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description) return;

    try {
      const newProduct = await addNewProduct({
        name,
        price: Number(price),
        description,
        imageFile,
      });

      onAdd(newProduct);

      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
    } catch (err) {
      console.error("Error al agregar producto:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-lime-300 rounded-xl p-4 mt-4 shadow-xl w-[40vw] justify-center text-xl absolute bottom-40 right-10"
    >
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-white rounded-lg p-2"
      />

      <input
        placeholder="Precio"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
        className="bg-white rounded-lg p-2"
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-40 p-4 rounded-lg resize-none bg-white"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
        className="bg-white rounded-lg p-2"
      />

      <button
        type="submit"
        className="bg-lime-500 text-white p-2 rounded-lg mt-2"
      >
        Añadir
      </button>
    </form>
  );
}