// pages/Checkout.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';
import { 
  ArrowLeft, 
  Truck, 
  CreditCard, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Loader2, 
  CheckCircle2,
  Package,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Checkout = () => {
  const { cartItems, isLoading: cartLoading } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [isPlacing, setIsPlacing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  // Set email from user when available
  useEffect(() => {
    if (user?.email) {
      setShippingInfo(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  // Redirect if cart is empty after loading
  useEffect(() => {
    if (!cartLoading && !authLoading && cartItems.length === 0) {
      toast.info('Your cart is empty');
      navigate('/cart');
    }
  }, [cartItems, cartLoading, authLoading, navigate]);

  // Calculate totals with safe defaults
  const subtotal = cartItems.reduce((acc: number, item: any) => {
    const price = item.products?.price || 0;
    return acc + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    // Validate shipping info
    const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'phone'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all shipping information');
      setStep(1);
      return;
    }

    setIsPlacing(true);

    try {
      console.log('Creating order for user:', user.id);
      
      // 1. Create the Order Record
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount: total,
          shipping_address: shippingInfo,
          payment_method: paymentMethod,
          status: 'processing'
        }])
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw orderError;
      }

      console.log('Order created:', order);

      // 2. Move items from Cart to Order Items
      const orderItems = cartItems.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
        price_at_purchase: item.products?.price || 0
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items error:', itemsError);
        throw itemsError;
      }

      console.log('Order items created:', orderItems);

      // 3. Clear the User's Cart
      const { error: clearError } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id);

      if (clearError) {
        console.error('Cart clear error:', clearError);
        // Don't throw here - order is already created
      }

      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { 
        state: { 
          orderId: order.id, 
          total,
          shippingInfo 
        } 
      });
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to process order. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  // Loading state
  if (authLoading || cartLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc]">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Preparing checkout...</p>
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc]">
        <Package className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-black mb-2">YOUR CART IS EMPTY</h2>
        <p className="text-gray-500 mb-6">Add some items before checking out</p>
        <Link 
          to="/" 
          className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Checkout Flow */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-all">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase">Checkout</h1>
            </div>

            {/* Stepper Dots */}
            <div className="flex gap-2 mb-10">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    step >= s ? 'bg-black' : 'bg-gray-200'
                  }`} 
                />
              ))}
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  setStep(2); 
                }} 
                className="space-y-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50"
              >
                <h2 className="text-lg font-bold flex items-center gap-2 mb-4 uppercase tracking-tighter italic">
                  <Truck className="h-5 w-5" />
                  1. Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 text-sm font-bold focus:bg-white border-2 border-transparent focus:border-black transition-all" 
                      value={shippingInfo.fullName} 
                      onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} 
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 text-sm font-bold focus:bg-white border-2 border-transparent focus:border-black transition-all" 
                      value={shippingInfo.email} 
                      onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} 
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      Phone *
                    </label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 text-sm font-bold focus:bg-white border-2 border-transparent focus:border-black transition-all" 
                      value={shippingInfo.phone} 
                      onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} 
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      Address *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 text-sm font-bold focus:bg-white border-2 border-transparent focus:border-black transition-all" 
                      value={shippingInfo.address} 
                      onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} 
                      placeholder="123 Main St"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      City *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 text-sm font-bold focus:bg-white border-2 border-transparent focus:border-black transition-all" 
                      value={shippingInfo.city} 
                      onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} 
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      State *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 text-sm font-bold focus:bg-white border-2 border-transparent focus:border-black transition-all" 
                      value={shippingInfo.state} 
                      onChange={e => setShippingInfo({...shippingInfo, state: e.target.value})} 
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      ZIP Code *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 text-sm font-bold focus:bg-white border-2 border-transparent focus:border-black transition-all" 
                      value={shippingInfo.zipCode} 
                      onChange={e => setShippingInfo({...shippingInfo, zipCode: e.target.value})} 
                      placeholder="10001"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      Country
                    </label>
                    <select 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 text-sm font-bold focus:bg-white border-2 border-transparent focus:border-black transition-all"
                      value={shippingInfo.country}
                      onChange={e => setShippingInfo({...shippingInfo, country: e.target.value})}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                <h2 className="text-lg font-bold flex items-center gap-2 mb-4 uppercase tracking-tighter italic">
                  <CreditCard className="h-5 w-5" />
                  2. Payment Method
                </h2>
                
                <div className="space-y-3">
                  {[
                    { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
                    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                    { id: 'apple', name: 'Apple Pay', icon: '🍎' }
                  ].map((method) => (
                    <label 
                      key={method.id} 
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id 
                          ? 'border-black bg-black/5' 
                          : 'border-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <span className="font-bold text-xs uppercase tracking-widest">
                        {method.icon} {method.name}
                      </span>
                      <input 
                        type="radio" 
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id} 
                        onChange={() => setPaymentMethod(method.id)} 
                        className="accent-black h-5 w-5" 
                      />
                    </label>
                  ))}
                </div>

                <button 
                  onClick={() => setStep(3)} 
                  className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all"
                >
                  Review Order
                </button>

                <button 
                  onClick={() => setStep(1)} 
                  className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-black transition-all"
                >
                  ← Back to Shipping
                </button>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                <h2 className="text-lg font-bold flex items-center gap-2 mb-4 uppercase tracking-tighter italic">
                  <CheckCircle2 className="h-5 w-5" />
                  3. Review Order
                </h2>
                
                <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Shipping To</p>
                    <p className="text-sm font-bold">{shippingInfo.fullName}</p>
                    <p className="text-sm text-gray-600">{shippingInfo.address}</p>
                    <p className="text-sm text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    <p className="text-sm text-gray-600">{shippingInfo.country}</p>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                    <p className="text-sm text-gray-600">{shippingInfo.email}</p>
                    <p className="text-sm text-gray-600">{shippingInfo.phone}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
                    <p className="text-sm text-gray-600 capitalize">{paymentMethod}</p>
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isPlacing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )}
                  Complete Purchase — ${total.toFixed(2)}
                </button>

                <button 
                  onClick={() => setStep(2)} 
                  className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-black transition-all"
                >
                  ← Back to Payment
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-96">
            <div className="bg-black text-white p-8 rounded-[3rem] sticky top-32">
              <h2 className="text-xl font-black italic tracking-tighter mb-8 uppercase">Order Summary</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-hide mb-8">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="h-16 w-12 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                      {item.products?.image?.[0] ? (
                        <img 
                          src={item.products.image[0]} 
                          className="w-full h-full object-cover" 
                          alt={item.products?.name || 'Product'}
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/48x64?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                          <Package className="h-4 w-4 text-zinc-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase truncate">
                        {item.products?.name || 'Loading...'}
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold">
                        SIZE: {item.size} • QTY: {item.quantity}
                      </p>
                    </div>
                    <p className="text-[10px] font-black">
                      ${((item.products?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl pt-4 font-black italic tracking-tighter text-white border-t border-white/10 mt-4">
                  <span>Total</span>
                  <span className="text-indigo-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 text-[8px] text-gray-500 uppercase tracking-widest">
                  <AlertCircle className="h-3 w-3" />
                  Secure Checkout - SSL Encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};