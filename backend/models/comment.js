module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        comment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        post_id: { type: DataTypes.INTEGER, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        date_commented: { type: DataTypes.DATE, allowNull: false },
    });

    Comment.associate = models => {
        Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
        Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Comment;
};