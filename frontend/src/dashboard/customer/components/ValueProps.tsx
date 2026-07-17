import React from 'react';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react'; // Assuming you use lucide-react

const ValueProps: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
      title: "Verified Vendors",
      description: "Every seller is vetted to ensure quality, authenticity, and excellent service."
    },
    {
      icon: <Truck className="w-8 h-8 text-amber-500" />,
      title: "Secure Shipping",
      description: "Reliable tracking and protected deliveries directly from our boutique partners."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      title: "Unique Curations",
      description: "Discover one-of-a-kind pieces you won't find on mass-market platforms."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
