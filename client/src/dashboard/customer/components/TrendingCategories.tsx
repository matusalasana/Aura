import React from 'react';

const categories = [
  { name: "Women", count: "1.2k+ items", bg: "bg-amber-100 dark:bg-amber-900/20" },
  { name: "Men", count: "2.1k+ items", bg: "bg-amber-100 dark:bg-amber-900/20" },
  { name: "Kids", count: "940+ items", bg: "bg-amber-100 dark:bg-amber-900/20" },
];

const TrendingCategories: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Trending Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className={`group relative h-48 rounded-2xl p-6 flex flex-col justify-end transition-all duration-300 hover:scale-[1.02] cursor-pointer ${cat.bg}`}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cat.name}</h3>
              <p className="text-amber-700 dark:text-amber-400 text-sm font-medium">{cat.count}</p>
              
              {/* Subtle arrow icon for interaction */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-amber-600 dark:text-amber-400">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories;
