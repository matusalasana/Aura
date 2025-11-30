
import { useShop } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"
import TiltleDiscription from "./TiltleDiscription"


function BestSellers() {

  const {products} = useShop()!

  const bestSellers = products.filter((item) => item.bestseller === true )

  return (
    <div className="max-sm:px-10 md:px-15 lg:px-20 xl:px-30 px-10">

      <div className="mb-15 flex flex-col items-center justify-center">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <TiltleDiscription
          text="See what everyone's talking about! Our best sellers collection features the products that customers keep coming back for. Quality that's been tried, tested, and adored."
        />
      </div>
    
      <div className="mx-auto grid grid-cols-4 gap-6 mb-20 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {bestSellers?.map((product, index)=>(
          <div key={index}>
          { product.bestseller &&
            <ProductItem name={product.name} price={product.price} key={index} imgURL={product.image} productId={product._id} category={product.category} />
          }
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default BestSellers