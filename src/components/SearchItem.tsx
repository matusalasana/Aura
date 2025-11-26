import { Search } from "lucide-react"
import { CgClose } from "react-icons/cg";
import { useShop } from "../context/ShopContext";


interface Props {
    onSearch: (input:string) => void;
}

function SearchItem({ onSearch }:Props) {

    const items = useShop()


  return (
    <div className={`relative pr-5 mb-5 rounded-lg
    ${ items?.text
        ? 'block'
        : 'hidden'
    }`}>
        <div className="">
            <input type="text" onChange={ (e) => onSearch(e.currentTarget.value) } className="border rounded-full w-full px-7 py-0.5" />
            <Search size={20} className="absolute left-1 top-1.5"/>
            <CgClose onClick={ () => items?.closeSearch()} size={20} className="absolute top-0.5 right-0.5 cursor-pointer text-red-500 hover:text-red-700"/>
        </div>
    </div>
  )
}

export default SearchItem