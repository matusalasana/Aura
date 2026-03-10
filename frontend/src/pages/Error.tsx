import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Home, ArrowLeft } from 'lucide-react'

function Error() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-red-50 p-6 rounded-full">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>

        {/* Error Message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for doesn't exist or has been moved to another URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold hover:border-black hover:bg-white transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error