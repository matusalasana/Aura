import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Aura</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              The premier marketplace connecting unique local vendors with fashion lovers.
            </p>
          </div>

          {/* Links Columns */}
          {[
            { title: "Shop", links: ["New Arrivals", "Trending", "Categories", "Vendors"] },
            { title: "Support", links: ["FAQ", "Shipping", "Returns", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Licenses"] },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 text-sm hover:text-amber-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-600 text-sm">
            © 2026 Aura Marketplace. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">
              Designed for Aura
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
