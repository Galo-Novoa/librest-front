import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex text-xl items-center">
      <input
        type="text"
        placeholder="Buscar productos por nombre o descripción..."
        value={inputValue}
        onChange={handleInputChange}
        className="px-4 py-3 w-[45vw] rounded-l-2xl h-12 outline-none placeholder-lime-600 bg-transparent focus:outline-none focus:ring focus:ring-lime-400 bg-white text-black"
      />
      <button 
        type="submit" 
        className="rounded-r-2xl h-12 text-lime-600 py-2 px-4 bg-lime-100 hover:bg-lime-200 hover:text-lime-700 transition flex items-center"
      >
        <Search size={35} strokeWidth={3} />
      </button>
    </form>
  );
};