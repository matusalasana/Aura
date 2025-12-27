
import { useShop } from "../context/ShopContext"
import { Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react";
import { BsHeart, BsHeartFill, BsStarFill, BsStarHalf } from "react-icons/bs";

interface Props {
    name: string;
    imgURL: string[];
    productId: string;
    price: number;
    category: string;
}

function AdminProductItem({ name, productId, imgURL, price, category }: Props) {

    const { currency, toggleHeart, isHeartToggled, addToWishList, addToCart, addNewProduct, adminProducts, products } = useShop()!
    const newProducts = [...products, ...adminProducts]

    const isToggled = isHeartToggled(productId);

    const handleToggle = () => {
        toggleHeart(productId);
    }

    return (
            <div className="bg-[#ffffff] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 h-full flex flex-col w-full ">

                
                    <div className="relative overflow-hidden bg-[ffffff] aspect-square">
                        <Link to={`/product/${category}/${productId}`}>
                        <img 
                            src={imgURL[0]} 
                            alt={name}
                            className="p-2 rounded-2xl w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        </Link>
                        <div className="absolute top-2 left-2">
                            <span className="bg-gray-500 hover:bg-white px-2 py-1 rounded-full shadow-lg text-xs text-white">
                                {category}
                            </span> 
                        </div>
                        <div className="absolute top-3 right-3">

                            <button onClick={ () => (handleToggle(), addToWishList(productId))} className="cursor-pointer flex items-center gap-1 bg-white/90 hover:bg-white px-2 py-1 rounded-full shadow-lg">
                                
                                    { isToggled 
                                        ?   <BsHeartFill size={15} className={` text-red-500 `} />
                                        :   <BsHeart size={15} className= {` text-black `} />
                                    }
                                    <span className="text-xs text-black">Wishlist</span>
                                
                            </button>
                            
                        </div>
                    </div>
                    {newProducts.map((i) => (
                        <div>
                            {i.name}
                        </div>
                    ))}
                


                <div className="p-4">

                    <div className="mb-3">
                        <Link to={`/product/${category}/${productId}`}>
                            <p className="font-semibold mb-2 line-clamp-1 cursor-pointer hover:text-gray-600 ">
                                {name}
                            </p>
                        </Link>
                        <div className="flex gap-1 items-center">
                            <BsStarFill size={10} className="text-black"/>
                            <BsStarFill size={10} className="text-black"/>
                            <BsStarFill size={10} className="text-black"/>
                            <BsStarFill size={10} className="text-black"/>
                            <BsStarHalf size={10} className="text-black"/>
                            <span className="text-xs">{price*16} reviews)</span>
                            <span className="mx-1 h-4 w-0.5 bg-gray-300"></span><span className="font-bold text-sm">4.5</span>
                        </div>
                        <div className="flex gap-2 items-center font-bold text-gray-900 mt-2">
                            
                            <span className="">
                                {currency || 'ETB'}{price*20 - price*20*0.25}
                            </span>
                            <p className="flex flex-col text-[10px]">
                                <span className="text-red-600">
                                    - 25% now save ETB {price*20*0.25}
                                </span>
                                <span className="discountPrice text-gray-500">
                                    {currency || 'ETB'}{price*20-1}.00
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">

                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(productId);
                                addNewProduct(newProducts[0]);
                            }}
                            className="
                            w-[80%] 
                            bg-black
                            text-white
                            hover:bg-gray-700  
                            font-semibold 
                            text-sm 
                            py-3 
                            rounded-lg 
                            transition-all 
                            duration-200 
                            flex items-center 
                            justify-center 
                            gap-2 
                            group-hover:shadow-lg 
                            cursor-pointer"
                        >
                            <ShoppingBag size={20} />
                            <span>ADD TO CART</span>
                        </button>

                    </div>

                </div>


            </div>
            
    )
}

export default AdminProductItem