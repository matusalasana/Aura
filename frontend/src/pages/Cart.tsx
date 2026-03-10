import React from 'react';
import { useCart } from '../hooks/useCart';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cartItems, isLoading, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc: number, item: any) => {
    // Safety check: ensure products exists from the join
    return acc + (item.products?.price || 0) * item.quantity;
  }, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 bg-gray-50 p-10 rounded-full">
          <ShoppingBag className="h-16 w-16 text-gray-300" />
        </div>
        <h2 className="text-3xl font-black italic tracking-tighter mb-2">YOUR BAG IS EMPTY</h2>
        <p className="text-gray-500 mb-8 max-w-xs">Looks like you haven't added anything to your collection yet.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
          EXPLORE SHOP <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black italic tracking-tighter mb-12 uppercase">Your Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex gap-6 items-center p-4 bg-white rounded-3xl border border-gray-100">
                <img 
                  src={item.products?.image?.[0]} 
                  className="h-32 w-24 object-cover rounded-2xl bg-gray-50" 
                  alt={item.products?.name} 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{item.products?.name || "Product Unavailable"}</h3>
                      <p className="text-xs font-bold text-indigo-600 uppercase mt-1">Size: {item.size}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2">
                      <button onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity - 1 })} disabled={item.quantity <= 1}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold tabular-nums w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity + 1 })}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-black text-xl">${((item.products?.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-colors mt-4">
              <ArrowLeft className="h-4 w-4" /> CONTINUE SHOPPING
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-black text-white p-10 rounded-[3rem] sticky top-32 shadow-2xl">
              <h2 className="text-xl font-bold mb-8 tracking-tight">SUMMARY</h2>
              <div className="space-y-4 text-sm mb-8">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-bold">FREE</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-10">
                <span className="text-gray-400 text-xs font-bold">TOTAL</span>
                <span className="text-4xl font-black tracking-tighter italic">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-5 rounded-2xl font-black transition-all active:scale-[0.98]"
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
