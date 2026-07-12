import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-10">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/seller/shome">Home</Link>
        {/* Add your specific links here */}
        <button onClick={handleLogout} className="mt-auto text-red-400">Logout</button>
      </nav>
    </div>
  );
}
export default Sidebar;