import { Search } from "lucide-react"

export default function SearchBar({ onSearch }: Readonly<{ onSearch: (q: string) => void }>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const query = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value
        onSearch(query)
      }}
      className="flex items-center rounded-2xl w-[50vw] bg-white"
    >
      <input
        type="text"
        name="q"
        placeholder="Buscar productos..."
        className="px-4 py-4 h-full w-full outline-none placeholder-lime-600 text-black"
      />
      <button type="submit" className="rounded-xl text-lime-600 py-2 px-4 bg-lime-100 hover:bg-lime-200 hover:text-lime-700 transition">
        <Search size={35} strokeWidth={3} />
      </button>
    </form>
  )
}