import ProductItem from "../components/ProductItem"
import Title from "../components/Title"
import { useShop } from '../context/ShopContext';

function Wishlist() {
    const { products, wishList, clearWishList } = useShop()!
    
    const wishListIds = wishList.map(item => item.productId)
    
    const wishlistProducts = products.filter(product => 
        wishListIds.includes(product._id)
    )
    

    return (
        <div className="pt-30 max-sm:px-10 md:px-15 lg:px-20 xl:px-30 px-10">

            <Title text1="YOUR" text2="WISHLIST" />

                <button 
                    onClick={() => clearWishList()}
                    className="text-red-500 font-bold hover:text-red-600 mb-3"
                >
                    Clear Wishlist
                </button>


                {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-4 gap-6 mb-20 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
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