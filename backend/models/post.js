module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        post_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        recipe_id: { type: DataTypes.INTEGER, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        date_posted: { type: DataTypes.DATE, allowNull: false },
    });

    Post.associate = models => {
        Post.belongsTo(models.User, { foreignKey: 'user_id' });
        Post.belongsTo(models.Recipe, { foreignKey: 'recipe_id' });
    };

    return Post;
};
