import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  const isLoggedIn = !!userId;
  const sellTarget = role === 'seller' ? '/seller' : '/login';

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const isDashboardPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/seller');

  if (isDashboardPage) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-white">BooksWorld</Link>
            <p className="text-sm text-gray-400">Curated selections for the discerning reader.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search titles or authors..."
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-100 outline-none transition focus:border-white focus:bg-gray-800 focus:ring-2 focus:ring-gray-400 sm:w-72"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800 hover:text-white">Shop</Link>
            <Link to={sellTarget} className="rounded-md px-3 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800 hover:text-white">Sell</Link>
            <button className="rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">Cart (0)</button>
            {!isLoggedIn ? (
              <Link to="/login" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-950 transition hover:bg-gray-200">Login</Link>
            ) : (
              <button onClick={handleLogout} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;