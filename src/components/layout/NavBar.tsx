function NavBar() {
  return (
    <nav className="flex h-16 pl-0 items-center space-x-5 bg-lime-400 text-white p-4 font-bold">
      <div className="flex items-center space-x-3 bg-lime-500 p-2 rounded mr-10">
        <img src="/icon.png" alt="[Icono]" className="w-12 h-12"></img>
        <h1 className="text-5xl">MERCADO LIBREST</h1>
      </div>
      <ul className="flex space-x-10 text-3xl">
        <li className="hover:underline">Categorías</li>
        <li className="hover:underline">Ofertas</li>
        <li className="hover:underline">Configuración</li>
      </ul>
    </nav>
  );
}

export default NavBar;