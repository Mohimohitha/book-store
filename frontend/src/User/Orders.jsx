import { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId');
      const res = await axios.get(`http://localhost:8000/api/user/my-orders/${userId}`);
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold font-serif mb-6 text-gray-900">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm border border-gray-200">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                  <span className="font-semibold text-gray-700">Order ID: {order.orderId}</span>
                  <span className="font-bold text-gray-900 text-lg">₹{order.totalPrice}</span>
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-gray-600 py-1">
                    <span>{item.bookId?.title} (Qty: {item.quantity})</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;