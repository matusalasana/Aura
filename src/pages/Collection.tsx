import { useEffect, useState } from "react"
import { useShop, type Product } from "../context/ShopContext"
import ProductItem from "../components/ProductItem"
import Title from "../components/Title"
import Footer from "../components/Footer"
import Filters from "../components/Filters"
import SearchItem from "../components/SearchItem"


function Collection() {

    const {products} = useShop()!
    const [filteredItems, setFilteredItems] = useState<Product[]>([])

    const [searchTerm, setSearchTerm] = useState<string>()

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
    const [sortBy, setSortBy] = useState<string>()

    const handleSortChange = ( value: string) => {
        setSortBy(value)
    }

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

        let result = [...products];

        switch (sortBy) {
            case "name":
                result.sort((a,b) => 
                    a.name.toLowerCase().localeCompare(b.name)
                )
                break;
            case "high-to-low-price":
                result.sort((a,b) => 
                    b.price - a.price
                )
                break;
            case "low-to-high-price":
                result.sort((a,b) => 
                    a.price - b.price
                )
                break;
            case "review":
                result.sort((a,b) => 
                    b.price - a.price
                )
                break;
        }

        const activeCategories = categories
            .filter(item => item.status === true)
            .map(item => item.category)

        const activeTypes = types
            .filter( item => item.status===true)
            .map(product => product.type)



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

        if (searchTerm) {
            result = result.filter( product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        
        setFilteredItems(result);


        }, [ products, categories, types, clickedSize, sortBy, searchTerm]);

    
    
    return (
        <div className="pt-30">

            <div className="px-15">

                <Title text1="YOUR" text2="COLLECTION" />

                <div className="fixed top-19 left-[20%] right-[20%] max-sm:left-1 max-sm:right-1 z-10">
                    <SearchItem onSearch={ (input) => setSearchTerm(input)} />
                </div>

                <Filters  
                    onClickCategory={ handleCategoryToggle }
                    onClickTypeCheckbox={handleTypeToggle}
                    onSelectSize={handleSizeSelect}
                    clearFilters={() => setFilteredItems(products)}
                    onSelectSort={handleSortChange}
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