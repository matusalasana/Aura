import React from 'react';

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-300">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vendor Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, here's your sales summary.</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Total Sales", value: "$12,450" },
          { title: "Active Products", value: "84" },
          { title: "Pending Orders", value: "12" },
        ].map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border-l-4 border-amber-500 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-400">
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-4 text-amber-600 dark:text-amber-500 font-medium">#ORD-7721</td>
              <td className="p-4">John Doe</td>
              <td className="p-4">$120.00</td>
              <td className="p-4"><span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded text-xs">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;
