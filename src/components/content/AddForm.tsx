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
			description: description,
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
		<form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-lime-300 rounded-xl p-4 mt-4 shadow-xl w-[40vw] justify-center text-xl absolute bottom-40 right-10">
			<input
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="bg-white rounded-lg p-2"
			/>
			<input
				placeholder="Precio"
				type="number"
				value={price}
				onChange={(e) =>
					setPrice(e.target.value === "" ? "" : Number(e.target.value))
				}
				className="bg-white rounded-lg p-2"
			/>
			<textarea
				placeholder="Descripción"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="w-full h-40 p-4 rounded-lg resize-none bg-white"
			/>
			<input
				placeholder="URL Imagen"
				value={image}
				onChange={(e) => setImage(e.target.value)}
				className="bg-white rounded-lg p-2"
			/>
			<button type="submit" className="rounded-2xl bg-lime-400 w-40 m-auto">Añadir</button>
		</form>
	);
};

export default AddForm;
