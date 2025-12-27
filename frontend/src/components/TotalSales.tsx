

import { MdPayment } from "react-icons/md"

function TotalSales() {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md">
      <div>
        <p className="text-gray-700">Total Sales</p>
        <p className="text-xl font-bold">$1,000,000</p>
      </div>
      <div className="bg-green-200 px-4 py-2 rounded-lg">
        <MdPayment size={24} className="text-green-600" />
      </div>
    </div>
  )
}

export default TotalSales