
import { Plus, Search } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Nike Hoodie",
    stock: 25,
    price: 35,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Oversized Tee",
    stock: 4,
    price: 20,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Cargo Pants",
    stock: 0,
    price: 45,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Denim Jacket",
    stock: 17,
    price: 60,
    status: "In Stock",
  },
];

const stats = [
  {
    title: "Products",
    value: 128,
  },
  {
    title: "Low Stock",
    value: 12,
  },
  {
    title: "Out of Stock",
    value: 3,
  },
];

export default function VendorDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Inventory
          </h1>
          <p className="text-sm text-zinc-500">
            Manage your products and stock.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm text-zinc-500">{item.title}</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <select className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Product</th>
                <th className="px-6 py-4 text-sm font-semibold">Stock</th>
                <th className="px-6 py-4 text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-zinc-200 last:border-0 dark:border-zinc-800"
                >
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                    {product.name}
                  </td>

                  <td className="px-6 py-4">{product.stock}</td>

                  <td className="px-6 py-4">${product.price}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700">
          Previous
        </button>

        <div className="flex gap-2">
          <button className="rounded-md bg-amber-500 px-3 py-1.5 text-sm text-white">
            1
          </button>

          <button className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700">
            2
          </button>

          <button className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700">
            3
          </button>
        </div>

        <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700">
          Next
        </button>
      </div>
    </div>
  );
}