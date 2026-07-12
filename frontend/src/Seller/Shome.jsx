import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Shome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('add');
  const [message, setMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    description: '',
    price: '',
    stock: '',
  });
  const [image, setImage] = useState(null);

  // Security Check: Make sure they are a logged-in seller
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'seller') {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const sellerId = localStorage.getItem('userId');

    // We must use FormData because we are sending a physical file
    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('genre', formData.genre);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('sellerId', sellerId);
    if (image) data.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/seller/add-book', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.status === 201) {
        setMessage('Book successfully added to your store!');
        // Reset form
        setFormData({ title: '', author: '', genre: 'Fiction', description: '', price: '', stock: '' });
        setImage(null);
        e.target.reset(); // Clears the file input visually
      }
    } catch (err) {
      setMessage('Failed to add book. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Seller Sidebar */}
      <aside className="hidden w-72 min-h-screen flex-col bg-gray-950 text-white shadow-2xl md:flex">
        <div className="border-b border-gray-800 p-6">
          <h2 className="font-serif text-xl font-bold">Seller Central</h2>
          <p className="mt-1 text-sm text-gray-400">Manage your inventory with clarity.</p>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          <button
            onClick={() => setActiveTab('add')}
            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'add' ? 'bg-white text-gray-950' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
          >
            + Add New Book
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'inventory' ? 'bg-white text-gray-950' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
          >
            My Inventory
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'orders' ? 'bg-white text-gray-950' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
          >
            Customer Orders
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description / Synopsis</label>
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              <p>Your listed books will appear here. (Coming next!)</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Shome;