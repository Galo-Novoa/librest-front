// ./src/features/products/components/Content.tsx
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { AddButton } from "./AddButton"; // ← NUEVO
import { useCartStore } from "../../../app/store/cartStore";
import { LoadingSpinner, ErrorMessage } from "../../../shared/ui";
import { useToast } from "../../../shared/lib/useToast"; // ← NUEVO
import { Toast } from "../../../shared/ui/Toast"; // ← NUEVO

interface ContentProps {
	filteredProducts: any[];
}

export const Content = ({ filteredProducts }: ContentProps) => {
	const {
		products,
		loading,
		error,
		addNewProduct, // ← NUEVO: agregar esta función
		deleteExistingProduct,
		updateExistingProduct,
		retry,
	} = useProducts();
	const { addToCart } = useCartStore();
	const { toast, showToast, hideToast } = useToast(); // ← NUEVO

	const handleAdd = async (newProduct: any) => {
		// ← NUEVA FUNCIÓN
		try {
			await addNewProduct(newProduct);
			showToast("Producto agregado exitosamente", "success");
		} catch {
			showToast("Error al agregar el producto", "error");
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteExistingProduct(id);
			showToast("Producto eliminado", "info"); // ← NUEVO
		} catch (err) {
			console.error("Error deleting product:", err);
			showToast("Error al eliminar el producto", "error"); // ← NUEVO
		}
	};

	const handleUpdate = async (id: number, updatedFields: any) => {
		try {
			await updateExistingProduct(id, updatedFields);
			showToast("Producto actualizado", "success"); // ← NUEVO
		} catch (err) {
			console.error("Error updating product:", err);
			showToast("Error al actualizar el producto", "error"); // ← NUEVO
		}
	};

	const handleAddToCart = async (productId: number) => {
		try {
			await addToCart(productId);
			showToast("Producto agregado al carrito", "success"); // ← NUEVO
		} catch (err) {
			console.error("Error adding to cart:", err);
			showToast("Error al agregar al carrito", "error"); // ← NUEVO
		}
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorMessage message={error} onRetry={retry} />;
	}

	const displayProducts =
		filteredProducts.length > 0 ? filteredProducts : products;

	return (
		<div className="p-6">
			{/* NUEVO: Toast notifications */}
			{toast && (
				<Toast message={toast.message} type={toast.type} onClose={hideToast} />
			)}

			{/* NUEVO: AddButton flotante */}
			<AddButton onAdd={handleAdd} />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{displayProducts.map((product: any) => (
					<ProductCard
						key={product.id}
						product={product}
						onDelete={handleDelete}
						onUpdate={handleUpdate}
						onAddToCart={handleAddToCart}
					/>
				))}
			</div>
		</div>
	);
};