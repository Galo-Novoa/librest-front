import { useProducts } from '../hooks/useProducts'; // Ruta corregida
import { ProductCard } from './ProductCard';
import { useCartStore } from '../../../app/store/cartStore';
import { LoadingSpinner, ErrorMessage } from '../../../shared/ui';

interface ContentProps {
  filteredProducts: any[];
}

export const Content = ({ filteredProducts }: ContentProps) => {
  const { 
    products, 
    loading, 
    error, 
    deleteExistingProduct, 
    updateExistingProduct, 
    retry 
  } = useProducts();
  const { addToCart } = useCartStore();

  const handleDelete = async (id: number) => {
    try {
      await deleteExistingProduct(id);
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleUpdate = async (id: number, updatedFields: any) => {
    try {
      await updateExistingProduct(id, updatedFields);
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={retry} />;
  }

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product: any) => ( // Tipo añadido
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