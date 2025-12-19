'use client';

import { Search } from 'lucide-react';

const SearchSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6">
          Search Products
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
