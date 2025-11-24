import { useEffect, useState } from "react"
import { useShop, type Product } from "../context/ShopContext"
import ProductItem from "../components/ProductItem"
import Title from "../components/Title"
import Footer from "../components/Footer"
import Filters from "../components/Filters"


function Collection() {

    const {products} = useShop()!
    // const [sortBy, setSortBy] = useState('')
    const [filteredItems, setFilteredItems] = useState<Product[]>([])

    const [categories, setCategories] = useState([
        { category: 'men', status: false},
        { category: 'women', status: false},
        { category: 'kids', status: false},
    ])
    const [types, setTypes] = useState([
        { type: 'topwear', status: false},
        { type: 'bottomwear', status: false},
    ])

    const handleCategoryToggle = (value: string) => {
        setCategories(prev => 
            prev.map(item => 
                item.category === value 
                    ? { ...item, status: !item.status } 
                    : item
            )
        )
    }

    const handleTypeToggle = (value: string) =>{
        setTypes( prev =>
            prev.map( item => 
                item.type === value 
                    ? {...item, status: !item.status }
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
        

        const activeCategories = categories
            .filter(item => item.status === true)
            .map(item => item.category)

        const activeTypes = types
            .filter( item => item.status===true)
            .map(product => product.type)
            console.log(activeTypes)


        let result = [...products];

        if (activeCategories.length > 0) {
            result = result.filter(product => 
                activeCategories.includes(product.category.toLowerCase())
            );
        }


        if (activeTypes.length > 0) {
            result = result.filter(product => 
                activeTypes.includes(product.subCategory.toLowerCase())
            );
        }

        
        setFilteredItems(result);


        }, [ products, categories, types]);
    
    
    return (
        <div className="pt-30">

            <div className="px-15">
                <Title text1="YOUR" text2="COLLECTION" />

                <p onClick={() => setFilteredItems(products)}>Clear all filters</p>

                <Filters 
                    onSortChange={(value)=> setSortBy(value) } 
                    onClickCategory={ handleCategoryToggle }
                    onClickTypeCheckbox={handleTypeToggle}
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