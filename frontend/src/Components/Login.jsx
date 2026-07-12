import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Dynamically choose the backend URL based on the selected role
      const endpoint = `http://localhost:8000/api/${role}/login`;
      
      const response = await axios.post(endpoint, { email, password });
      
      if (response.status === 200) {
        // Save user info to keep them logged in
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', response.data[role]._id);

        // Redirect to their specific dashboard
        if (role === 'admin') navigate('/admin');
        else if (role === 'seller') navigate('/seller');
        else navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-600">Please sign in to your account</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 sm:rounded-xl sm:px-10">
          
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
              <div className="flex gap-4">
                {['user', 'seller', 'admin'].map((r) => (
                  <label key={r} className={`flex-1 text-center py-2 border rounded-md cursor-pointer transition text-sm font-medium capitalize ${role === r ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="role" 
                      value={r} 
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)} 
                      className="hidden" 
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" 
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium text-center bg-red-50 py-2 rounded-md">
                {error}
              </div>
            )}

            <div>
              <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition">
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="font-medium text-gray-900 hover:underline">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;