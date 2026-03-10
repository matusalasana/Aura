// pages/Checkout.tsx
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, Truck, CreditCard, MapPin, User, Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Checkout = () => {
  const { cartItems, isLoading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  // Redirect if cart is empty
  React.useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
    }
  }, [cartItems, isLoading, navigate]);

  const subtotal = cartItems.reduce((acc: number, item: any) => {
    return acc + (item.products?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    navigate('/order-confirmation');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/cart" className="text-gray-500 hover:text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-black tracking-tighter">CHECKOUT</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex items-center ${step >= 1 ? 'text-black' : 'text-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 1 ? 'bg-black text-white' : 'bg-gray-100'
            }`}>1</div>
            <span className="ml-2 text-sm font-medium">Shipping</span>
          </div>
          <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`} />
          <div className={`flex items-center ${step >= 2 ? 'text-black' : 'text-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 2 ? 'bg-black text-white' : 'bg-gray-100'
            }`}>2</div>
            <span className="ml-2 text-sm font-medium">Payment</span>
          </div>
          <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-black' : 'bg-gray-200'}`} />
          <div className={`flex items-center ${step >= 3 ? 'text-black' : 'text-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 3 ? 'bg-black text-white' : 'bg-gray-100'
            }`}>3</div>
            <span className="ml-2 text-sm font-medium">Confirm</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </h2>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                          placeholder="123 Main St"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                        placeholder="New York"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                        placeholder="NY"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                        placeholder="10001"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        Country
                      </label>
                      <select
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all mt-6"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div>
                        <span className="font-bold">Credit / Debit Card</span>
                        <div className="flex gap-2 mt-2">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-6" />
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-6" />
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="font-bold">PayPal</span>
                    </label>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="apple"
                        checked={paymentMethod === 'apple'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="font-bold">Apple Pay</span>
                    </label>
                  </div>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all mt-4"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm">
                <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">Shipping To</h3>
                    <p className="text-gray-600">
                      {shippingInfo.fullName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                      {shippingInfo.country}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Contact</h3>
                    <p className="text-gray-600">{shippingInfo.email}<br />{shippingInfo.phone}</p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Payment Method</h3>
                    <p className="text-gray-600 capitalize">{paymentMethod}</p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-bold mb-3">Items ({cartItems.length})</h3>
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm mb-2">
                        <span>{item.products?.name} (x{item.quantity})</span>
                        <span>${(item.products?.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                  >
                    Place Order — ${total.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white p-6 rounded-[2rem] sticky top-28">
              <h3 className="font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-400">{item.products?.name} (x{item.quantity})</span>
                    <span>${(item.products?.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-400">FREE</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};