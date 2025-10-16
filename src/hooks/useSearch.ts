import { useState, useMemo } from "react";
import { searchProducts } from "../services/searchService";
import type { Product } from "../types/Product";

export function useSearch(products: Product[]) {
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => searchProducts(products, term), [products, term]);

  return { term, setTerm, filtered };
}
