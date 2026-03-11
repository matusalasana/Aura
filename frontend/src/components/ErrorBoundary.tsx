import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] p-4">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">⚠️</span>
              </div>
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tighter">Oops!</h1>
            <p className="text-gray-600 mb-2 text-lg">Something went wrong</p>
            <p className="text-sm text-gray-400 mb-8 font-mono bg-gray-50 p-4 rounded-2xl">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all inline-flex items-center gap-2"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;