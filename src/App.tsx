import NavBar from "./components/layout/NavBar";
import Content from "./components/content/Content";
import About from "./components/layout/About";
import CartPage from "./components/content/CartPage";
import ProductDetail from "./components/content/ProductDetail";
import { useProducts } from "./hooks/useProducts";
import { useSearch } from "./hooks/useSearch";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const { products } = useProducts();
  const { term, setTerm, filtered } = useSearch(products);

  return (
    <div className="flex flex-col h-screen bg-lime-100 overflow-y-auto">
      <NavBar setTerm={setTerm} />
      <div className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Content filteredProducts={filtered} />
                <About />
              </>
            } 
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* ← NUEVA RUTA */}
        </Routes>
      </div>
    </div>
  );
}