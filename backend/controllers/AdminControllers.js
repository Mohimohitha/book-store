const Admin = require('../models/Admin/AdminSchema');
const Seller = require('../models/Seller/SellerSchema');
const User = require('../models/Users/UserSchema');
const Book = require('../models/BookSchema');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });
  res.status(200).json({ message: "Login successful", admin });
};

const getAllSellers = async (req, res) => {
  const sellers = await Seller.find();
  res.status(200).json(sellers);
};

const approveSeller = async (req, res) => {
  const { id } = req.params;
  const seller = await Seller.findByIdAndUpdate(id, { isApproved: true }, { new: true });
  res.status(200).json(seller);
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

const deleteBookAdmin = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(200).json({ message: "Book removed by admin" });
};

module.exports = { adminLogin, getAllSellers, approveSeller, getAllUsers, deleteBookAdmin };