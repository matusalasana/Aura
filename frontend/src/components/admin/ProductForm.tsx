// components/admin/ProductForm.tsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || 'men',
    subCategory: product?.subCategory || 'topwear',
    sizes: product?.sizes || ['S', 'M', 'L', 'XL'],
    bestseller: product?.bestseller || false,
    image: product?.image || ['', '', '', ''],
  });

  const categories = ['men', 'women', 'kids'];
  const subCategories = ['topwear', 'bottomwear', 'winterwear'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.image];
    newImages[index] = value;
    setFormData({ ...formData, image: newImages });
  };

  const handleSizeToggle = (size: string) => {
    const currentSizes = [...formData.sizes];
    if (currentSizes.includes(size)) {
      setFormData({ 
        ...formData, 
        sizes: currentSizes.filter(s => s !== size) 
      });
    } else {
      setFormData({ 
        ...formData, 
        sizes: [...currentSizes, size].sort() 
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate
      if (!formData.name || !formData.price || !formData.description) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (formData.sizes.length === 0) {
        toast.error('Select at least one size');
        return;
      }

      // Filter out empty image URLs
      const filteredImages = formData.image.filter(url => url.trim() !== '');
      
      if (filteredImages.length === 0) {
        toast.error('Add at least one image URL');
        return;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price as string),
        category: formData.category,
        subCategory: formData.subCategory,
        sizes: formData.sizes,
        bestseller: formData.bestseller,
        image: filteredImages,
        date: product?.date || Date.now(),
      };

      let error;

      if (product) {
        // Update existing product
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('_id', product._id);
        error = updateError;
      } else {
        // Create new product
        const { error: insertError } = await supabase
          .from('products')
          .insert([productData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(product ? 'Product updated!' : 'Product created!');
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
      
    } catch (error: any) {
      console.error('Product save error:', error);
      toast.error(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black tracking-tighter">
            {product ? 'EDIT PRODUCT' : 'NEW PRODUCT'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white transition-all"
                  placeholder="e.g., Classic Cotton Tee"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white transition-all resize-none"
                  placeholder="Product description..."
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
                  Price *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white transition-all"
                  placeholder="29.99"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="capitalize">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
                  Sub Category
                </label>
                <select
                  value={formData.subCategory}
                  onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white transition-all"
                >
                  {subCategories.map(sub => (
                    <option key={sub} value={sub} className="capitalize">{sub}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Available Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    formData.sizes.includes(size)
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Product Images (URLs)
            </h3>
            
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="url"
                  value={formData.image[index] || ''}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black focus:bg-white transition-all"
                  placeholder={`Image URL ${index + 1}${index === 0 ? ' *' : ''}`}
                />
                {formData.image[index] && (
                  <div className="relative group">
                    <img 
                      src={formData.image[index]} 
                      alt="preview"
                      className="h-14 w-14 object-cover rounded-xl border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/56x56?text=Error';
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bestseller Toggle */}
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.bestseller}
                onChange={(e) => setFormData({...formData, bestseller: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
            </label>
            <div>
              <p className="font-bold">Mark as Bestseller</p>
              <p className="text-xs text-gray-500">Featured products will show a badge</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  {product ? 'Update Product' : 'Create Product'}
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-5 border-2 border-gray-200 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-black transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;