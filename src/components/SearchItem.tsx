import { Search } from "lucide-react"


interface Props {
    onSearch: (input:string) => void;
}

function SearchItem({ onSearch }:Props) {



  return (
    <div className="absolute top-15 left-0 right-0 flex flex-col justify-center items-center gap-4 pt-20 pb-5 rounded-lg bg-gray-900 text-white">
      <p className="text-xl font-semibold">What are you looking for?</p>
      <div className="relative">
        <input type="text" onChange={ (e) => onSearch(e.currentTarget.value) } placeholder="search here . . ." className="text-black bg-white outline-none rounded-full px-7 py-1.5 max-sm:w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw]  " />
        <Search size={20} className="absolute top-2 left-1 text-black"/>
      </div>
    </div>
  )
}

export default SearchItem