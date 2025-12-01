import React from 'react';
import { Camera } from 'lucide-react';
import { BRAND } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-stone-500 py-16 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Camera className="h-6 w-6 text-amber-600" />
              <span className="text-white font-serif text-xl tracking-wider uppercase font-bold">
                Mark Beecham
              </span>
            </div>
            <p className="mb-6 max-w-sm">
              Professional photography services specializing in sports, wildlife, and family portraits throughout Tennessee.
            </p>
            <p className="text-amber-500 italic font-serif">
              "{BRAND.slogan}"
            </p>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Portfolio', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-amber-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-bold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>{BRAND.phone}</li>
              <li>{BRAND.email}</li>
              <li>{BRAND.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-900 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mark Beecham Photography. All rights reserved.</p>
          <p className="mt-4 md:mt-0 italic font-serif text-stone-600">Psalm 145:5</p>
        </div>
      </div>
    </footer>
  );
};
