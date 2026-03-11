import React, { useState, useEffect } from 'react';
import { X, Loader2, Plus, Trash2 } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { createProduct, updateProduct, isSubmitting } = useAdmin();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'men',
    subCategory: 'topwear',
    sizes: [] as string[],
    bestseller: false,
    image: [''] as string[],
  });

  const categories = ['men', 'women', 'kids'];
  const subCategories = {
    men: ['topwear', 'bottomwear', 'winterwear'],
    women: ['topwear', 'bottomwear', 'winterwear'],
    kids: ['topwear', 'bottomwear', 'winterwear'],
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || 'men',
        subCategory: product.sub_category || 'topwear',
        sizes: product.sizes || [],
        bestseller: product.bestseller || false,
        image: product.image?.length ? product.image : [''],
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      sub_category: formData.subCategory,
      sizes: formData.sizes,
      bestseller: formData.bestseller,
      image: formData.image.filter(url => url.trim() !== ''),
    };

    if (product?._id) {
      updateProduct({ id: product._id, data: payload }, { onSuccess: onClose });
    } else {
      createProduct(payload, { onSuccess: onClose });
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.image];
    newImages[index] = value;
    setFormData({ ...formData, image: newImages });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-black italic uppercase tracking-tighter">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          {/* Product Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Name</label>
            <input 
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-black transition-all"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required 
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Description</label>
            <textarea 
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-24 resize-none border-2 border-transparent focus:border-black"
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Price ($)</label>
              <input 
                type="number" step="0.01" className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</label>
              <select 
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none appearance-none"
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          {/* Image URLs */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Image URLs</label>
            {formData.image.map((url, index) => (
              <div key={index} className="flex gap-2">
                <input 
                  className="flex-1 p-4 bg-gray-50 rounded-2xl outline-none" placeholder="https://..."
                  value={url} onChange={e => handleImageChange(index, e.target.value)}
                />
                {formData.image.length > 1 && (
                  <button type="button" onClick={() => setFormData({...formData, image: formData.image.filter((_, i) => i !== index)})} className="text-red-500 px-2"><Trash2 size={18}/></button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setFormData({...formData, image: [...formData.image, '']})} className="text-xs font-bold flex items-center gap-1 text-gray-500 hover:text-black transition-colors"><Plus size={14}/> Add Image</button>
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
            {product ? 'Update Details' : 'Publish Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
