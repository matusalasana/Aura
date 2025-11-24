import { useEffect, useState } from "react"
import { useShop, type Product } from "../context/ShopContext"
import ProductItem from "../components/ProductItem"
import Title from "../components/Title"
import Footer from "../components/Footer"
import Filters from "../components/Filters"


function Collection() {

    const {products} = useShop()!
    const [sortBy, setSortBy] = useState('')
    // const [sortedItems, setSortedItems] = useState<Product[]>([])
    const [filteredItems, setFilteredItems] = useState<Product[]>([])

    const [checkboxResults, setCheckboxResults] = useState([
        { gender: 'men', status: false},
        { gender: 'women', status: false},
        { gender: 'kids', status: false},
    ])

    const handleCheckboxToggle = (value: string) => {
        setCheckboxResults(prev => 
            prev.map(item => 
                item.gender === value 
                    ? { ...item, status: !item.status } 
                    : item
            )
        )
    }


    useEffect(() => {

        if (!products.length) {
            setFilteredItems([]);
            return;
        }

        // const sortedProducts = [...products];
        
        
        // switch(sortBy) {
        //     case "name":
        //         sortedProducts.sort((a, b) => 
        //             a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        //         break;
        //     case "high-to-low-price":
        //         sortedProducts.sort((a, b) => 
        //             b.price - a.price);
        //         break;
        //     case "low-to-high-price":
        //         sortedProducts.sort((a, b) => 
        //             a.price - b.price);
        //         break;
        //     case "review":
        //         sortedProducts.sort((a, b) => 
        //             b.price - a.price);
        //         break;
        //     default:
        //         break;
        // }
        

        const activeValues = checkboxResults
            .filter(item => item.status === true)
            .map(item => item.gender)

            console.log(activeValues)

        if (activeValues.length===0) {
            setFilteredItems([...products])
        }
        else {
            const genderFilteredItems = products.filter( product => activeValues.includes(product.category.toLowerCase()))
            setFilteredItems(genderFilteredItems)
        }

        // setSortedItems(sortedProducts);

        }, [ products, checkboxResults]);
    
    
    return (
        <div className="pt-30">

            <div className="px-15">
                <Title text1="YOUR" text2="COLLECTION" />

                <p onClick={() => setFilteredItems(products)}>Clear all filters</p>

                <Filters 
                    onSortChange={(value)=> setSortBy(value) } 
                    onClickGenderCheckbox={ handleCheckboxToggle }
                />
                <div className="grid grid-cols-3 max-sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    
                    {filteredItems.map((product) => {
                        return (
                            <ProductItem
                            key={product._id}
                            name={product.name}
                            price={product.price}
                            productId={product._id}
                            imgURL={product.image}
                            category={product.category}
                        />
                        )
                    })}
                    
                </div>

            </div>    
            

            <Footer />
        </div>
    )
}

export default Collection