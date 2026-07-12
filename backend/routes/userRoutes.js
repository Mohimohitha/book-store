const express = require('express');
const router = express.Router();
const { userSignup, userLogin, getAllBooks, placeOrder, getUserOrders } = require('../controllers/UsersController');

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/books', getAllBooks);
router.post('/place-order', placeOrder);
router.get('/my-orders/:userId', getUserOrders);

module.exports = router;