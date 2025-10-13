import NavBar from "./components/layout/NavBar";
import About from "./components/layout/About";
import ProductFeed from "./components/content/ProductFeed";

function App() {
  return (
    <div className="flex flex-col h-screen bg-lime-100">
      <NavBar />
      <ProductFeed />
      <footer className="p-4 bg-lime-200 text-center text-sm text-gray-600">
        <About />
      </footer>
    </div>
  );
}

export default App;