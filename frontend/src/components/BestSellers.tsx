// src/components/BestSellers.tsx
import { useEffect, useState } from "react"
import Title from "./Title"
import ProductItem from "./ProductItem"
import TiltleDiscription from "./TiltleDiscription"
import { useProducts } from "../hooks/useProducts"
import { Product } from "../stores/types"

function BestSellers() {
    const { data: products } = useProducts()
    const [bestSellers, setBestSellers] = useState<Product[]>([])

    useEffect(() => {
        if (products) {
            const filtered = products.filter((item) => item.bestseller === true)
            setBestSellers(filtered)
        }
    }, [products])

    return (
        <div className="container mx-auto px-10">
            <div className="mb-15 flex flex-col items-center justify-center">
                <Title text1={"BEST"} text2={"SELLERS"} />
                <TiltleDiscription
                    text="See what everyone's talking about! Our best sellers collection features the products that customers keep coming back for. Quality that's been tried, tested, and adored."
                />
            </div>
    
            <div className="
                grid gap-6 mb-20
                max-sm:grid-cols-1
                max-md:grid-cols-2
                max-lg:grid-cols-2
                max-xl:grid-cols-3
                max-2xl:grid-cols-4
                2xl:grid-cols-5">
                {bestSellers?.map((product) => (
                    <div key={product._id}>
                        <ProductItem 
                            name={product.name} 
                            price={product.price} 
                            imgURL={product.image} 
                            productId={product._id} 
                            category={product.category} 
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BestSellers