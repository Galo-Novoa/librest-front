import { Content } from "../../features/products/components/Content";
import { About } from "../../features/layout";
import { useProducts } from "../../features/products";
import { useSearch } from "../../features/search";

export const HomePage = () => {
	const { products } = useProducts();
	const { setTerm, filtered } = useSearch(products); // Removí 'term' que no se usa

	return (
		<>
			<Content filteredProducts={filtered} />
			<About />
		</>
	);
};
