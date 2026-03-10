import React, { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import ProductForm from '../../components/admin/ProductForm';

const Products = () => {
  const { products, deleteProduct, loading } = useAdmin();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      deleteProduct(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-zinc-800 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Product</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Price</th>
              <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image?.[0] || 'https://via.placeholder.com/40'} 
                      alt={product.name}
                      className="h-10 w-8 object-cover rounded-lg"
                    />
                    <span className="font-bold text-sm">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 capitalize">{product.category}</td>
                <td className="px-6 py-4 font-black">${product.price}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="p-2 hover:bg-gray-100 rounded-lg mr-2"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAddModal || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;