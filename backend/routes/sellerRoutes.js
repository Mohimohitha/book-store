const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { sellerSignup, sellerLogin, addBook, getMyProducts, updateBook, deleteBookSeller, getSellerOrders } = require('../controllers/SellerControllers');

router.post('/signup', sellerSignup);
router.post('/login', sellerLogin);
router.post('/add-book', upload.single('image'), addBook);
router.get('/my-products/:sellerId', getMyProducts);
router.put('/update-book/:id', updateBook);
router.delete('/delete-book/:id', deleteBookSeller);
router.get('/orders/:sellerId', getSellerOrders);

module.exports = router;