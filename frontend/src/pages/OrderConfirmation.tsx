// pages/OrderConfirmation.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, Home } from 'lucide-react';

export const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, total, shippingInfo } = location.state || {};

  // Generate random order number if not provided
  const orderNumber = orderId || 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  
  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-sm text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-black mb-4 tracking-tighter">THANK YOU!</h1>
          <p className="text-gray-500 mb-8 text-lg">Your order has been confirmed</p>
          
          {/* Order Number */}
          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <p className="text-sm text-gray-500 mb-2">Order Number</p>
            <p className="text-2xl font-black font-mono tracking-wider">{orderNumber}</p>
          </div>
          
          {/* Order Timeline */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider">Processing</p>
              <p className="text-[10px] text-gray-500 mt-1">Estimated 1-2 days</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider">Shipped</p>
              <p className="text-[10px] text-gray-500 mt-1">Tracking pending</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider">Delivery</p>
              <p className="text-[10px] text-gray-500 mt-1">3-5 business days</p>
            </div>
          </div>
          
          {/* Shipping Info */}
          {shippingInfo && (
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 text-left">
              <h3 className="font-bold text-xs uppercase tracking-wider mb-3">Shipping To</h3>
              <p className="text-sm text-gray-700">{shippingInfo.fullName}</p>
              <p className="text-sm text-gray-500">{shippingInfo.address}</p>
              <p className="text-sm text-gray-500">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all inline-flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              CONTINUE SHOPPING
            </Link>
            <button
              onClick={() => window.print()}
              className="border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-black transition-all"
            >
              PRINT RECEIPT
            </button>
          </div>
          
          {/* Email Confirmation */}
          <p className="text-xs text-gray-400 mt-8">
            A confirmation email has been sent to {shippingInfo?.email || 'your email'}
          </p>
        </div>
      </div>
    </div>
  );
};