import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Shome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'inventory'; 
  
  const [message, setMessage] = useState('');
  const [myBooks, setMyBooks] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  const [formData, setFormData] = useState({
    title: '', author: '', genre: 'Fiction', description: '', price: '', stock: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'seller') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'inventory') fetchInventory();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchInventory = async () => {
    const sellerId = localStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8000/api/seller/my-products/${sellerId}`);
    if (response.data) {
      setMyBooks(response.data.books || response.data); 
    }
  };

  const fetchOrders = async () => {
    const sellerId = localStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8000/api/seller/orders/${sellerId}`);
    if (response.data) {
      setMyOrders(response.data);
    }
  };

  const handleDeleteBook = async (id) => {
    await axios.delete(`http://localhost:8000/api/seller/delete-book/${id}`);
    fetchInventory();
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const sellerId = localStorage.getItem('userId');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('genre', formData.genre);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('sellerId', sellerId);
    if (image) data.append('image', image);

    const response = await axios.post('http://localhost:8000/api/seller/add-book', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    if (response.status === 201 || response.status === 200) {
      setMessage('Book successfully added to your store!');
      setFormData({ title: '', author: '', genre: 'Fiction', description: '', price: '', stock: '' });
      setImage(null);
      e.target.reset(); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-7xl mx-auto p-8">
        
        {activeTab === 'add' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">List a New Book</h2>
            <form onSubmit={handleAddBook} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                  <input type="text" name="author" required value={formData.author} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <select name="genre" value={formData.genre} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900 bg-white">
                    <option>Fiction</option>
                    <option>Non-Fiction</option>
                    <option>Philosophy</option>
                    <option>History</option>
                    <option>Poetry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" name="price" required min="0" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input type="number" name="stock" required min="1" value={formData.stock} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" required rows="3" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <input type="file" accept="image/*" required onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition border border-gray-300 rounded-md p-1" />
              </div>

              {message && (
                <div className={`p-3 rounded text-sm font-medium ${message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </div>
              )}

              <div className="pt-4 border-t border-gray-100">
                <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-md hover:bg-gray-800 transition">
                  Publish Book to Store
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">My Inventory</h2>
            {myBooks.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                <p>You haven't listed any books yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {myBooks.map((book) => (
                  <div key={book._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition">
                    <div className="h-56 bg-gray-100 overflow-hidden relative">
                      <img 
                        src={`http://localhost:8000/uploads/${book.image}`} 
                        alt={book.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=No+Cover' }} 
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{book.genre}</p>
                      <h3 className="font-serif text-lg font-semibold mb-1 text-gray-900 line-clamp-1">{book.title}</h3>
                      
                      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">₹{book.price}</p>
                          <p className={`text-xs font-semibold ${book.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {book.stock} in stock
                          </p>
                        </div>
                        <button 
                          onClick={() => handleDeleteBook(book._id)}
                          className="text-red-500 text-sm font-semibold hover:text-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Customer Orders</h2>
             {myOrders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                  <p>No customer orders yet.</p>
                </div>
             ) : (
               <div className="space-y-4">
                 {myOrders.map((order) => (
                   <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                     <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                       <span className="font-semibold text-gray-700">Order ID: {order.orderId}</span>
                       <span className="text-sm text-gray-500">Buyer: {order.userId?.name || 'Unknown'}</span>
                     </div>
                     {order.items.map((item, idx) => (
                       <div key={idx} className="flex justify-between text-sm text-gray-600 py-1">
                         <span>Book ID: {item.bookId}</span>
                         <span>Qty: {item.quantity}</span>
                       </div>
                     ))}
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

      </main>
    </div>
  );
}

export default Shome;