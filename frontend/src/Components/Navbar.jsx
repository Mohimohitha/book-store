import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-white">BooksWorld</Link>
        <div className="flex gap-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-gray-300 transition">Shop</Link>
          <Link to="/seller" className="hover:text-gray-300 transition">Seller Hub</Link>
          <Link to="/admin" className="hover:text-gray-300 transition">Admin</Link>
          <Link to="/login" className="bg-white text-gray-900 px-5 py-2 rounded hover:bg-gray-200 transition">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;