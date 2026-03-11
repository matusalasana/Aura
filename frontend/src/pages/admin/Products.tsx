import React, { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import ProductForm from '../../components/admin/ProductForm';

const Products = () => {
  const { products, deleteProduct, deleteProductMutation, loading } = useAdmin();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const filtered = products.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and search remain same */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((p: any) => {
              const isDeletingThis =
                deleteProductMutation.isPending && deleteProductMutation.variables === p._id;

              return (
                <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold">{p.name}</td>
                  <td className="px-6 py-4 font-black">${p.price}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="p-2 hover:bg-black hover:text-white rounded-xl transition-all border"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${p.name}"?`)) {
                          deleteProduct(p._id);
                        }
                      }}
                      disabled={isDeletingThis}
                      className="p-2 hover:bg-red-500 hover:text-white rounded-xl transition-all border disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeletingThis ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
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