import { ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";
import Title from '../../../shared/ui/Title';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Decorative Background Blur */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      
      <div className="container mx-auto flex flex-col items-center px-6 py-16 lg:flex-row lg:py-24">
        
        {/* Left Content */}
        <div className="z-10 w-full text-center lg:w-1/2 lg:text-left">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            ✨ New Season Arrival
          </div>
          
          <Title txt1="Elevate Your" txt2="Everyday Style" />
          
          <p className="mt-6 max-w-lg text-lg text-slate-600 dark:text-slate-400 lg:text-xl">
            Discover curated collections that blend sustainable materials with 
            timeless design. Comfort meets high-fashion.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link to="/collections">
              <button className="rounded-full flex bg-slate-900 px-8 py-4 text-white transition-transform hover:scale-105 dark:bg-white dark:text-black font-bold shadow-lg">
                View our Collections <ChevronRight size={26} />
              </button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-300 dark:border-slate-900" />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-bold text-slate-900 dark:text-white">10k+</span> Happy Customers
            </p>
          </div>
        </div>

        {/* Right Content - Image Composition */}
        <div className="relative mt-16 w-full lg:mt-0 lg:w-1/2">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Main Image Placeholder */}
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-2xl transition-transform duration-500 hover:rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" 
                alt="Model wearing latest fashion"
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Floating UI Card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl p-4 shadow-xl bg-blue-600 sm:-left-12">
              <div className="flex items-center gap-3">
                <div className="animate-pulse">
                  <p className="text-xs">Free Shipping</p>
                  <p className="text-sm font-bold dark:text-white">Orders over 3000 ETB</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
