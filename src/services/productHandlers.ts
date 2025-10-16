import type { Product } from "../types/Product";
import { uploadImage } from "../api/cloudinary";
import { addProduct } from "../api/products";

export async function addNewProduct({
	name,
	price,
	description,
	imageFile,
}: {
	name: string;
	price: number;
	description: string;
	imageFile?: File | null;
}): Promise<Product> {
	let imageUrl = "";
	if (imageFile) {
		imageUrl = await uploadImage(imageFile);
	}
	const saved = await addProduct({ name, price, description, image: imageUrl });
	return saved;
}
