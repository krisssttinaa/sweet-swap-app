module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        price: { type: DataTypes.DECIMAL(10, 0), allowNull: false },
    });

    return Product;
};