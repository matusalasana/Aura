import { useEffect, useState } from "react"
import { useShop, type Product } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"


function LatestCollection() {

  const {products} = useShop()!

  const [latestProducts, setLatestProducts] = useState<Product[]>()

  useEffect(() => {
    setLatestProducts(products)
  },[products])

  return (
    <div className="mb-10 mt-20 max-sm:px-10 md:px-15 lg:px-20 xl:px-30 px-10">

      <div className="mb-15">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
      <p className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0">
      Discover the season's most sought-after pieces, carefully curated to keep you ahead of the trends. Fresh styles just landed – shop before they're gone!
      </p>
      </div>

      <div className="mx-auto grid grid-cols-4 gap-6 mb-20 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {latestProducts?.slice(0,10).map((product, index)=>(
          <div key={index}>
            <ProductItem name={product.name} price={product.price} key={index} imgURL={product.image} productId={product._id} category={product.category} />
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default LatestCollection