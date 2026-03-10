// pages/OrderConfirmation.tsx
import React from 'react';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrderConfirmation = () => {
  // Generate random order number
  const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  
  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-black mb-2">THANK YOU!</h1>
          <p className="text-gray-500 mb-8">Your order has been confirmed</p>
          
          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <p className="text-sm text-gray-500 mb-2">Order Number</p>
            <p className="text-xl font-bold font-mono">{orderNumber}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <Package className="h-6 w-6 mx-auto mb-2 text-gray-400" />
              <p className="text-xs font-medium">Processing</p>
            </div>
            <div>
              <Truck className="h-6 w-6 mx-auto mb-2 text-gray-400" />
              <p className="text-xs font-medium">Shipped</p>
            </div>
            <div>
              <Calendar className="h-6 w-6 mx-auto mb-2 text-gray-400" />
              <p className="text-xs font-medium">Delivery</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-8">
            We've sent a confirmation email with your order details and tracking information.
          </p>
          
          <Link
            to="/"
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};