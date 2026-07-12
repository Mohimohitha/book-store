const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'seller' },
  isApproved: { type: Boolean, default: false },
  storeName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);