const express = require('express');
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/products', authenticateToken, productController.createProduct);
router.post('/products/multiple', authenticateToken, productController.createMultipleProducts);
router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getAllProducts);
router.put('/products/:id', authenticateToken, productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);
router.delete('/products/multiple', authenticateToken, productController.deleteMultipleProducts);

module.exports = router;
