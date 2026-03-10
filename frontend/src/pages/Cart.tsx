// pages/Cart.tsx
import React from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cartItems, isLoading, updateQuantity, removeFromCart, cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cartItems.reduce((acc: number, item: any) => {
    return acc + (item.products?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity({ itemId, quantity: newQuantity });
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Navigate to checkout page
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4">
        <div className="bg-gray-50 p-8 rounded-full">
          <ShoppingBag className="h-16 w-16 text-gray-300" />
        </div>
        <h2 className="text-2xl font-black tracking-tighter text-center">YOUR CART IS EMPTY</h2>
        <p className="text-gray-500 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Browse our collection and find something special!
        </p>
        <Link 
          to="/" 
          className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all inline-flex items-center gap-2 group"
        >
          START SHOPPING
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black tracking-tighter italic">YOUR BAG</h1>
          <span className="text-sm text-gray-500">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => {
              const product = item.products;
              if (!product) return null;

              return (
                <div 
                  key={item.id} 
                  className="flex gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product._id}`} className="flex-shrink-0">
                    <img 
                      src={product.image?.[0] || 'https://via.placeholder.com/100x120'} 
                      alt={product.name}
                      className="h-24 w-20 sm:h-32 sm:w-24 object-cover rounded-2xl bg-gray-100 hover:scale-105 transition-transform"
                    />
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <Link to={`/product/${product._id}`}>
                            <h3 className="font-bold text-gray-900 hover:underline text-sm sm:text-base">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">${product.price} each</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
                        Size: <span className="text-gray-700">{item.size}</span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1.5 hover:text-indigo-600 disabled:text-gray-300"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold text-sm w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1.5 hover:text-indigo-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-black text-base sm:text-lg">
                        ${(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue Shopping Link */}
            <div className="pt-4">
              <Link 
                to="/" 
                className="text-sm text-gray-500 hover:text-black flex items-center gap-2 w-fit group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white p-6 sm:p-8 rounded-[2.5rem] sticky top-28 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 tracking-tight">ORDER SUMMARY</h2>
              
              <div className="space-y-3 text-sm border-b border-white/10 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-400 font-bold">FREE</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6 items-end">
                <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black tracking-tighter">${total.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 group"
              >
                PROCEED TO CHECKOUT
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Accepted Payment Methods */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-[10px] text-gray-500 text-center mb-3">We accept</p>
                <div className="flex justify-center gap-3">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-6" />
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-6" />
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazon/amazon-original.svg" alt="Amazon Pay" className="h-6" />
                </div>
              </div>

              {/* Free Shipping Notice */}
              {subtotal < 50 && (
                <div className="mt-4 bg-white/10 p-3 rounded-xl text-xs">
                  <p className="text-center">
                    Add ${(50 - subtotal).toFixed(2)} more for 
                    <span className="text-green-400 font-bold ml-1">FREE SHIPPING</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};