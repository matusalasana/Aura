import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdFilterList } from "react-icons/md";

interface Props {
    onSelectSort: (value: string) => void;
    onClickCategory: (value: string) => void;
    onClickTypeCheckbox: (value: string) => void;
    onSelectSize: (value: string) => void;
    clearFilters: () => void;
}

function Filters({ onClickCategory, onClickTypeCheckbox, onSelectSize, clearFilters, onSelectSort }: Props) {

    const [isFilterOpen, setIsFilterOpepn] = useState(false)

    const closeFilter = () => {
        setIsFilterOpepn(false)
    }

    const sort = [
        { label: 'Sort By', value: 'default' },
        { label: 'Name: A to Z', value: 'name' },
        { label: 'Price: High to Low', value: 'high-to-low-price' },
        { label: 'Price: Low to High', value: 'low-to-high-price' },
        { label: 'Number of reviews', value: 'review' },
    ];

    const categories = [
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
        { label: 'Kids', value: 'kids' },
    ];

    const types = [
        { label: 'Topwear', value: 'topwear' },
        { label: 'Bottomwear', value: 'bottomwear' },
    ];

    const sizes = [
        { label: 'S', value: 's' },
        { label: 'M', value: 'm' },
        { label: 'L', value: 'l' },
        { label: 'XL', value: 'xl' },
    ];

    return (
        <div>

            

        <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
            <select 
                onChange={ (e) => onSelectSort(e.currentTarget.value)}
                className="rounded-md shadow-md border-2 border-gray-300 p-2"
            >
                {sort.map((sortBy) => (
                    <option key={sortBy.value} value={sortBy.value}>
                        {sortBy.label}
                    </option>
                ))}
            </select>
            <button onClick={() => setIsFilterOpepn(!isFilterOpen)} className="flex items-center gap-2 border border-gray-400 hover:border-gray-500 cursor-pointer rounded-md px-2 py-1">
                <span>Filters</span>
                <MdFilterList />
            </button>
        </div>

        <div className={`relative border border-gray-300 bg-white pr-10 pl-2 pt-3 pb-2 my-5 shadow-2xl shadow-gray-300 rounded-lg
                ${ isFilterOpen 
                    ? 'transition-opacity block opacity-100 duration-300'
                    : 'hidden opacity-0'
                }`}>
                <CgClose onClick={() => closeFilter()} size={20} className="absolute text-red-500 hover:text-red-600 cursor-pointer rounded top-0.5 right-0.5"/>
                <p onClick={ () => clearFilters()} className=" text-red-500 font-bold hover:text-red-600 mb-2 cursor-pointer w-30" >Clear all filters</p>
                <div className="flex justify-between flex-wrap max-sm:flex-col">
                    <div>
                        <p className="font-medium text-sm text-gray-800">Categories</p>
                        {categories.map((category) => (
                            <div key={category.value} className="flex items-center gap-2 mt-1 text-gray-700">
                                <input 
                                    onChange={() => onClickCategory(category.value)} 
                                    type="checkbox" 
                                    id={`cat-${category.value}`} 
                                />
                                <label htmlFor={`cat-${category.value}`}>{category.label}</label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <p className="font-medium text-sm text-gray-800">Types</p>
                        {types.map((type) => (
                            <div key={type.value} className="flex items-center gap-2 mt-1 text-gray-700">
                                <input 
                                    onChange={() => onClickTypeCheckbox(type.value)} 
                                    type="checkbox" 
                                    id={`type-${type.value}`} 
                                />
                                <label htmlFor={`type-${type.value}`}>{type.label}</label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <p className="font-medium text-sm text-gray-800">Sizes</p>
                        { sizes.map(product =>(
                            <div key={product.value} className="flex items-center gap-2 text-gray-700 ">
                                <input onChange={() => onSelectSize(product.value)} type="radio" id={product.value} name="size" className="cursor-pointer" />
                                <label htmlFor={product.value} className="cursor-pointer" >{product.label}</label>
                            </div>
                        ))}
                    </div>
            </div>
        </div>

        
        </div>
    );
}

export default Filters;