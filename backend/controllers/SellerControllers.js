const Seller = require('../models/Seller/SellerSchema');
const Book = require('../models/BookSchema');
const Order = require('../models/MyOrderSchema');

const sellerSignup = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json(seller);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email already registered' });
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const sellerLogin = async (req, res) => {
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email, password });
  if (!seller) return res.status(401).json({ message: "Invalid credentials" });
  res.status(200).json({ message: "Login successful", seller });
};

const addBook = async (req, res) => {
  try {
    const { title, author, genre, description, price, stock, sellerId } = req.body;
    const image = req.file ? req.file.filename : null;

    const newBook = new Book({
      title, author, genre, description, price, stock, sellerId, image
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyProducts = async (req, res) => {
  const { sellerId } = req.params;
  const books = await Book.find({ sellerId });
  res.status(200).json(books);
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedBook);
};

const deleteBookSeller = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(200).json({ message: "Book deleted successfully" });
};

const getSellerOrders = async (req, res) => {
  const { sellerId } = req.params;
  const books = await Book.find({ sellerId });
  const bookIds = books.map(book => book._id);
  const orders = await Order.find({ "items.bookId": { $in: bookIds } }).populate('userId');
  res.status(200).json(orders);
};

module.exports = { sellerSignup, sellerLogin, addBook, getMyProducts, updateBook, deleteBookSeller, getSellerOrders };