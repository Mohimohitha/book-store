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

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});