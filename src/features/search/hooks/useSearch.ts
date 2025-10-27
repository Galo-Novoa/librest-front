import { useState, useMemo } from "react";
import { searchService } from '../services/searchService';
import type { Product } from '../../products/types/product.types';

export const useSearch = (products: Product[]) => {
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => 
    searchService.searchProducts(products, term), 
    [products, term]
  );

  return { term, setTerm, filtered };
};