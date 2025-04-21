module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('Recipe', {
        recipe_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        ingredients: { type: DataTypes.TEXT, allowNull: false },
        instructions: { type: DataTypes.TEXT, allowNull: false },
        date_created: { type: DataTypes.DATE, allowNull: false },
    });

    Recipe.associate = models => {
        Recipe.belongsTo(models.User, { foreignKey: 'user_id' });
        Recipe.belongsTo(models.Product, { foreignKey: 'product_id' });
    };

    return Recipe;
};
