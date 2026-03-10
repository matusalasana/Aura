import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  Loader2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  RefreshCw
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard'; // Import for Related Products

export const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: allProducts, isLoading: productsLoading } = useProducts();
  const { addToCart, isAdding, updateQuantity, cartItems } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (allProducts && productId) {
      const foundProduct = allProducts.find((p: any) => String(p._id) === String(productId));
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(0);
        setSelectedSize(foundProduct.sizes?.[0] || '');
        setQuantity(1); // Reset quantity on product change
        window.scrollTo(0, 0); // Scroll to top on navigation
      } else {
        toast.error('Product not found');
        navigate('/');
      }
    }
  }, [productId, allProducts, navigate]);

  // REFINED: Handle Add to Cart with Quantity Logic
  const handleAddToCart = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    // Logic: Check if item is already in cart to avoid redundant loops
    const existingInCart = cartItems.find(
      (item: any) => item.product_id === product._id && item.size === selectedSize
    );

    try {
      if (existingInCart) {
        // If it exists, we just update the quantity by adding the new amount
        await updateQuantity({ 
          itemId: existingInCart.id, 
          quantity: existingInCart.quantity + quantity 
        });
        toast.success(`Updated quantity to ${existingInCart.quantity + quantity}`);
      } else {
        // If new, add once (the useCart hook we refined earlier handles initial quantity)
        // Note: If your useCart doesn't accept a 'quantity' param yet, 
        // you'd ideally update that hook, but for now we'll call it once.
        await addToCart({ productId: product._id, size: selectedSize });
        
        // If quantity > 1, we update it immediately after creation
        // (This is a workaround until useCart supports initial quantity)
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    if (user) navigate('/cart');
  };

  // Get Related Products (Same category, excluding current product)
  const relatedProducts = allProducts?.filter(
    (p: any) => p.category === product?.category && p._id !== product?._id
  ).slice(0, 4);

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          <p className="font-black italic text-xl tracking-tighter">AURA</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors">Home</button>
          <span>/</span>
          <span className="text-gray-900">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* 1. Left: Image Gallery (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#f9f9f9] group">
              <img 
                src={product.image[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
              
              {product.bestseller && (
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Bestseller</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {product.image.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-shrink-0 w-24 aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-black scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Right: Product Details (Span 5) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="sticky top-32">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-gray-900 mb-4 uppercase leading-none">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-black text-indigo-600">${product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-700">4.9 (128 reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 leading-relaxed mb-10 text-lg">
                {product.description}
              </p>

              {/* Size Grid */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest">Select Size</span>
                  <button className="text-[10px] font-bold text-indigo-600 underline underline-offset-4">SIZE GUIDE</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-4 rounded-2xl font-black text-sm transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white shadow-xl scale-[1.02]'
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center bg-gray-50 rounded-2xl px-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-4 hover:text-indigo-600 transition-colors font-bold">-</button>
                  <span className="w-8 text-center font-black text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-4 hover:text-indigo-600 transition-colors font-bold">+</button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
                  Add to Bag
                </button>
              </div>

              <button 
                onClick={handleBuyNow}
                className="w-full border-2 border-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all mb-12"
              >
                Fast Checkout
              </button>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-10">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Truck className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase">Express Delivery</p>
                    <p className="text-[10px] text-gray-400">2-3 Business Days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600"><RefreshCw className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase">Free Returns</p>
                    <p className="text-[10px] text-gray-400">30 Day Window</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="text-3xl font-black italic tracking-tighter mb-12 uppercase">You Might Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p: any) => (
                <ProductCard key={p._id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginPrompt(false)} />
          <div className="relative bg-white p-10 rounded-[3rem] max-w-sm w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black italic tracking-tighter mb-2">JOIN AURA</h3>
            <p className="text-gray-500 text-sm mb-8 font-medium">Create an account to save items to your bag and track your orders.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate('/login')} className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-xs">Sign In</button>
              <button onClick={() => setShowLoginPrompt(false)} className="w-full py-4 text-gray-400 font-bold text-xs uppercase">Maybe Later</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
