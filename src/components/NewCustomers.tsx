import { MdPersonAdd } from "react-icons/md"


function NewCustomers() {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md">
      <div>
        <p className="text-gray-700">New Customers</p>
        <p className="text-xl font-bold">123</p>
      </div>
      <div className="bg-blue-200 px-4 py-2 rounded-lg">
        <MdPersonAdd size={24} className="text-blue-600" />
      </div>
    </div>
  )
}

export default NewCustomers