import { Search } from "lucide-react"

interface Props {
    onSearch: (input:string) => void;
}

function SearchItem({ onSearch }:Props) {
  return (
    <div className="relative mb-10">
        <input type="text" onChange={ (e) => onSearch(e.currentTarget.value) } className=" border rounded-full w-full px-5 py-0.5" />
        <Search size={20} className="absolute left-1 top-1"/>
    </div>
  )
}

export default SearchItem