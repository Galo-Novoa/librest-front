import { Search, X } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function SearchBar({ onSearch }: Readonly<{ onSearch: (q: string) => void }>) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleChange = (value: string) => {
    setQuery(value);
    // Búsqueda en tiempo real
    onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center rounded-2xl w-full bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="pl-4 text-lime-600">
        <Search size={24} strokeWidth={2.5} />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Buscar productos..."
        className="px-4 py-4 h-full w-full outline-none placeholder-lime-600 text-black bg-transparent"
        aria-label="Buscar productos"
      />
      
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="px-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X size={20} />
        </button>
      )}
      
      <button 
        type="submit" 
        className="rounded-r-2xl text-white py-2 px-5 bg-lime-500 hover:bg-lime-600 transition-colors"
        aria-label="Buscar"
      >
        <Search size={24} strokeWidth={3} />
      </button>
    </form>
  );
}