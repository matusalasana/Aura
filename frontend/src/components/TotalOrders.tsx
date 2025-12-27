

import { MdOutlineShoppingCart } from "react-icons/md"

function TotalOrders() {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md">
      <div>
        <p className="text-gray-700">Total Orders</p>
        <p className="text-xl font-bold">546</p>
      </div>
      <div className="bg-purple-200 px-4 py-2 rounded-lg">
        <MdOutlineShoppingCart size={24} className="text-purple-600" />
      </div>
    </div>
  )
}

export default TotalOrders