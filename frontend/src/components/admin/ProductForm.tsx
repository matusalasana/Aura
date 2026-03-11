import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, Plus, Trash2, Image as ImageIcon, DollarSign, Layers, AlignLeft, Upload, CloudUpload, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { createProduct, updateProduct, isSubmitting } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'men',
    sub_category: 'topwear',
    sizes: [] as string[],
    bestseller: false,
    image: [] as string[],
  });

  const categories = ['men', 'women', 'kids'];
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || 'men',
        sub_category: product.sub_category || 'topwear',
        sizes: product.sizes || [],
        bestseller: product.bestseller || false,
        image: product.image || [],
      });
    }
  }, [product]);

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData(prev => ({ ...prev, image: [...prev.image, imageUrlInput.trim()] }));
    setImageUrlInput('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const promise = new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
        });
        reader.readAsDataURL(files[i]);
        newImages.push(await promise);
      }
      setFormData(prev => ({ ...prev, image: [...prev.image, ...newImages] }));
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    if (confirmDeleteIndex === index) {
      setFormData({ ...formData, image: formData.image.filter((_, i) => i !== index) });
      setConfirmDeleteIndex(null);
    } else {
      setConfirmDeleteIndex(index);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Requirement Validation
    if (formData.sizes.length === 0) {
      alert("Please select at least one available size.");
      return;
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (product?._id) {
      updateProduct({ id: product._id, data: payload }, { onSuccess: onClose });
    } else {
      createProduct(payload, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[92vh] border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-2xl font-black tracking-tighter text-black uppercase">
            {product ? 'Edit Item' : 'New Listing'} <span className="text-indigo-600">.</span>
          </h2>
          <button onClick={onClose} className="p-3 hover:bg-black hover:text-white rounded-2xl transition-all"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* Media Section */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">
              <ImageIcon size={14} /> Product Media
            </label>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" placeholder="Paste image URL..."
                className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-indigo-500 outline-none text-sm"
                value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)}
              />
              <button type="button" onClick={handleAddImageUrl} className="px-6 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase hover:bg-indigo-600 transition-colors">Add</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {formData.image.map((url, index) => (
                <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50">
                  <img src={url} alt="Product" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    {confirmDeleteIndex === index ? (
                      <div className="flex gap-2 animate-in zoom-in-95 duration-200">
                        <button type="button" onClick={() => removeImage(index)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={14} /></button>
                        <button type="button" onClick={() => setConfirmDeleteIndex(null)} className="p-2 bg-white text-black rounded-lg"><X size={14} /></button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setConfirmDeleteIndex(index)} className="p-3 bg-white text-red-500 rounded-xl"><Trash2 size={18} /></button>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all">
                {uploading ? <Loader2 className="animate-spin text-indigo-500" /> : <CloudUpload className="text-gray-400" />}
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple accept="image/*" className="hidden" />
          </div>

          {/* Available Sizes - REQUIRED */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">
              <CheckCircle2 size={14} /> Available Sizes <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {allSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                    formData.sizes.includes(size) 
                    ? 'bg-black text-white border-black shadow-lg scale-105' 
                    : 'bg-gray-50 text-gray-400 border-transparent hover:border-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {formData.sizes.length === 0 && (
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-tight ml-1">At least one size must be selected</p>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Product Name</label>
              <input className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-black transition-all font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Price ($)</label>
              <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-black transition-all font-bold" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Category</label>
              <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-black transition-all font-bold appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          <button 
            type="submit" disabled={isSubmitting || uploading}
            className="group w-full relative bg-black text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:shadow-xl disabled:opacity-50"
          >
            <span className="relative z-10">{isSubmitting ? 'Processing...' : 'Save Product'}</span>
            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
