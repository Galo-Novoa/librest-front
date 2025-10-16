import NavBar from "./components/layout/NavBar";
import Content from "./components/content/Content";
import About from "./components/layout/About";
import { useProducts } from "./hooks/useProducts";
import { useSearch } from "./hooks/useSearch";

export default function App() {
	const { products } = useProducts();
	const { term, setTerm, filtered } = useSearch(products);

	return (
		<div className="flex flex-col h-screen bg-lime-100 overflow-y-auto">
			<NavBar term={term} setTerm={setTerm} />
			<div className="text-center text-sm text-gray-600 flex flex-col">
				<Content filteredProducts={filtered} />
				<About />
			</div>
		</div>
	);
}
