const Product = require('../models/product');

// Create a product
exports.createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const product = await Product.create({ name, description, price, stock });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create multiple products
exports.createMultipleProducts = async (req, res) => {
    const products = req.body.products;
    try {
        const createdProducts = await Product.bulkCreate(products);
        res.status(201).json(createdProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read a product
exports.getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete multiple products
exports.deleteMultipleProducts = async (req, res) => {
    const { ids } = req.body;
    try {
        await Product.destroy({ where: { id: ids } });
        res.status(200).json({ message: 'Products deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
