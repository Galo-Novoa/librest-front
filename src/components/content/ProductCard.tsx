import React, { useState } from "react";
import type { Product } from "../../types/Product";
import {
	AlertCircle,
	Trash2,
	Pencil,
	Check,
	X as CancelIcon,
	ShoppingCart
} from "lucide-react";
import { uploadImage } from "../../api/cloudinary";

type Props = {
	product: Product & { _ts?: number };
	onDelete: (id: number) => void;
	onUpdate: (id: number, updatedFields: Partial<Product>) => void;
	onAddToCart: (product: Product) => void;
};

type EditValues = {
	name: string;
	description: string;
	price: string;
	image: string | File;
};

const ProductCard: React.FC<Props> = ({ product, onDelete, onUpdate }) => {
	const [imageError, setImageError] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editValues, setEditValues] = useState<EditValues>({
		name: product.name,
		description: product.description,
		price: product.price.toString(),
		image: product.image || "",
	});
	const [previewImage, setPreviewImage] = useState<string>(product.image || "");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setEditValues((prev) => ({ ...prev, image: file }));
		setPreviewImage(URL.createObjectURL(file));
		setImageError(false);
	};

	const handleSave = async () => {
		const numericPrice = parseFloat(editValues.price.replace(/[$\s]/g, "")) || 0;
		let imageUrl = product.image || "";

		if (editValues.image instanceof File) {
			imageUrl = await uploadImage(editValues.image);
		}

		onUpdate(product.id, {
			name: editValues.name,
			description: editValues.description,
			price: numericPrice,
			image: imageUrl,
		});
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditValues({
			name: product.name,
			description: product.description,
			price: product.price.toString(),
			image: product.image || "",
		});
		setPreviewImage(product.image || "");
		setIsEditing(false);
	};

	return (
		<fieldset
			className="relative border rounded-xl shadow-md p-4 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden w-full flex"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
		>
			{/* Botones flotantes */}
			<button
				onClick={() => onDelete(product.id)}
				className={`w-12 h-12 flex items-center justify-center absolute top-2 right-2 bg-red-500 text-white rounded-full transition-all duration-300 z-10 hover:bg-red-600 ${
					isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
				}`}
				aria-label="Eliminar producto"
				title="Eliminar producto"
			>
				<Trash2 size={25} />
			</button>

			<button
				onClick={() => setIsEditing(!isEditing)}
				className={`w-12 h-12 flex items-center justify-center absolute top-15 right-2 bg-blue-500 text-white rounded-full transition-all duration-300 z-10 hover:bg-blue-600 ${
					isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
				}`}
				aria-label="Editar producto"
				title={isEditing ? "Cancelar edición" : "Editar producto"}
			>
				{isEditing ? <CancelIcon size={28} /> : <Pencil size={22} />}
			</button>

			{!isEditing && (
				<button
					className={`w-12 h-12 flex items-center justify-center absolute top-28 right-2 bg-lime-500 text-white rounded-full transition-all duration-300 z-10 hover:bg-lime-600 ${
						isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
					}`}
					aria-label="Añadir al carrito"
					title="Añadir al carrito"
					style={{ transitionProperty: "opacity, transform" }}
				>
					<ShoppingCart size={24} />
				</button>
			)}

			{/* Contenedor de dos columnas */}
			<div className="flex w-full gap-4">
				{/* Columna izquierda: imagen */}
				<div className="w-1/2 h-48 w-60 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
					{imageError ? (
						<div className="flex flex-col items-center justify-center w-full h-full">
							<AlertCircle className="text-gray-400 mb-2" size={48} />
							<span className="text-gray-500 text-sm">Imagen no disponible</span>
						</div>
					) : (
						<img
							src={isEditing ? previewImage : product.image || ""}
							alt={product.name}
							className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
							onError={() => setImageError(true)}
						/>
					)}
					{isEditing && (
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="absolute bottom-2 left-2"
						/>
					)}
				</div>

				{/* Columna derecha: contenido */}
				<div className="flex flex-col flex-1 gap-2">
					{isEditing ? (
						<>
							<input
								value={editValues.name}
								onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
								className="text-lg font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500"
							/>
							<textarea
								value={editValues.description}
								onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
								className="text-gray-600 text-sm border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500 resize-none truncate line-clamp-3"
							/>
							<input
								value={editValues.price}
								onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
								className="text-2xl font-bold text-lime-600 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500"
							/>
							<div className="mt-2 flex gap-2">
								<button
									onClick={handleSave}
									className="bg-lime-500 text-white px-4 py-1 rounded hover:bg-lime-600 flex items-center"
								>
									<Check size={16} className="inline mr-1" /> Guardar
								</button>
								<button
									onClick={handleCancel}
									className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 flex items-center"
								>
									<CancelIcon size={16} className="inline mr-1" /> Cancelar
								</button>
							</div>
						</>
					) : (
						<>
							<h2 className="text-lg font-bold text-gray-800 line-clamp-2">{product.name}</h2>
							<p className="text-gray-600 text-sm line-clamp-3 flex-1">{product.description}</p>
							<div className="mt-auto pt-2 border-t border-gray-200">
								<p className="text-2xl font-bold text-black">
									${new Intl.NumberFormat("es-AR").format(Number(product.price))}
								</p>
							</div>
						</>
					)}
				</div>
			</div>

			<div
				className={`absolute bottom-0 left-0 right-0 h-1 bg-lime-500 transition-all duration-300 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
			/>
		</fieldset>
	);
};

export default ProductCard;