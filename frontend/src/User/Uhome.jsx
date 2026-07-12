import { useState } from 'react';

function Uhome() {
  const [books, setBooks] = useState([
    { _id: '1', title: 'The Weight of Silence', author: 'Eleanor Thorne', genre: 'Historical Fiction', price: 28.00, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop' },
    { _id: '2', title: 'Fragments of Tomorrow', author: 'Julian Vane', genre: 'Essays', price: 24.50, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop' },
    { _id: '3', title: "The Architect's Ledger", author: 'Marcus Aurelius', genre: 'Philosophy', price: 32.00, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop' },
    { _id: '4', title: 'Softened Echoes', author: 'Amara Okafor', genre: 'Poetry', price: 19.00, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-8">
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Filters:</span>
            <select className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer">
              <option>All Genres</option>
              <option>Fiction</option>
              <option>Philosophy</option>
              <option>History</option>
              <option>Poetry</option>
            </select>
            <select className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer">
              <option>All Formats</option>
              <option>Hardcover</option>
              <option>Ebook</option>
              <option>Audiobook</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Sort:</span>
            <select className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book._id} className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1.5">{book.genre}</p>
                <h3 className="font-serif text-lg font-semibold mb-1 text-gray-900 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-4 italic">{book.author}</p>
                
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="font-semibold text-lg text-gray-900">₹{book.price.toFixed(2)}</p>
                  <button className="text-sm font-semibold bg-gray-50 border border-gray-200 px-4 py-1.5 rounded hover:bg-gray-900 hover:border-gray-900 hover:text-white transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Uhome;