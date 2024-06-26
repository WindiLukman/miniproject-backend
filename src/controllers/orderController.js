const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product');

// Place an order
exports.placeOrder = async (req, res) => {
    const { userId, items } = req.body;
    try {
        let total = 0;
        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with id ${item.productId} not found` });
            }
            total += product.price * item.quantity;
        }

        const order = await Order.create({ userId, total });
        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            });
        }
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List a user's past orders
exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.findAll({ where: { userId }, include: OrderItem });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// See the products ordered in a certain order
exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findByPk(orderId, { include: OrderItem });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
