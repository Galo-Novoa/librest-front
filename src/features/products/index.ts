// ./src/features/products/index.ts
// Components
export { ProductCard } from "./components/ProductCard";
export { Content } from "./components/Content";
export { AddButton } from "./components/AddButton";
export { AddForm } from "./components/AddForm";

// Pages
export { ProductDetailPage } from "./components/ProductDetailPage"; // ← Ahora apunta al nuevo

// ... resto del código igual

// Hooks
export { useProducts } from "./hooks/useProducts";

// Services
export { productService } from "./services/productService";
export { cloudinaryService } from "./services/cloudinaryService";

// Types
export type {
	Product,
	Category,
	Review,
	ProductFormData,
} from "./types/product.types";
