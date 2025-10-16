import ProductCard from "./ProductCard";
import AddButton from "./AddButton";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";
import Toast from "../ui/Toast";
import { useProducts } from "../../hooks/useProducts";
import { useToast } from "../../hooks/useToast";
import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/Product";

export default function Content({
	filteredProducts,
}: {
	filteredProducts: Product[];
}) {
	const {
		addNewProduct,
		deleteExistingProduct,
		updateExistingProduct,
		retry,
		loading,
		error,
	} = useProducts();
	const { addToCart } = useCart(); // ← Esto ahora recibe productId
	const { toast, showToast, hideToast } = useToast();

	const handleAdd = async (newProduct: Omit<Product, "id">) => {
		try {
			await addNewProduct(newProduct);
			showToast("Producto agregado exitosamente", "success");
		} catch {
			showToast("Error al agregar el producto", "error");
		}
	};

	const handleDelete = async (id: number) => {
		if (!globalThis.confirm("¿Seguro que deseas eliminar este producto?")) return;
		try {
			await deleteExistingProduct(id);
			showToast("Producto eliminado", "info");
		} catch {
			showToast("Error al eliminar el producto", "error");
		}
	};

	const handleUpdate = async (id: number, updatedFields: Partial<Product>) => {
		try {
			await updateExistingProduct(id, updatedFields);
			showToast("Producto actualizado", "success");
		} catch {
			showToast("Error al actualizar el producto", "error");
		}
	};

	// CORREGIDO: Ahora recibe productId en lugar de Product
	const handleAddToCart = async (productId: number) => {
		try {
			await addToCart(productId);
			showToast('Producto agregado al carrito', 'success');
		} catch {
			showToast('Error al agregar al carrito', 'error');
		}
	};

	if (loading) return <LoadingSpinner />;
	if (error) return <ErrorMessage message={error} onRetry={retry} />;

	return (
		<>
			{toast && (
				<Toast message={toast.message} type={toast.type} onClose={hideToast} />
			)}
			<main className="p-8 flex-1 scrollbar-hide flex">
				<AddButton onAdd={handleAdd} />
				{filteredProducts.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-64">
						<p className="text-xl text-gray-600 font-medium">
							{filteredProducts.length === 0
								? "No hay productos aún. ¡Agrega el primero!"
								: "No se encontraron productos."}
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-4 mt-4">
						{filteredProducts.map((p) => (
							<ProductCard
								key={p.id}
								product={p}
								onDelete={handleDelete}
								onUpdate={handleUpdate}
								onAddToCart={handleAddToCart} // ← Ahora pasa productId
							/>
						))}
					</div>
				)}
			</main>
		</>
	);
}