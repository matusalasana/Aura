import React from 'react';
import { Store, Zap, TrendingUp } from 'lucide-react';

const BecomeAVendor: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content side */}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              Start Your Journey as an <span className="text-amber-500">Aura Partner</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Join a growing community of independent designers and creators. With our simplified onboarding, you can have your storefront live and start selling in less than 24 hours.
            </p>
            
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-amber-500/20 transition-all">
              Apply to Sell
            </button>
          </div>

          {/* Benefits side */}
          <div className="grid gap-6">
            {[
              { icon: Store, title: "Your Own Storefront", desc: "Custom branding for your shop page." },
              { icon: Zap, title: "Lightning Fast Payments", desc: "Automated payouts directly to your account." },
              { icon: TrendingUp, title: "Analytics Dashboard", desc: "Understand your trends and peak sales hours." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
                  <item.icon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeAVendor;
