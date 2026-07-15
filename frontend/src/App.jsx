import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Uhome from './User/Uhome';
import Ahome from './Admin/Ahome';
import Shome from './Seller/Shome';
import Login from './Components/Login'; 
import Signup from './Components/Signup';
import PrivateRoute from './Routes/PrivateRoute';
import Cart from './User/Cart';
import Orders from './User/Orders';
import ViewBook from './Components/ViewBook';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Uhome />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />
          
          {/* New Book Route */}
          <Route path="/book/:id" element={<ViewBook />} />
          
          <Route path="/seller" element={<PrivateRoute allowedRole="seller" />}>
            <Route index element={<Shome />} />
          </Route>

          <Route path="/admin" element={<PrivateRoute allowedRole="admin" />}>
            <Route index element={<Ahome />} />
          </Route>

          <Route path="/cart" element={<PrivateRoute allowedRole="user" />} >
            <Route index element={<Cart />} />
          </Route>

          <Route path="/orders" element={<PrivateRoute allowedRole="user" />} >
            <Route index element={<Orders />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;