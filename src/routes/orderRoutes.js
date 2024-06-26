const express = require('express');
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/orders', authenticateToken, orderController.placeOrder);
router.get('/orders/user/:userId', authenticateToken, orderController.getUserOrders);
router.get('/orders/:orderId', authenticateToken, orderController.getOrderDetails);

module.exports = router;
