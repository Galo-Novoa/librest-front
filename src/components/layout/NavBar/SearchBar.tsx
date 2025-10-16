import type { Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ onSearch }: Props) {

    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSearch(inputValue.trim());
    };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
    <input
      type="text"
      placeholder="Buscar productos por nombre o descripción..."
      onChange={(e) => setInputValue(e.target.value)}
      className="px-4 py-3 w-[45vw] rounded-l-2xl h-12 outline-none placeholder-lime-600 bg-transparent focus:outline-none focus:ring focus:ring-lime-400 bg-white placeholder:text-xl text-black"
    />
    <button type="submit" className="rounded-r-2xl h-12 text-lime-600 py-2 px-4 bg-lime-100 hover:bg-lime-200 hover:text-lime-700 transition flex items-center">
        <Search size={35} strokeWidth={3} />
    </button>
    </form>
  );
}