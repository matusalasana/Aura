// pages/OrderConfirmation.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Package, Truck, Calendar, Home, Printer, Share2 } from 'lucide-react';

export const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, total, shippingInfo } = location.state || {};

  // Premium Fallback ID
  const orderNumber = orderId || 'AURA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-10 md:p-16 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
          
          {/* Subtle Background Aura */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]" />
          
          {/* Success Status */}
          <div className="relative inline-flex items-center justify-center mb-10">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-20 h-20 bg-slate-900 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
              <Check className="h-10 w-10 text-white -rotate-12" />
            </div>
          </div>
          
          <header className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2">Acquisition Complete</p>
            <h1 className="text-5xl font-black tracking-tighter text-slate-950 uppercase italic">Welcome to Aura<span className="text-indigo-600">.</span></h1>
            <p className="text-slate-500 mt-4 font-medium">Your artifacts are being prepared for dispatch.</p>
          </header>
          
          {/* Digital Receipt Card */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] mb-12 group transition-all hover:bg-slate-100/50">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Order Authentication ID</span>
              <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 group-hover:scale-105 transition-transform duration-500">
                {orderNumber}
              </p>
            </div>
          </div>
          
          {/* Logistic Timeline */}
          <div className="relative flex justify-between mb-16 px-4">
            {/* Connecting Line */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[80%] h-px bg-slate-100 z-0" />
            
            {[
              { icon: Package, label: 'Secured', desc: 'Processing', active: true },
              { icon: Truck, label: 'Transit', desc: 'Pending', active: false },
              { icon: Calendar, label: 'Arrival', desc: '3-5 Days', active: false }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  step.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border border-slate-100 text-slate-300'
                }`}>
                  <step.icon size={18} />
                </div>
                <p className={`text-[10px] font-black uppercase tracking-widest mt-4 ${step.active ? 'text-slate-900' : 'text-slate-300'}`}>
                  {step.label}
                </p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{step.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Delivery Coordinates */}
          {shippingInfo && (
            <div className="border-t border-slate-100 pt-10 mb-12 text-left grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4">Destination</h3>
                <div className="space-y-1">
                  <p className="text-sm font-black text-slate-900">{shippingInfo.fullName}</p>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-start md:items-end">
                <div className="text-right">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Total Paid</h3>
                  <p className="text-3xl font-black text-slate-950 italic">${total?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Interactive Footer */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 border-t border-slate-50">
            <Link
              to="/"
              className="w-full sm:w-auto bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95"
            >
              <Home size={14} /> Back to Catalog
            </Link>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => window.print()}
                className="flex-1 sm:flex-none p-5 rounded-2xl border border-slate-100 text-slate-900 hover:bg-slate-50 transition-all active:scale-90"
                title="Print Receipt"
              >
                <Printer size={16} />
              </button>
              <button
                className="flex-1 sm:flex-none p-5 rounded-2xl border border-slate-100 text-slate-900 hover:bg-slate-50 transition-all active:scale-90"
                title="Share Status"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
          
          <p className="text-[10px] font-bold text-slate-400 mt-10 uppercase tracking-widest">
            Dispatch notification sent to <span className="text-slate-900">{shippingInfo?.email || 'authenticated address'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
