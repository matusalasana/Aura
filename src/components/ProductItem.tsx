
import { useShop } from "../context/ShopContext"
import { Link } from "react-router-dom"
import { BsHeart, BsHeartFill, BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { CgShare } from "react-icons/cg";

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
            <div className="bg-[#ffffff] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 h-full flex flex-col w-full ">

                
                    <div className="relative overflow-hidden bg-[ffffff] aspect-square">
                        <Link to={`/product/${category}/${productId}`}>
                        <img 
                            src={imgURL[0]} 
                            alt={name}
                            className="p-2 rounded-2xl w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        </Link>
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
                


                <div className="p-4">

                    <div className="mb-3 relative">
                        <div className="absolute -top-6 -left-2">
                            <span className="bg-gray-200 px-1 rounded shadow-lg text-xs text-gray-600 font-semibold">
                                {category}
                            </span> 
                        </div>
                        <div className="-top-4.5 -right-2 absolute bg-gray-200 px-1 py-0.5 rounded">
                            <CgShare size={20}/>
                        </div>
                        <Link to={`/product/${category}/${productId}`}>
                            <p className="
                                font-semibold 
                                max-sm:text-xl 
                                max-md:text-lg
                                max-lg:text-md
                                max-xl:text-sm
                                max-2xl:text-lg
                                2xl:text-xl
                                leading-10
                                text-gray-900
                                py-2 
                                line-clamp-1 
                                cursor-pointer 
                                hover:text-blue-600"
                            >
                                {name}
                            </p>
                        </Link>
                       
                        <div className="flex justify-between items-center mt-2">
                            <p className="flex flex-col items-center font-semibold text-gray-500">
                                <span className="max-sm:text-xs">{currency || 'ETB'}</span>
                                <span className="line-through">{price*30}.00</span>
                            </p>
                            <p className="flex flex-col items-center font-bold text-gray-900">
                                <span className="max-sm:text-xs">{currency || 'ETB'}</span>
                                <span className="text-2xl text-gray-800">{price*30 - price*30*0.25-0.01}</span>
                            </p>
                            <p className="bg-red-500 text-white font-semibold px-2 py-2 text-sm rounded-lg">25% OFF</p>
                        </div>
                    </div>

                    <div className="flex gap-1 items-center text-gray-600">
                        <BsStarFill size={15} className="text-amber-500"/>
                        <BsStarFill size={15} className="text-amber-500"/>
                        <BsStarFill size={15} className="text-amber-500"/>
                        <BsStarFill size={15} className="text-amber-500"/>
                        <BsStarHalf size={15} className="text-amber-500"/>
                        <span className="text-xs">({price*2} reviews)</span>
                        <span className="mx-1 h-4 w-0.5 bg-gray-300"></span>
                    </div>

                    <div className="flex justify-center items-center">

                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(productId)
                            }}
                            className="
                            w-full 
                            mt-4 
                            bg-blue-600
                            text-gray-100
                            hover:bg-blue-700
                            font-semibold
                            text-lg
                            py-4
                            rounded-2xl
                            transition-all 
                            duration-100 
                            flex items-center 
                            justify-center 
                            gap-2 
                            group-hover:shadow-lg 
                            cursor-pointer"
                        >
                            <BiCart size={25} />
                            <span>ADD TO CART</span>
                        </button>

                    </div>

                </div>


            </div>
            
    )
}

export default ProductItem

