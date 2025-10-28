// ./src/features/products/index.ts
// Components
export { ProductCard } from "./components/ProductCard";
export { Content } from "./components/Content";
export { AddButton } from "./components/AddButton"; // ← NUEVO
export { AddForm } from "./components/AddForm";     // ← NUEVO

// Pages
export { ProductDetailPage } from "./components/ProductDetailPage";

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
  ProductFormData, // ← NUEVO
} from "./types/product.types";