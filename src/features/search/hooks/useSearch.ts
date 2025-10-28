// ./src/features/search/hooks/useSearch.ts
import { useMemo } from "react";
import { searchService } from '../services/searchService';
import type { Product } from '../../products/types/product.types';

export const useSearch = (products: Product[], term: string) => { // ← Recibe term como parámetro
  const filtered = useMemo(() => 
    searchService.searchProducts(products, term), 
    [products, term]
  );

  return { filtered };
};