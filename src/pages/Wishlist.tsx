import ProductItem from "../components/ProductItem"
import Title from "../components/Title"
import { useShop } from '../context/ShopContext';

function Wishlist() {
    const { products, wishList, clearWishList } = useShop()!
    
    const wishListIds = wishList.map(item => item.productId)
    console.log('Wishlist IDs:', wishListIds)
    
    const wishlistProducts = products.filter(product => 
        wishListIds.includes(product._id)
    )
    
    console.log('Wishlist Products:', wishlistProducts)

    return (
        <div className="pt-30 px-15">

            <Title text1="YOUR" text2="WISHLIST" />

                <button 
                    onClick={() => clearWishList()}
                    className="text-red-500 font-bold hover:text-red-600"
                >
                    Clear Wishlist
                </button>


                {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-3 max-sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {wishlistProducts.map((product) => (
                            <div key={product._id} className="relative">
                                <ProductItem 
                                    name={product.name}
                                    price={product.price}
                                    productId={product._id}
                                    imgURL={product.image}
                                    category={product.category} 
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">
                        Your wishlist is empty
                    </p>
                )}
        </div>
    )
}

export default Wishlist