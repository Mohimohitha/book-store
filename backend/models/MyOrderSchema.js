const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  orderId: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);