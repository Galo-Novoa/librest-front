import ProductCard from "./card/ProductCard";
import AddButton from "./AddButton";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";
import Toast from "../ui/Toast";
import { useProducts } from "../../hooks/useProducts";
import { useToast } from "../../hooks/useToast";
import { AlertCircle, Search } from "lucide-react";
import { useState } from "react";

export default function ProductFeed() {
  const { 
    products, 
    loading, 
    error, 
    addNewProduct, 
    deleteExistingProduct, 
    updateExistingProduct, 
    retry 
  } = useProducts();
  
  const { toast, showToast, hideToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = async (newProduct: any) => {
    try {
      await addNewProduct(newProduct);
      showToast("Producto agregado exitosamente", "success");
    } catch (err) {
      console.error("Error al agregar el producto:", err);
      showToast("Error al agregar el producto", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    
    try {
      await deleteExistingProduct(id);
      showToast("Producto eliminado", "info");
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      showToast("Error al eliminar el producto", "error");
    }
  };

  const handleUpdate = async (id: number, field: any, value: string) => {
    try {
      await updateExistingProduct(id, field, value);
      showToast("Producto actualizado", "success");
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      showToast("Error al actualizar el producto", "error");
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      
      <main className="p-4 flex-1 overflow-y-auto scrollbar-hide relative max-h-screen">
        <AddButton onAdd={handleAdd} />
        
        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={20} 
            />
            <input
              type="text"
              placeholder="Buscar productos por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2">
              Mostrando {filteredProducts.length} de {products.length} productos
            </p>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <AlertCircle className="text-gray-400 mb-4" size={64} />
            <p className="text-xl text-gray-600 font-medium">
              {searchTerm 
                ? `No se encontraron productos con "${searchTerm}"` 
                : "No hay productos aún. ¡Agrega el primero!"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-lime-600 hover:text-lime-700 underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {filteredProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}