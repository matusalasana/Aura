import { useEffect, useState } from "react"
import { useShop, type Product } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"
import TiltleDiscription from "./TiltleDiscription"


function LatestCollection() {

  const {products} = useShop()!

  const [latestProducts, setLatestProducts] = useState<Product[]>()

  useEffect(() => {
    setLatestProducts(products)
  },[products])

  return (
    <div className="container mx-auto px-10">

      <div className="flex flex-col items-center justify-center mb-15">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <TiltleDiscription
          text="Discover the season's most sought-after pieces, carefully curated to keep you ahead of the trends. Fresh styles just landed – shop before they're gone!"
        />
      </div>

      <div className="
        grid gap-6 mb-20
        max-sm:grid-cols-1
        max-md:grid-cols-2
        max-lg:grid-cols-2
        max-xl:grid-cols-3
        max-2xl:grid-cols-4
        2xl:grid-cols-5"
      >
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