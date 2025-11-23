interface Props{
    onSortChange: (value:string) => void;
    
}

function Filters( { onSortChange }: Props ) {

    const sort = [
        {label: 'Sort By', value: ''},
        {label: 'Name: A to Z', value: 'name'},
        {label: 'Price: High to Low', value: 'high-to-low-price'},
        {label: 'Price: Low to High', value: 'low-to-high-price'},
        {label: 'Number of reviews', value: 'review'},
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
        
    </div>
  )
}

export default Filters
