// ./src/app/router/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { CartPage } from "../../features/cart/pages/CartPage";
import { ProductDetailPage } from "../../features/products/components/ProductDetailPage";
import { CheckoutPage } from "../../features/cart/pages/CheckoutPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
};