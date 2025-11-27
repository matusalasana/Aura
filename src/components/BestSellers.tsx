
import { useEffect, useState } from "react"
import { useShop, type Product } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"


function BestSellers() {

  const {products} = useShop()!

  const [latestProducts, setLatestProducts] = useState<Product[]>([])

  useEffect(() => {
    setLatestProducts(products)
  },[products])

  return (
    <div className="mb-10 mt-40 max-sm:px-10 md:px-15 lg:px-20 xl:px-30">

      <div className="mb-15">
        <Title text1={"BEST"} text2={"SELLERS"} />
      <p className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0">
        See what everyone's talking about! Our best sellers collection features the products that customers keep coming back for. Quality that's been tried, tested, and adored.
      </p>
      </div>
    
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {latestProducts?.map((product, index)=>(
          <>
          { product.bestseller==true &&
          <div>
            <ProductItem name={product.name} price={product.price} key={index} imgURL={product.image} productId={product._id} category={product.category} />
          </div>
          }
          </>
        ))}
      </div>
      
    </div>
  )
}

export default BestSellers