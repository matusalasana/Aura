
interface Props {
    onClickCategory: (value: string) => void;
    onClickTypeCheckbox: (value: string) => void;
    onSelectSize: (value: string) => void;
}

function Filters({ onClickCategory, onClickTypeCheckbox, onSelectSize }: Props) {

    const sort = [
        { label: 'Sort By', value: '' },
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
        <div className="p-4">

            <div>
                <select 
                    className="rounded-md shadow-md border-2 border-gray-300 p-2"
                >
                    {sort.map((sortBy) => (
                        <option key={sortBy.value} value={sortBy.value}>
                            {sortBy.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-5">
                <p className="font-medium">Categories</p>
                {categories.map((category) => (
                    <div key={category.value} className="flex items-center gap-2 mt-1">
                        <input 
                            onChange={() => onClickCategory(category.value)} 
                            type="checkbox" 
                            id={`cat-${category.value}`} 
                        />
                        <label htmlFor={`cat-${category.value}`}>{category.label}</label>
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <p className="font-medium">Types</p>
                {types.map((type) => (
                    <div key={type.value} className="flex items-center gap-2 mt-1">
                        <input 
                            onChange={() => onClickTypeCheckbox(type.value)} 
                            type="checkbox" 
                            id={`type-${type.value}`} 
                        />
                        <label htmlFor={`type-${type.value}`}>{type.label}</label>
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <p className="font-medium">Sizes</p>
                { sizes.map(product =>(
                    <div key={product.value} className="flex items-center gap-2 ">
                        <input onChange={() => onSelectSize(product.value)} type="radio" id={product.value} name="size" className="cursor-pointer" />
                        <label htmlFor={product.value} className="cursor-pointer" >{product.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filters;