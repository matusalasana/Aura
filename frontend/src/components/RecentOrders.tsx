import Title from "./Title"

const recentOrders = [
    { id: 1, customer: 'John Doe', date: '2024-06-01', amount: '1500.00', status: 'Completed' },
    { id: 2, customer: 'Jane Smith', date: '2024-06-02', amount: '2500.00', status: 'Pending' },
    { id: 3, customer: 'Mike Johnson', date: '2024-06-03', amount: '1000.00', status: 'Completed' },
    { id: 4, customer: 'Emily Davis', date: '2024-06-04', amount: '400.00', status: 'Cancelled' },
    { id: 5, customer: 'David Wilson', date: '2024-06-05', amount: '1000.00', status: 'Completed' },
    { id: 6, customer: 'Sarah Brown', date: '2024-06-06', amount: '500.00', status: 'Pending' },
    { id: 7, customer: 'Chris Lee', date: '2024-06-07', amount: '750.00', status: 'Completed' },
    { id: 8, customer: 'Anna Garcia', date: '2024-06-08', amount: '1000.00', status: 'Cancelled' },
    { id: 9, customer: 'James Martinez', date: '2024-06-09', amount: '900.00', status: 'Completed' },
    { id: 10, customer: 'Laura Rodriguez', date: '2024-06-10', amount: '2500.00', status: 'Pending' },
]

function RecentOrders() {
  return (
    <div>
        <div className="mt-10">
            <Title text1="RECENT" text2="ORDERS" />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 overflow-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Order ID</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Customer</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Amount (ETB)</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-200">{order.id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.customer}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.date}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.amount}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    {order.status == "Completed" 
                                        ? <span className="text-green-900 bg-green-200 px-3 py-1 rounded">Completed</span> : order.status == "Pending" 
                                        ? <span className="text-yellow-900 bg-yellow-200 px-5.5 py-1 rounded">Pending</span> : <span className="text-red-900 bg-red-200 px-4.5 py-1 rounded">Cancelled</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>    
    </div>
  )
}

export default RecentOrders