import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';

function ViewBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/user/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load book details.");
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = (book) => {
    if (!auth?.user) {
      alert("Please login to add items to your cart.");
      navigate('/login');
      return;
    }
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (currentCart.find((item) => item._id === book._id)) {
      alert("This book is already in your cart!");
    } else {
      localStorage.setItem('cart', JSON.stringify([...currentCart, book]));
      alert('Added to cart!');
    }
  };

  const handlePlaceOrder = async (book) => {
    if (!auth?.user) {
      alert("Please login first.");
      navigate('/login');
      return;
    }

    const isConfirmed = window.confirm("Proceed to pay ₹" + book.price + "?");
    if (!isConfirmed) return;

    alert("Processing payment...");
    
    setTimeout(async () => {
      try {
        const orderData = {
          userId: auth.user._id,
          items: [{ bookId: book._id, quantity: 1, price: book.price }],
          totalPrice: book.price
        };

        await axios.post('http://localhost:8000/api/user/place-order', orderData);
        
        alert("Payment Successful! Order placed.");
        navigate('/orders');
      } catch (err) {
        alert("Order failed. Please try again.");
      }
    }, 1500);
  };

  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!book) return <div className="p-10 text-center">Loading book details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
      <img 
        src={`http://localhost:8000/uploads/${book.image}`} 
        alt={book.title} 
        className="w-full md:w-1/3 h-96 object-cover rounded-xl"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=Image+Missing' }}
      />
      <div>
        <h1 className="text-4xl font-serif font-bold text-gray-900">{book.title}</h1>
        <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
        <p className="text-2xl font-bold mt-4 text-slate-900">₹{book.price}</p>
        <p className="mt-6 text-gray-700 leading-relaxed">{book.description}</p>
        
        <div className="flex gap-4 mt-8">
          <button 
            onClick={() => handleAddToCart(book)}
            disabled={book.stock <= 0}
            className="px-8 py-3 rounded-full font-bold bg-gray-200 hover:bg-gray-300 transition"
          >
            Add to Cart
          </button>
          
          <button 
            onClick={() => handlePlaceOrder(book)}
            disabled={book.stock <= 0}
            className={`px-8 py-3 rounded-full font-bold transition ${
              book.stock > 0 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {book.stock > 0 ? "Buy Now" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewBook;