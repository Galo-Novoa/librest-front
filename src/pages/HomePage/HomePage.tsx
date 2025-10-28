// ./src/pages/HomePage/HomePage.tsx
import { Content } from "../../features/products/components/Content";
import { About } from "../../features/layout";
import { useProducts } from "../../features/products";
import { useSearch } from "../../features/search";
import { useSearchStore } from "../../app/store";

export const HomePage = () => {
  const { products } = useProducts();
  const { searchTerm } = useSearchStore(); // ← NUEVO: obtener término de búsqueda
  const { filtered } = useSearch(products, searchTerm); // ← Pasar término

  return (
    <>
      <Content filteredProducts={filtered} />
      <About />
    </>
  );
};