import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { CartPage } from "../../features/cart/pages/CartPage";
import { ProductDetailPage } from "../../features/products/components/ProductDetailPage"; // Ruta corregida

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/cart" element={<CartPage />} />
			<Route path="/product/:id" element={<ProductDetailPage />} />
		</Routes>
	);
};
