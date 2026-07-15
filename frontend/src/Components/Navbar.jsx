import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      user: null,
      role: null,
      token: ""
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="bg-[#1a202c] text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-serif">BooksWorld</Link>
        
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          
          {!auth?.user ? (
            <>
              <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
              <Link to="/signup" className="bg-white text-[#1a202c] px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Sign Up
              </Link>
            </>
          ) : (
            <>

              {auth.role === 'user' && (
              <>
                <Link to="/cart" className="hover:text-gray-300 transition-colors">Cart</Link>
                <Link to="/orders" className="hover:text-gray-300 transition-colors">My Orders</Link>
              </>
              )}
              
              {/* Seller Links */}
              {auth.role === 'seller' && (
                <>
                  <Link to="/seller?tab=inventory" className="hover:text-gray-300 transition-colors">My Inventory</Link>
                  <Link to="/seller?tab=add" className="hover:text-gray-300 transition-colors">Add Book</Link>
                  <Link to="/seller?tab=orders" className="hover:text-gray-300 transition-colors">Orders</Link>
                </>
              )}
              
              {/* Admin Links */}
              {auth.role === 'admin' && (
                <>
                  <Link to="/admin?tab=overview" className="hover:text-gray-300 transition-colors">Overview</Link>
                  <Link to="/admin?tab=books" className="hover:text-gray-300 transition-colors">All Books</Link>
                  <Link to="/admin?tab=sellers" className="hover:text-gray-300 transition-colors">Sellers</Link>
                  <Link to="/admin?tab=users" className="hover:text-gray-300 transition-colors">Users</Link>
                </>
              )}
              
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;