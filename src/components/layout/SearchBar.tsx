import { Search } from "lucide-react"

export default function SearchBar({ onSearch }: Readonly<{ onSearch: (q: string) => void }>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const query = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value
        onSearch(query)
      }}
      className="flex items-center rounded-2xl w-[20vw] bg-white"
    >
      <input
        type="text"
        name="q"
        placeholder="Buscar productos..."
        className="px-4 py-4 h-full w-full text-lime-500 outline-none"
      />
      <button type="submit" className="rounded-xl text-lime-500 absoulte py-2 px-4">
        <Search size={30} strokeWidth={3} />
      </button>
    </form>
  )
}