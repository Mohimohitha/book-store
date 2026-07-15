import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Notice these are all targeting port 8000 and the singular routes
    let endpoint = "http://localhost:8000/api/user/login";
    if (role === "seller") endpoint = "http://localhost:8000/api/seller/login";
    if (role === "admin") endpoint = "http://localhost:8000/api/admin/login";

    try {
      const res = await axios.post(endpoint, { email, password });

      if (res.status === 200) {
        const userData = res.data.user || res.data.seller || res.data.admin;
        
        const authData = {
           user: userData,
           role: role,
           token: "" // Left blank since your backend doesn't use tokens
        };
        
        setAuth(authData);
        localStorage.setItem("auth", JSON.stringify(authData));
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", userData._id);

        if (role === "admin") navigate("/admin");
        else if (role === "seller") navigate("/seller");
        else navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(`Invalid credentials! Are you sure you have an account registered as a ${role}?`);
      } else {
        alert("An error occurred connecting to the server.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 font-serif mb-2">Welcome Back to BooksWorld</h2>
        <p className="text-gray-500">Sign in to your account to continue</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Login as a...</label>
            <div className="flex space-x-3">
              {['user', 'seller', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    role === r 
                      ? 'bg-[#1a202c] text-white' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a202c] focus:border-transparent"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a202c] focus:border-transparent"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#1a202c] hover:bg-black text-white py-2.5 rounded-md text-sm font-medium transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-slate-900 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;