import React from 'react';

const vendors = [
  { name: "Urban Threads", category: "Streetwear", image: "/vendor1.jpg" },
  { name: "Luxe Linen", category: "Sustainable", image: "/vendor2.jpg" },
  { name: "Vintage Aura", category: "Retro", image: "/vendor3.jpg" },
];

const FeaturedVendors: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Vendors</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Discover curated collections from our top creators.</p>
          </div>
          <button className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
            View All →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {vendors.map((vendor, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl h-64 mb-4 bg-gray-200 dark:bg-gray-800">
                {/* Vendor Image */}
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-xl">{vendor.name}</h3>
                  <span className="text-amber-400 text-sm font-medium">{vendor.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
