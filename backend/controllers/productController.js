const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        if (!product.length) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createProduct = async (req, res) => {
    const { product_name, description, price } = req.body;
    try {
        const newProduct = await Product.createProduct({
            product_name,
            description,
            price
        });
        res.json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.deleteProduct(req.params.id);
        res.json({ msg: 'Product deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};