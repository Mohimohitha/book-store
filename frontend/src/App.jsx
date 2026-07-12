import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Uhome from './User/Uhome';
import Ahome from './Admin/Ahome';
import Shome from './Seller/Shome';
import Login from './Components/Login'; 
import Signup from './Components/Signup';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Uhome />} />
            <Route path="/admin" element={<Ahome />} />
            <Route path="/seller" element={<Shome />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;