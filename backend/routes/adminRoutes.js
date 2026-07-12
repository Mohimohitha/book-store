const express = require('express');
const router = express.Router();
const { adminLogin, getAllSellers, approveSeller, getAllUsers, deleteBookAdmin } = require('../controllers/AdminControllers');

router.post('/login', adminLogin);
router.get('/sellers', getAllSellers);
router.put('/approve-seller/:id', approveSeller);
router.get('/users', getAllUsers);
router.delete('/book/:id', deleteBookAdmin);

module.exports = router;