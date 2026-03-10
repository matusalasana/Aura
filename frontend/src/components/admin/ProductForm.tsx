import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, Loader2 } from 'lucide-react';
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
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

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
      const filteredImages = formData.image.filter((url: string) => url.trim() !== '');
      
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
        _id: product?._id || Math.random().toString(36).substring(2, 10)
      };

      let error;

      if (product) {
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('_id', product._id);
        error = updateError;
      } else {
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
      toast.error(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
      <div className="relative bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-tighter">
            {product ? 'EDIT PRODUCT' : 'NEW PRODUCT'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div>
            <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="capitalize">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
              Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    formData.sizes.includes(size)
                      ? 'bg-black text-white'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
              Image URLs
            </label>
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="url"
                value={formData.image[index] || ''}
                onChange={(e) => {
                  const newImages = [...formData.image];
                  newImages[index] = e.target.value;
                  setFormData({...formData, image: newImages});
                }}
                className="w-full mb-2 px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black"
                placeholder={`Image URL ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="bestseller"
              checked={formData.bestseller}
              onChange={(e) => setFormData({...formData, bestseller: e.target.checked})}
              className="w-4 h-4"
            />
            <label htmlFor="bestseller" className="font-bold">
              Mark as Bestseller
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white py-5 rounded-2xl font-bold hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 
                (product ? 'Update Product' : 'Create Product')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-5 border-2 border-gray-200 rounded-2xl font-bold hover:border-black"
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