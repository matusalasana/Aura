import React, { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { Plus, Edit2, Trash2, Search, Loader2, RefreshCw, Package, Tag, DollarSign, Image as ImageIcon } from 'lucide-react';
import ProductForm from '../../components/admin/ProductForm';

const Products = () => {
  const { products, deleteProduct, deleteProductMutation, loading, productsError, refetchProducts } = useAdmin();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Filter products based on search
  const filtered = products.filter((p: any) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-100 border-t-black animate-spin" />
          <Package className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-black" />
        </div>
        <p className="font-medium animate-pulse text-gray-500">Inventory loading...</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-3xl border-2 border-dashed border-red-200 m-4">
        <div className="bg-red-500 p-3 rounded-2xl mb-4">
          <RefreshCw className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-red-900">Sync Interrupted</h3>
        <p className="text-red-600 mb-6">{productsError.message}</p>
        <button 
          onClick={() => refetchProducts()}
          className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-black/10"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Package size={14} /> Inventory Management
          </div>
          <h1 className="text-5xl font-black tracking-tight text-black">
            Products <span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 font-medium">You have {products.length} items in your catalog.</p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="group relative flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-bold overflow-hidden transition-all hover:pr-12 active:scale-95"
        >
          <span className="relative z-10">Add New Item</span>
          <Plus className="relative z-10 h-5 w-5 transition-transform group-hover:rotate-90" />
          <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </header>

      {/* Control Bar */}
      <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-xl p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black transition-all"
          />
        </div>
      </div>

      {/* Content Area */}
      {filtered.length === 0 ? (
        <div className="bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 p-20 text-center">
          <div className="bg-white w-20 h-20 rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">No matches found</h3>
          <p className="text-gray-500 mt-2 mb-8">Try adjusting your filters or search terms.</p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-black font-extrabold hover:text-indigo-600 transition-colors underline decoration-2 underline-offset-4"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Product Details</th>
                  <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Category</th>
                  <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Price</th>
                  <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((p: any) => {
                  const isDeleting = deleteProductMutation.isPending && deleteProductMutation.variables === p._id;
                  
                  return (
                    <tr key={p._id} className="group hover:bg-gray-50/80 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 group-hover:scale-105 transition-transform">
                            {p.image?.[0] ? (
                              <img src={p.image[0]} alt={p.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-300"><ImageIcon size={20} /></div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{p.name}</div>
                            <div className="text-xs text-gray-400 font-medium">ID: {p._id.slice(-6)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide">
                          <Tag size={12} /> {p.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center font-black text-lg text-black">
                          <span className="text-sm mr-0.5 text-gray-400">$</span>{p.price}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-3 bg-white hover:bg-black hover:text-white rounded-xl transition-all border border-gray-200 shadow-sm"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => window.confirm(`Delete ${p.name}?`) && deleteProduct(p._id)}
                            disabled={isDeleting}
                            className="p-3 bg-white hover:bg-red-500 hover:text-white rounded-xl transition-all border border-gray-200 shadow-sm disabled:opacity-30"
                          >
                            {isDeleting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((p: any) => (
              <div key={p._id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div className="h-20 w-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-50">
                    <img src={p.image?.[0] || 'https://via.placeholder.com/80'} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProduct(p)} className="p-2 bg-gray-50 rounded-lg"><Edit2 size={16} /></button>
                    <button onClick={() => deleteProduct(p._id)} className="p-2 bg-red-50 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-black text-indigo-500 uppercase tracking-widest">{p.category}</div>
                  <h4 className="font-bold text-lg leading-tight mt-1">{p.name}</h4>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-2xl font-black">${p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Form Modal */}
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
