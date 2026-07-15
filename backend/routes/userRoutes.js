const express = require('express');
const router = express.Router();
const { userSignup, userLogin, getAllBooks, placeOrder, getUserOrders, getBookById } = require('../controllers/UsersController');

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById); // <--- Add this line
router.post('/place-order', placeOrder);
router.get('/my-orders/:userId', getUserOrders);

module.exports = router;