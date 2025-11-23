import { useEffect, useState } from "react"
import { useShop, type Product } from "../context/ShopContext"
import ProductItem from "../components/ProductItem"
import Title from "../components/Title"
import Footer from "../components/Footer"
import Filters from "../components/Filters"


function Collection() {

    const {products} = useShop()!
    const [sortBy, setSortBy] = useState('')
    const [sortedItems, setSortedItems] = useState<Product[]>([])

    useEffect (()=>{
        if(sortBy=="name"){
            setSortedItems([...products].sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())))
        }
        else if (sortBy=="high-to-low-price"){
            setSortedItems([...products].sort((a,b) => b.price - a.price))
        }
        else if (sortBy=="low-to-high-price"){
            setSortedItems([...products].sort((a,b) => a.price - b.price))
        }
        else if (sortBy=="review"){
            setSortedItems([...products].sort((a,b) => b.price - a.price))
        }
         else {
            setSortedItems([...products])
        }
    },[sortBy])
    
    
    console.log(sortBy)
    return (
        <div className="pt-30">

            <div className="px-15">
                <Title text1="YOUR" text2="COLLECTION" />
                <Filters 
                    onSortChange={(value)=> setSortBy(value) } 
                />
                <div className="grid grid-cols-3 max-sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    
                    {sortedItems.map((product) => {
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