const conn = require('../config/db');

const Product = {};

Product.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Product', (err, res) => {
            if (err) {
                console.error('Error fetching all products:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Product.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Product WHERE product_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error fetching product with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Product.createProduct = (productData) => {
    const { product_name, description, price } = productData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO Product (product_name, description, price) VALUES (?, ?, ?)',
            [product_name, description, price],
            (err, res) => {
                if (err) {
                    console.error('Error creating product:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

Product.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Product WHERE product_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error deleting product with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports = Product;