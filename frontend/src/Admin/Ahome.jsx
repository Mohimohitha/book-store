import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function Ahome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const [sellers, setSellers] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  const COLORS = ['#1a202c', '#4a5568', '#718096'];
  const chartData = [
    { name: 'Books', value: books.length || 0, count: books.length || 0 },
    { name: 'Sellers', value: sellers.length || 0, count: sellers.length || 0 },
    { name: 'Users', value: users.length || 0, count: users.length || 0 }
  ];

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'sellers') fetchSellers();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'books') fetchBooks();
  }, [activeTab]);

  const fetchSellers = async () => {
    const res = await axios.get('http://localhost:8000/api/admin/sellers');
    if (res.data) setSellers(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8000/api/admin/users');
    if (res.data) setUsers(res.data);
  };

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:8000/api/user/books');
    if (res.data) setBooks(res.data);
  };

  const handleApproveSeller = async (id) => {
    await axios.put(`http://localhost:8000/api/admin/approve-seller/${id}`);
    fetchSellers();
  };

  const handleDeleteBook = async (id) => {
    await axios.delete(`http://localhost:8000/api/admin/book/${id}`);
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        
        {activeTab === 'overview' && (
          <>
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h1 className="font-serif text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
              <p className="mt-2 text-sm text-gray-600">Platform Overview Dashboard</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-500">Total Books</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{books.length || 0}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-500">Active Sellers</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{sellers.length || 0}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-500">Registered Users</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{users.length || 0}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Platform Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Activity Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1a202c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Catalog, Sellers, and Users tabs remain unchanged below... */}
        {activeTab === 'books' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Manage Catalog</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 border-b">Title</th>
                    <th className="p-4 border-b">Author</th>
                    <th className="p-4 border-b">Price</th>
                    <th className="p-4 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id} className="hover:bg-gray-50 transition border-b border-gray-100">
                      <td className="p-4 text-gray-900 font-medium">{book.title}</td>
                      <td className="p-4 text-gray-600">{book.author}</td>
                      <td className="p-4 text-gray-600">₹{book.price}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteBook(book._id)} className="text-red-600 hover:text-red-800 font-medium text-sm transition">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sellers' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Manage Sellers</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 border-b">Name</th>
                    <th className="p-4 border-b">Email</th>
                    <th className="p-4 border-b">Status</th>
                    <th className="p-4 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.map((seller) => (
                    <tr key={seller._id} className="hover:bg-gray-50 transition border-b border-gray-100">
                      <td className="p-4 text-gray-900 font-medium">{seller.name}</td>
                      <td className="p-4 text-gray-600">{seller.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${seller.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {seller.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {!seller.isApproved && <button onClick={() => handleApproveSeller(seller._id)} className="text-blue-600 hover:text-blue-800 font-medium text-sm transition">Approve</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Manage Users</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 border-b">Name</th>
                    <th className="p-4 border-b">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition border-b border-gray-100">
                      <td className="p-4 text-gray-900 font-medium">{user.name}</td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Ahome;