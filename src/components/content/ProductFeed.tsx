import ProductCard from "./card/ProductCard";
import AddButton from "./AddButton";
import { useProducts } from "../../hooks/useProducts";

export default function ProductFeed() {
  const { products, addNewProduct, deleteExistingProduct, updateExistingProduct } = useProducts();

  return (
    <main className="p-4 overflow-y-auto flex-1 relative">
      <AddButton onAdd={addNewProduct}/>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onDelete={deleteExistingProduct}
            onUpdate={updateExistingProduct}
          />
        ))}
      </div>
    </main>
  );
}