const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connect.js');

const adminRoutes = require('./routes/adminRoutes.js');
const sellerRoutes = require('./routes/sellerRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/user', userRoutes);
app.use('/uploads', express.static('uploads'));

// Debug: print registered routes (guarded)
setTimeout(() => {
  try {
    const routes = [];
    if (app && app._router && Array.isArray(app._router.stack)) {
      app._router.stack.forEach((middleware) => {
        if (middleware.route) {
          routes.push(middleware.route.path);
        } else if (middleware.name === 'router' && middleware.handle && middleware.handle.stack) {
          middleware.handle.stack.forEach((handler) => {
            if (handler.route) routes.push(handler.route.path);
          });
        }
      });
    } else {
      console.log('No routes registered yet');
    }
    console.log('Registered routes:', routes);
  } catch (err) {
    console.log('Error listing routes:', err.message);
  }
}, 500);

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});