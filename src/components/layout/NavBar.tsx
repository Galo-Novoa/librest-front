import SearchBar from "./SearchBar";

function NavBar() {
  return (
    <nav className="text-white font-bold whitespace-nowrap">
      <div className="bg-lime-400 flex items-center space-x-5 h-16">
        <div className="flex items-center space-x-3 bg-lime-500 p-2 rounded-br-xl h-full">
          <img src="/icon.png" alt="[Icono]" className="w-12 h-12" />
          <h1 className="text-5xl">MERCADO LIBREST</h1>
        </div>
        <SearchBar onSearch={(_q: string) => {}} />
      </div>

      <ul className="flex space-x-10 text-2xl bg-lime-300 p-2 justify-center text-white rounded-b-2xl">
        <li className="hover:underline">Categorías</li>
        <li className="hover:underline">Ofertas</li>
        <li className="hover:underline">Productos</li>
        <li className="hover:underline">Vender</li>
        <li className="hover:underline">Ayuda</li>
      </ul>
    </nav>
  );
}

export default NavBar;