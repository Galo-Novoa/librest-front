import type { Product } from '../../products/types/product.types';

export const searchService = {
  searchProducts(products: Product[], query: string): Product[] {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
};