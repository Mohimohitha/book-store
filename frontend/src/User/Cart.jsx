import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    const items = cart.map(item => ({ bookId: item._id, quantity: 1 }));
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    await axios.post('http://localhost:8000/api/user/place-order', { userId, items, totalPrice });
    
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold font-serif mb-6 text-gray-900">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm border border-gray-200">Your cart is empty.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between py-4 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-800">{item.title}</span>
                <span className="font-bold text-gray-900">₹{item.price}</span>
              </div>
            ))}
            <button 
              onClick={handleCheckout} 
              className="w-full mt-6 bg-[#1a202c] hover:bg-black text-white font-bold py-3 rounded-md transition"
            >
              Checkout & Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;