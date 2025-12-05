import { Link } from "react-router-dom";
import Title from "./Title"

interface Props {
    subTotal: number;
    currency: string;
    totalPrice: number;
    shippingFee: number;
    itemCount:number;
}


function CartTotals({ currency, totalPrice, shippingFee, subTotal }: Props) {
  return (
    <div className="flex justify-end items-center pr-5">
        <div className="w-full max-w-md px-5">
            <Title text1="CART" text2="TOTALS"/>
            
            <div className="flex flex-col gap-4 mt-4 p-6 bg-white rounded-lg shadow-md">

                <div className="flex justify-between items-center pb-3">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-semibold">{currency}{subTotal.toFixed(2)}</p>
                </div>

                <hr className="border-gray-300"/>
                
                <div className="flex justify-between items-center pb-3">
                    <p className="text-gray-600">Shipping Fee</p>
                    <p className="font-semibold">{currency}{shippingFee.toFixed(2)}</p>
                </div>

                <hr className="border-gray-300"/>
                
                
                <div className="flex justify-between items-center pt-2">
                    <p className="font-bold text-lg">Total</p>
                    <p className="font-bold text-lg  text-amber-600">{currency}{totalPrice.toFixed(2)}</p>
                </div>
                
                
                <Link to={'/place-order'}>
                    <button className="px-6 py-3 w-full mt-4 rounded-lg cursor-pointer hover:bg-gray-700 bg-gray-600 text-white font-semibold transition-colors duration-200">
                        PROCEED TO CHECKOUT
                    </button>
                </Link>
                
                
                <button 
                    onClick={() => window.history.back()}
                    className="px-6 py-2 w-full mt-2 rounded-lg cursor-pointer hover:bg-blue-700 bg-blue-600 text-white font-semibold transition-colors duration-200"
                >
                    CONTINUE SHOPPING
                </button>
            </div>
            
            
            <div className="mt-4 text-center text-xs text-gray-500">
                🔒 Secure checkout • 30-day returns
            </div>
        </div>
    </div>
  )
}

export default CartTotals