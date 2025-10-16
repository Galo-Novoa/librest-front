function About() {
  return (
    <div className="p-8 bg-lime-200 flex items-center justify-center flex-col text-center">
      <h2 className="text-lg font-bold mb-2 text-gray-800">Sobre Mercado Librest</h2>
      <p className="mb-2 text-gray-700">
        Aplicación de gestión de productos desarrollada con React, TypeScript y Tailwind CSS.
      </p>
      <p className="text-gray-600 text-xs">
        Puedes agregar, editar y eliminar productos de manera intuitiva.
      </p>
    </div>
  );
}

export default About;