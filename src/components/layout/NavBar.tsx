import SearchBar from "./SearchBar";

function NavBar() {
  return (
    <nav className="flex h-16 pl-0 items-center space-x-5 bg-lime-400 text-white p-4 font-bold">
      <div className="flex items-center space-x-3 bg-lime-500 p-2 rounded-br-xl mr-10 h-16">
        <img src="/icon.png" alt="[Icono]" className="w-12 h-12"></img>
        <h1 className="text-5xl">MERCADO LIBREST</h1>
      </div>
      <SearchBar onSearch={function (_q: string): void {
        throw new Error("Function not implemented.");
      } } />
      <ul className="flex space-x-10 text-3xl">
        <li className="hover:underline">Categorías</li>
        <li className="hover:underline">Ofertas</li>
        <li className="hover:underline">Productos</li>
        <li className="hover:underline">Ayuda</li>
      </ul>
    </nav>
  );
}

export default NavBar;