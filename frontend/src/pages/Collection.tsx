// src/pages/Collection.tsx
import { useEffect, useState } from "react"
import ProductItem from "../components/ProductItem"
import Footer from "../components/Footer"
import Filters from "../components/Filters"
import SearchItem from "../components/SearchItem"
import { Product } from "../stores/types"
import { useProducts } from '../hooks/useProducts';

function Collection() {
    // ✅ ALL useState hooks MUST be at the VERY TOP, before any conditions
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
    
    // React Query hook
    const { data: products, isLoading, error } = useProducts();
    const [filteredItems, setFilteredItems] = useState<Product[]>([]);
    
    // Debug logs
    useEffect(() => {
        console.log('🔍 Products:', products);
        console.log('🔍 Loading:', isLoading);
        console.log('🔍 Error:', error);
    }, [products, isLoading, error]);
    
    // Update filtered items when products change
    useEffect(() => {
        if (products) {
            console.log('✅ Setting filtered items:', products.length);
            setFilteredItems(products);
        }
    }, [products]);

    // Filtering effect
    useEffect(() => {
        if (!products?.length) {
            setFilteredItems([]);
            return;
        }

        let result = [...products];

        // Apply sorting
        if (sortBy) {
            switch (sortBy) {
                case "name":
                    result.sort((a, b) => 
                        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                    );
                    break;
                case "high-to-low-price":
                    result.sort((a, b) => b.price - a.price);
                    break;
                case "low-to-high-price":
                    result.sort((a, b) => a.price - b.price);
                    break;
            }
        }

        // Apply category filters
        const activeCategories = categories
            .filter(item => item.status)
            .map(item => item.category);

        if (activeCategories.length > 0) {
            result = result.filter(product => 
                activeCategories.includes(product.category.toLowerCase())
            );
        }

        // Apply type filters
        const activeTypes = types
            .filter(item => item.status)
            .map(item => item.type);

        if (activeTypes.length > 0) {
            result = result.filter(product => 
                activeTypes.includes(product.subCategory.toLowerCase())
            );
        }

        // Apply size filter
        if (clickedSize) {
            result = result.filter(product => 
                product.sizes.includes(clickedSize.toUpperCase())
            );
        }

        // Apply search filter
        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredItems(result);

    }, [products, categories, types, clickedSize, sortBy, searchTerm]);

    // Handlers
    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    const handleCategoryToggle = (value: string) => {
        setCategories(prev => 
            prev.map(item => 
                item.category === value
                    ? { ...item, status: !item.status }
                    : item
            )
        );
    };

    const handleTypeToggle = (value: string) => {
        setTypes(prev =>
            prev.map(item => 
                item.type === value 
                    ? { ...item, status: !item.status }
                    : item
            )
        );
    };

    const handleSizeSelect = (value: string) => {
        setClickedSize(value);
    };

    const clearFilters = () => {
        setCategories(prev => prev.map(c => ({ ...c, status: false })));
        setTypes(prev => prev.map(t => ({ ...t, status: false })));
        setClickedSize(undefined);
        setSortBy(undefined);
        setSearchTerm("");
        if (products) {
            setFilteredItems(products);
        }
    };

    // Loading and error states (these are fine here because they return early)
    if (isLoading) {
        return (
            <div className="pt-60 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">Loading products...</h2>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="pt-60 min-h-screen flex items-center justify-center">
                <div className="text-center text-red-500">
                    <h2 className="text-2xl font-semibold">Error loading products</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-60">
            <div className="px-10 container mx-auto">
                <SearchItem onSearch={setSearchTerm} />

                <Filters  
                    onClickCategory={handleCategoryToggle}
                    onClickTypeCheckbox={handleTypeToggle}
                    onSelectSize={handleSizeSelect}
                    clearFilters={clearFilters}
                    onSelectSort={handleSortChange}
                />
                
                {filteredItems.length > 0 
                    ? <p className="text-sm text-gray-600 font-semibold pt-5 pb-2 px-2">
                        Showing {filteredItems.length} products
                      </p>
                    : <p className="text-sm text-gray-600 font-semibold pt-5 pb-2 px-2">
                        No products found
                      </p>
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
    );
}

export default Collection;