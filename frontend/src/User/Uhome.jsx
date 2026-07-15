import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/auth';

function Uhome() {
  const [books, setBooks] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/books');
        if (res.data) {
          setBooks(res.data);
        }
      } catch (error) {
        console.error("Error fetching catalog:", error);
      }
    };
    fetchBooks();
  }, []);


    const handleAddToCart = (e, book) => {
  e.preventDefault(); // Prevents page reload
  
  if (!auth?.user) {
    alert("Please login to add items to your cart.");
    navigate('/login');
    return;
  }

  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if book already exists by ID
  const isAlreadyInCart = currentCart.find((item) => item._id === book._id);

  if (isAlreadyInCart) {
    alert("This book is already in your cart!");
  } else {
    // Add new book if it doesn't exist
    localStorage.setItem('cart', JSON.stringify([...currentCart, book]));
    alert('Added to cart!');
  }
};

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-8">
        
        {/* FILTERS HEADER */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Filters:</span>
            <select className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md px-3 py-2 cursor-pointer">
              <option>All Genres</option>
              <option>Fiction</option>
              <option>Philosophy</option>
              <option>History</option>
            </select>
          </div>
        </div>

        {/* BOOK GRID */}
        {books.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No books available in the store right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div key={book._id} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                
                {/* Wrap the image and info in Link to enable "View Book" */}
                <Link to={`/book/${book._id}`} className="block flex-grow">
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                    <img 
                      src={`http://localhost:8000/uploads/${book.image}`} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=No+Cover' }} 
                    />
                    {book.stock <= 0 && (
                       <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                         Out of Stock
                       </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1.5">{book.genre}</p>
                    <h3 className="font-serif text-lg font-semibold mb-1 text-gray-900 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 italic">{book.author}</p>
                  </div>
                </Link>

                {/* Add to Cart button sits outside Link */}
                <div className="p-5 pt-0 flex justify-between items-center border-t border-gray-100">
                  <p className="font-semibold text-lg text-gray-900">₹{book.price}</p>
                  <button 
                    onClick={(e) => handleAddToCart(e, book)} 
                    disabled={book.stock <= 0}
                    className={`text-sm font-semibold px-4 py-1.5 rounded transition ${
                      book.stock > 0 
                        ? 'bg-gray-50 border border-gray-200 hover:bg-gray-900 hover:border-gray-900 hover:text-white' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Uhome;