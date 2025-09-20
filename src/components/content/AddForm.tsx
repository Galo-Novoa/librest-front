import { useState } from "react";
import type { FormEvent } from "react";
import type { Product } from "../../types/Product";

interface Props {
	onAdd: (p: Product) => void;
}

const AddForm: React.FC<Props> = ({ onAdd }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState<number | "">("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!name || !price || !description) return;

		const newProduct = {
			name,
			price: Number(price),
			descripcion: description,
			image,
		};

		try {
			const res = await fetch("http://localhost:8080/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newProduct),
			});
			const savedProduct: Product = await res.json();
			onAdd(savedProduct);

			setName("");
			setPrice("");
			setDescription("");
			setImage("");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2">
			<input
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				placeholder="Precio"
				type="number"
				value={price}
				onChange={(e) =>
					setPrice(e.target.value === "" ? "" : Number(e.target.value))
				}
			/>
			<input
				placeholder="Descripción"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<input
				placeholder="URL Imagen"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<button type="submit">Añadir</button>
		</form>
	);
};

export default AddForm;
