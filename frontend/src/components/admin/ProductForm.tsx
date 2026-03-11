import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Loader2, Plus, Trash2, Image as ImageIcon, 
  AlignLeft, CloudUpload, CheckCircle2, Star, 
  Check, Tag, ShoppingBag, Hash 
} from 'lucide-react';
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
    if (formData.sizes.length === 0) {
      alert("Please select at least one available size.");
      return;
    }
    const payload = { ...formData, price: parseFloat(formData.price) };
    if (product?._id) {
      updateProduct({ id: product._id, data: payload }, { onSuccess: onClose });
    } else {
      createProduct(payload, { onSuccess: onClose });
    }
  };

  const Label = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2 ml-1">
      {Icon && <Icon size={12} className="text-slate-300" />}
      {children}
    </label>
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] border border-white/20 overflow-hidden">
        
        {/* Header - Fixed */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {product ? 'Edit Product' : 'Create New Item'}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Fill in the details to update your inventory.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          
          {/* Media Section */}
          <section className="space-y-4">
            <Label icon={ImageIcon}>Product Gallery</Label>
            
            <div className="flex gap-2 group">
              <input 
                type="text" 
                placeholder="Paste external image link..."
                className="flex-1 px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-black focus:ring-4 focus:ring-slate-100 outline-none text-sm transition-all"
                value={imageUrlInput} 
                onChange={(e) => setImageUrlInput(e.target.value)}
              />
              <button 
                type="button" 
                onClick={handleAddImageUrl} 
                className="px-6 bg-slate-100 hover:bg-black hover:text-white text-slate-600 rounded-2xl font-bold text-[11px] uppercase tracking-wider transition-all"
              >
                Link
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {formData.image.map((url, index) => (
                <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                  <img src={url} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button" 
                      onClick={() => removeImage(index)} 
                      className={`p-2 rounded-xl transition-all shadow-lg ${confirmDeleteIndex === index ? 'bg-red-500 text-white' : 'bg-white text-red-500 hover:scale-110'}`}
                    >
                      {confirmDeleteIndex === index ? <Trash2 size={16} className="animate-pulse" /> : <X size={16} />}
                    </button>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()} 
                disabled={uploading} 
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-black hover:bg-slate-50 transition-all text-slate-400 hover:text-black"
              >
                {uploading ? <Loader2 className="animate-spin" /> : <CloudUpload size={24} />}
                <span className="text-[10px] font-bold uppercase tracking-tighter">Upload</span>
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple accept="image/*" className="hidden" />
          </section>

          {/* Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label icon={Tag}>Product Name</Label>
              <input 
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-black focus:ring-4 focus:ring-slate-100 outline-none font-medium transition-all" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g. Premium Oversized Hoodie"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label icon={Hash}>Price ($)</Label>
              <input 
                type="number" 
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-black focus:ring-4 focus:ring-slate-100 outline-none font-bold transition-all" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
                placeholder="0.00"
                required 
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label icon={AlignLeft}>Product Story</Label>
            <textarea 
              required rows={4} 
              placeholder="Describe the fit, material, and style..."
              className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-black focus:ring-4 focus:ring-slate-100 outline-none font-medium transition-all resize-none"
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Sizes */}
            <div className="space-y-4">
              <Label icon={CheckCircle2}>Available Sizes</Label>
              <div className="flex flex-wrap gap-2.5">
                {allSizes.map(size => (
                  <button
                    key={size} type="button" onClick={() => toggleSize(size)}
                    className={`h-12 min-w-[3rem] px-3 flex items-center justify-center rounded-xl font-bold text-xs transition-all border-2 ${
                      formData.sizes.includes(size) 
                        ? 'bg-black text-white border-black scale-105 shadow-lg shadow-black/10' 
                        : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bestseller Toggle */}
            <div className="space-y-4">
              <Label icon={Star}>Highlighting</Label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, bestseller: !prev.bestseller }))}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all group ${
                  formData.bestseller 
                  ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm' 
                  : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  formData.bestseller ? 'bg-amber-500 border-amber-500 rotate-0' : 'border-slate-300 -rotate-12'
                }`}>
                  {formData.bestseller && <Check size={14} className="text-white stroke-[4]" />}
                </div>
                <div className="text-left">
                  <span className="block text-xs font-black uppercase tracking-wider">Bestseller Status</span>
                  <span className="text-[10px] opacity-70">Featured in homepage collections</span>
                </div>
              </button>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <Label icon={ShoppingBag}>Collection</Label>
            <div className="relative">
              <select 
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 focus:border-black focus:ring-4 focus:ring-slate-100 outline-none font-bold appearance-none transition-all cursor-pointer" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Plus size={16} className="rotate-45" />
              </div>
            </div>
          </div>
        </form>

        {/* Footer - Fixed */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-4 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isSubmitting || uploading}
            className="flex-[2] relative bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] overflow-hidden transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>Processing</span>
              </div>
            ) : (
              <span>Confirm & Publish</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
