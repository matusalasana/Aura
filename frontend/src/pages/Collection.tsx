// src/pages/Collection.tsx
import { useEffect, useState } from "react"
import ProductItem from "../components/ProductItem"
import Footer from "../components/Footer"
import Filters from "../components/Filters"
import SearchItem from "../components/SearchItem"
import useProductStore from "../stores/productStore"
import { Product } from "../stores/types"

import { useProducts } from '../hooks/useProducts';

function Collection() {
  
    const { data: products, isLoading, error } = useProducts();
    const [filteredItems, setFilteredItems] = useState<Product[]>([]);
    
    useEffect(() => {
        if (products) {
            setFilteredItems(products);
        }
    }, [products]);
  
    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products</div>;
    }
  
    const [searchTerm, setSearchTerm] = useState<string>("")

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

    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    const handleCategoryToggle = (value: string) => {
        setCategories(prev => 
            prev.map(item => 
                (item.category === value)
                    ? { ...item, status: !item.status } 
                    : item
            )
        )
    }

    const handleTypeToggle = (value: string) => {
        setTypes(prev =>
            prev.map(item => 
                item.type === value 
                    ? {...item, status: !item.status }
                    : item
            )
        )
    }

    const handleSizeSelect = (value: string) => {
        setClickedSize(value)
    }

    useEffect(() => {
        if (!products.length) {
            setFilteredItems([])
            return
        }

        let result = [...products]

        // Apply sorting
        if (sortBy) {
            switch (sortBy) {
                case "name":
                    result.sort((a, b) => 
                        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                    )
                    break
                case "high-to-low-price":
                    result.sort((a, b) => b.price - a.price)
                    break
                case "low-to-high-price":
                    result.sort((a, b) => a.price - b.price)
                    break
                case "review":
                    // You can implement review sorting logic here
                    break
            }
        }

        // Apply category filters
        const activeCategories = categories
            .filter(item => item.status)
            .map(item => item.category)

        if (activeCategories.length > 0) {
            result = result.filter(product => 
                activeCategories.includes(product.category.toLowerCase())
            )
        }

        // Apply type filters
        const activeTypes = types
            .filter(item => item.status)
            .map(item => item.type)

        if (activeTypes.length > 0) {
            result = result.filter(product => 
                activeTypes.includes(product.subCategory.toLowerCase())
            )
        }

        // Apply size filter
        if (clickedSize) {
            result = result.filter(product => 
                product.sizes.includes(clickedSize.toUpperCase())
            )
        }

        // Apply search filter
        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setFilteredItems(result)

    }, [products, categories, types, clickedSize, sortBy, searchTerm])

    return (
        <div className="pt-60">
            <div className="px-10 container mx-auto">
                <SearchItem onSearch={(input) => setSearchTerm(input)} />

                <Filters  
                    onClickCategory={handleCategoryToggle}
                    onClickTypeCheckbox={handleTypeToggle}
                    onSelectSize={handleSizeSelect}
                    clearFilters={() => setFilteredItems(products)}
                    onSelectSort={handleSortChange}
                />
                
                {filteredItems.length > 0 
                    ? <p className="text-sm text-gray-600 font-semibold pt-5 pb-2 px-2">Showing {filteredItems.length} products</p>
                    : <p className="text-sm text-gray-600 font-semibold pt-5 pb-2 px-2">No products found</p>
                }
                
                <div className="
                    grid gap-6 mb-20
                    max-sm:grid-cols-1
                    max-md:grid-cols-2
                    max-lg:grid-cols-2
                    max-xl:grid-cols-3
                    max-2xl:grid-cols-4
                    2xl:grid-cols-5"
                >
                    {filteredItems.map((product) => (
                        <ProductItem
                            key={product._id}
                            name={product.name}
                            price={product.price}
                            productId={product._id}
                            imgURL={product.image}
                            category={product.category}
                        />
                    ))}
                </div>
            </div>    
            
            <Footer />
        </div>
    )
}

export default Collection