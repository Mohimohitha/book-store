const User = require('../models/Users/UserSchema');
const Book = require('../models/BookSchema');
const Order = require('../models/MyOrderSchema');

const userSignup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email already registered' });
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.status(200).json({ message: "Login successful", user });
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const order = new Order({ userId, items, totalPrice, orderId });
    await order.save();

    for (const item of items) {
      await Book.findByIdAndUpdate(item.bookId, { $inc: { stock: -item.quantity } });
    }
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed", error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate('items.bookId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { userSignup, userLogin, getAllBooks, getBookById, placeOrder, getUserOrders };