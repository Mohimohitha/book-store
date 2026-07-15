const express = require('express');
const router = express.Router();

// 1. Keep your middleware import
const upload = require('../middlewares/upload');

// 2. Import your controllers
const { 
    sellerSignup, 
    sellerLogin, 
    addBook, 
    getMyProducts, 
    updateBook, 
    deleteBookSeller, 
    getSellerOrders 
} = require('../controllers/SellerControllers');

// 3. Define routes once
router.post('/signup', sellerSignup);
router.post('/login', sellerLogin);

// Add book route using your middleware
router.post("/add-book", upload.single("image"), addBook);

router.get('/my-products/:sellerId', getMyProducts);
router.put('/update-book/:id', updateBook);
router.delete('/delete-book/:id', deleteBookSeller);
router.get('/orders/:sellerId', getSellerOrders);

module.exports = router;