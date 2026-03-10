// components/LoadingSpinner.tsx
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold tracking-widest">AURA</span>
      </div>
    </div>
  </div>
)