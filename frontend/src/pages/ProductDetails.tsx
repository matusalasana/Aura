// pages/ProductDetails.tsx
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
  Share2
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { addToCart, isAdding } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Debug: Log what we're receiving
  console.log('ProductId from URL:', productId);
  console.log('All products from Supabase:', products);
  console.log('Products type:', typeof products);
  console.log('Is products array?', Array.isArray(products));

  useEffect(() => {
    if (products && productId) {
      console.log('Searching for product with ID:', productId);
      
      // Try different matching strategies
      const foundProduct = products.find((p: any) => {
        console.log('Comparing:', String(p._id), 'vs', String(productId));
        return String(p._id) === String(productId);
      });
      
      console.log('Found product:', foundProduct);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(0);
        setSelectedSize(foundProduct.sizes?.[0] || '');
      } else {
        console.error('Product not found with ID:', productId);
        toast.error('Product not found');
        navigate('/');
      }
    }
  }, [productId, products, navigate]);

  // Debug: Check if product is set
  console.log('Current product state:', product);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart({ productId: product._id, size: selectedSize });
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size first');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({ productId: product._id, size: selectedSize });
    }
    
    setTimeout(() => {
      navigate('/cart');
    }, 100);
  };

  // Loading state
  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative flex items-center justify-center mb-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold tracking-widest">AURA</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 animate-pulse">Loading product details...</p>
        </div>
      </div>
    );
  }

  // If product not found after loading
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Debug: Render product info
  console.log('Rendering product:', product);

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 group">
              {product.image && product.image.length > 0 ? (
                <img 
                  src={product.image[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    console.error('Image failed to load:', product.image[selectedImage]);
                    e.currentTarget.src = 'https://via.placeholder.com/400x500?text=Image+Not+Found';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">No image available</p>
                </div>
              )}
              
              {/* Image Navigation */}
              {product.image && product.image.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setSelectedImage(prev => Math.min(product.image.length - 1, prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Bestseller Badge */}
              {product.bestseller && (
                <div className="absolute top-4 left-4 bg-amber-400 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Star className="h-3 w-3 fill-white" />
                  Bestseller
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.image && product.image.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.image.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-black scale-105' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Error';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6 lg:space-y-8">
            {/* Category & Title */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                  {product.category || 'Category'}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {product.subCategory || 'Subcategory'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                {product.name || 'Product Name'}
              </h1>
              
              <div className="mt-4 flex items-baseline gap-4">
                <span className="text-4xl font-black text-gray-900">
                  ${product.price ? product.price.toFixed(2) : '0.00'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description || 'No description available'}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider">Select Size</h3>
                  <button className="text-xs text-indigo-600 hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[56px] h-14 rounded-xl border-2 font-bold text-sm transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-gray-400 text-gray-700 hover:scale-105'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-black text-white py-5 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {isAdding ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 transition-transform group-hover:-rotate-12" />
                    Add to Cart — ${product.price ? product.price.toFixed(2) : '0.00'}
                  </>
                )}
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                Buy Now
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 py-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 ${
                  isWishlisted 
                    ? 'border-red-500 bg-red-50 text-red-500' 
                    : 'border-gray-200 hover:border-gray-400 text-gray-700'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                {isWishlisted ? 'Saved' : 'Save for Later'}
              </button>
              <button className="flex-1 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-400 font-medium transition-all flex items-center justify-center gap-2 text-gray-700">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Truck className="h-5 w-5 mx-auto text-gray-400" />
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Free Shipping</p>
                  <p className="text-[10px] text-gray-500">On orders $50+</p>
                </div>
                <div className="space-y-2">
                  <ShieldCheck className="h-5 w-5 mx-auto text-gray-400" />
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Secure</p>
                  <p className="text-[10px] text-gray-500">SSL Encryption</p>
                </div>
                <div className="space-y-2">
                  <svg className="h-5 w-5 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Easy Returns</p>
                  <p className="text-[10px] text-gray-500">30-day policy</p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-tighter pt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};