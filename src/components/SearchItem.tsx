import { Search } from "lucide-react"
import { CgClose } from "react-icons/cg";
import { useShop } from "../context/ShopContext";


interface Props {
    onSearch: (input:string) => void;
}

function SearchItem({ onSearch }:Props) {

    const {text, closeSearch} = useShop()!


  return (
    <div className={`relative pr-5 mb-5 rounded-lg flex justify-center
    ${ text
        ? 'block'
        : 'hidden'
    }`}>
            <input type="text" onChange={ (e) => onSearch(e.currentTarget.value) } placeholder="search here . . ." className="bg-slate-900/15 border rounded-full px-7 py-0.5 w-full  " />
            <Search size={20} className="absolute top-1.5 left-1"/>
            <CgClose onClick={ () => closeSearch()} size={20} className="absolute top-0.5 -right-1 cursor-pointer text-red-500 hover:text-red-700"/>
    </div>
  )
}

export default SearchItem