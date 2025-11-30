import { Trash } from "lucide-react";

interface CartBoxProps {
  name: string;
  price: number;
  imgURL: string[];
  category: string;
  productId: string;
  removeCart: (id: string) => void;
  quantity: number;
  updateQuantity?:(productId:string, quantity:number)=>void;
}

function CartBox({ name, price, imgURL, category, productId, removeCart, quantity }: CartBoxProps) {
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
      <img 
        src={imgURL[0]} 
        alt={name}
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="ml-4 flex-1">
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="text-gray-600 text-sm">{category}</p>
        <p className="text-black font-bold text-xl mt-2">${price}</p>
        <p className="text-sm text-gray-500 bg-gray-200 py-2 border border-gray-200 w-40 mx-auto rounded-lg text-center">
          Quantity: {quantity}
        </p>
      </div>
      
      <button 
        onClick={() => removeCart(productId)}
        className="text-red-500 hover:text-red-700 px-3 py-1 cursor-pointer rounded"
      >
        <Trash />
      </button>
    </div>
  )
}

export default CartBox