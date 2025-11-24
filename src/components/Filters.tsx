
interface Props{
    onSortChange: (value:string) => void;
    onClickCategory: (value:string) =>void;
    onClickTypeCheckbox: (value: string) =>void;
    
}

function Filters( { onSortChange, onClickCategory, onClickTypeCheckbox }: Props ) {

    const sort = [
        {label: 'Sort By', value: ''},
        {label: 'Name: A to Z', value: 'name'},
        {label: 'Price: High to Low', value: 'high-to-low-price'},
        {label: 'Price: Low to High', value: 'low-to-high-price'},
        {label: 'Number of reviews', value: 'review'},
    ]


    const categories = [
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
        { label: 'Kids', value: 'kids' },
    ]

    const types = [
        { label: 'Topwear', value: 'topwear' },
        { label: 'Bottomwear', value: 'bottomwear' },
    ]

  return (
    <div>
        <div>
            <select onChange={(e) => onSortChange(e.currentTarget.value)} name="select" id="select" className="rounded-sm shadow-2xl shadow-black">
                {sort.map( (sortBy) =>(
                    <option key={sortBy.value} value={sortBy.value}>{sortBy.label}</option>
                ) )}
            </select>
        </div>

        <div className="mt-5">
            <p>Categories</p>
            { categories.map( (category) => (
                <div key={category.value} >
                    <input onChange={ () => onClickCategory(category.value)}  type="checkbox" id={category.value} />
                    <label htmlFor={category.value}>{category.label}</label>
                </div>
            )) }
        </div>

        <div className="mt-5">
            <p>Types</p>
            { types.map( (type) => (
                <div key={type.value} >
                    <input onChange={ () => onClickTypeCheckbox(type.value)}  type="checkbox" id={type.value} />
                    <label htmlFor={type.value}>{type.label}</label>
                </div>
            )) }
        </div>
        
    </div>
  )
}

export default Filters
