const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
// Baris ke-6 (Penyebab Crash)
router.post('/checkout', productController.checkout); 

module.exports = router;