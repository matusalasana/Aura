// components/LoadingSpinner.tsx
import React from 'react';

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafafa]">
    <div className="relative group">
      {/* Outer Glow / Aura Pulse */}
      <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-2xl animate-pulse scale-150" />
      
      {/* The Spinner Ring */}
      <div className="relative h-20 w-20">
        {/* Static Background Track */}
        <div className="absolute inset-0 rounded-full border-[1px] border-slate-200" />
        
        {/* Animated Accent Ring */}
        <div className="absolute inset-0 rounded-full border-t-[1px] border-indigo-600 animate-[spin_0.8s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
        
        {/* Inner Secondary Ring */}
        <div className="absolute inset-2 rounded-full border-b-[1px] border-slate-900/20 animate-[spin_1.2s_linear_infinite_reverse]" />
      </div>

      {/* Brand Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black tracking-[0.3em] text-slate-900 animate-pulse">
          AURA
        </span>
      </div>
    </div>
    
    {/* Minimalist Status Text */}
    <div className="mt-8 space-y-1 text-center">
      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
        Initializing System
      </p>
      <div className="flex justify-center gap-1">
        <div className="h-1 w-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
        <div className="h-1 w-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
        <div className="h-1 w-1 rounded-full bg-indigo-500 animate-bounce" />
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
