import { useEffect, useState } from "react"
import { useShop, type Product } from "../context/ShopContext"
import ProductItem from "../components/ProductItem"
import Title from "../components/Title"
import Footer from "../components/Footer"
import Filters from "../components/Filters"


function Collection() {

    const {products} = useShop()!
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

    const [clickedSize, setClickedSize] = useState<string>()

    const handleCategoryToggle = (value: string) => {
        setCategories(prev => 
            prev.map(item => 
                (item.category === value  )
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

    const handleSizeSelect = (value: string) => {
        setClickedSize( value )
    };


    useEffect(() => {

        if (!products.length) {
            setFilteredItems([]);
            return;
        }

        const activeCategories = categories
            .filter(item => item.status === true)
            .map(item => item.category)

        const activeTypes = types
            .filter( item => item.status===true)
            .map(product => product.type)


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


        if (clickedSize) {
            result = result.filter( product => product.sizes.includes(clickedSize.toUpperCase()))
        }

        
        setFilteredItems(result);


        }, [ products, categories, types, clickedSize]);

    
    
    return (
        <div className="pt-30">

            <div className="px-15">

                <Title text1="YOUR" text2="COLLECTION" />

                <Filters  
                    onClickCategory={ handleCategoryToggle }
                    onClickTypeCheckbox={handleTypeToggle}
                    onSelectSize={handleSizeSelect}
                    clearFilters={() => setFilteredItems(products)}
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