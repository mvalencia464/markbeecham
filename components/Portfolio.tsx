import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Portfolio: React.FC = () => {
  const { photos } = usePortfolio();
  const [filter, setFilter] = useState<string>('All Work');

  const categories = ['All Work', 'Wildlife', 'Sports', 'Real Estate', 'Family'];

  const filteredPhotos = filter === 'All Work' 
    ? photos 
    : photos.filter(photo => photo.category === filter || (filter === 'Wildlife' && photo.category === 'Uploads'));

  return (
    <section id="portfolio" className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white font-bold mb-4">Selected Works</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          
          <blockquote className="text-stone-400 italic max-w-2xl mx-auto text-lg font-serif">
            "They speak of the glorious splendor of your majesty—and I will meditate on your wonderful works."
            <span className="block text-amber-500 mt-2 text-sm not-italic uppercase tracking-widest font-bold">— Psalm 145:5</span>
          </blockquote>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === category
                  ? 'text-amber-500 border-b-2 border-amber-500'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-stone-800"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-amber-500 text-xs uppercase tracking-widest mb-1">{photo.category}</span>
                <h3 className="text-white font-serif text-xl">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center text-stone-500 py-12">
            No photos found in this category.
          </div>
        )}
      </div>
    </section>
  );
};
