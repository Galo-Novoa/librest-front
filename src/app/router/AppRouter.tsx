// ./src/app/router/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { CartPage } from "../../features/cart/pages/CartPage";
import { ProductDetailPage } from "../../features/products/components/ProductDetailPage"; // ← Ahora apunta al nuevo

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
};