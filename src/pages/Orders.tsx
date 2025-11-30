import { useState } from "react"
import Footer from "../components/Footer"
import Title from "../components/Title"
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-7842",
    date: "2024-01-15",
    status: "delivered",
    items: 3,
    total: 149.99,
    trackingNumber: "TRK784215893",
    
    
    

  },
  {
    id: "ORD-6591",
    date: "2024-01-12",
    status: "shipped",
    items: 2,
    total: 89.98,
    trackingNumber: "TRK659187432",
    
  },
    
  {
    id: "ORD-5123",
    date: "2024-01-10",
    status: "processing",
    items: 1,
    total: 45.99,
    trackingNumber: null,
    
    
  },
  {
    id: "ORD-4231",
    date: "2024-01-05",
    status: "cancelled",
    items: 2,
    total: 120.50,
    trackingNumber: null,
    
  }
] 
    

const statusConfig = {
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  shipped: { label: "Shipped", color: "bg-gray-100 text-gray-800", icon: Truck },
  processing: { label: "Processing", color: "bg-gray-100 text-gray-800", icon: Clock },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle }
}

function Orders() {
  const [orders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredOrders = orders
    
    .filter(order => statusFilter === "all" || order.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === "highest") return b.total - a.total
      if (sortBy === "lowest") return a.total - b.total
      return 0
    })

  const getStatusIcon = (status: keyof typeof statusConfig) => {
    const IconComponent = statusConfig[status].icon
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Title text1="MY" text2="ORDERS" />
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
            <div className="text-gray-600 text-sm">Total Orders</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-gray-600 text-sm">Delivered</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">
              {orders.filter(o => o.status === 'shipped').length}
            </div>
            <div className="text-gray-600 text-sm">In Transit</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm">Total Spent</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">We couldn't find any orders matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status as keyof typeof statusConfig].color}`}>
                          {getStatusIcon(order.status as keyof typeof statusConfig)}
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Ordered on {new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                      <p className="text-gray-600 text-sm">{order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    
                      <div className="flex items-center gap-4 py-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">name</h4>
                          <p className="text-gray-600 text-sm">quantity</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">price</p>
                        </div>
                      </div>
                    
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-6 mt-6 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {order.trackingNumber && (
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          <span>Tracking: {order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                          Buy Again
                        </button>
                      )}
                      
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Return
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More (if pagination needed) */}
        {filteredOrders.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors">
              Load More Orders
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Orders