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

function ProductItem({ name, productId, imgURL, price, category }: Props) {

    const { currency, toggleHeart, isHeartToggled, addToWishList, addToCart } = useShop()!

    const isToggled = isHeartToggled(productId);

    const handleToggle = () => {
        toggleHeart(productId);
    }

    return (
            <div 
                className="
                bg-white 
                rounded-xl 
                shadow-md 
                hover:shadow-xl 
                transition-all 
                duration-300 
                overflow-hidden 
                border 
                border-gray-200 
                hover:border-blue-300 
                h-full 
                flex 
                flex-col"
            >
                
                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                        <Link to={`/product/${category}/${productId}`}>
                        <img 
                            src={imgURL[0]} 
                            alt={name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        </Link>
    =                    <div className="absolute top-0 left-0.5">
                            <span className="bg-blue-300 text-xs font-bold px-3 py-1 rounded-full text-white capitalize shadow-sm">
                                {category}
                            </span> 
                        </div>
                        <button onClick={ () => (handleToggle(), addToWishList(productId))} className="top-0.5 right-0.5 absolute cursor-pointer">
                            <div className="bg-white rounded-full px-2 py-2 hover:bg-gray-200 shadow-lg shadow-gray-300">
                                { isToggled 
                                    ?   <BsHeartFill size={15} className={`text-red-600`} />
                                    :   <BsHeart size={15} className= {`text-gray-600`} />
                                }
                            </div>
                        </button>
                    </div>


                <div className="p-4">

                    <div className="mb-3">
                        <Link to={`/product/${category}/${productId}`}>
                            <p className="font-semibold mb-2 line-clamp-1 cursor-pointer hover:text-blue-600 ">
                                {name}
                            </p>
                        </Link>
                        <div className="flex gap-1">
                            <BsStarFill size={12} className="text-orange-600"/>
                            <BsStarFill size={12} className="text-orange-600"/>
                            <BsStarFill size={12} className="text-orange-600"/>
                            <BsStarFill size={12} className="text-orange-600"/>
                            <BsStarHalf size={12} className="text-orange-600"/>
                            <span className="text-xs">{price*16} reviews)</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                            {currency || '$'}{price-1}.99
                            <span className="ml-3 text-sm discountPrice text-gray-500">{price+20}.00</span>
                        </p>
                    </div>

                    <div className="flex justify-between items-center">

                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(productId)
                            }}
                            className="w-[80%] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg cursor-pointer"
                        >
                            <ShoppingBag size={20} />
                            <span>Add to Cart</span>
                        </button>

                    </div>

                </div>


            </div>
            
    )
}

export default ProductItem

