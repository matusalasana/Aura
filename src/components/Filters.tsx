
interface Props{
    onSortChange: (value:string) => void;
    onClickGenderCheckbox: (value:string) =>void;
    
}

function Filters( { onSortChange, onClickGenderCheckbox }: Props ) {

    const sort = [
        {label: 'Sort By', value: ''},
        {label: 'Name: A to Z', value: 'name'},
        {label: 'Price: High to Low', value: 'high-to-low-price'},
        {label: 'Price: Low to High', value: 'low-to-high-price'},
        {label: 'Number of reviews', value: 'review'},
    ]


    const gender = [
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
        { label: 'Kids', value: 'kids' },
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
            <p>Gender</p>
            { gender.map( (sex) => (
                <div key={sex.value} >
                    <input onChange={ () => onClickGenderCheckbox(sex.value)}  type="checkbox" id={sex.value} />
                    <label htmlFor={sex.value}>{sex.label}</label>
                </div>
            )) }
        </div>
        
    </div>
  )
}

export default Filters
