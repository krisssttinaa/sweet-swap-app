module.exports = (sequelize, DataTypes) => {
    const Achievement = sequelize.define('Achievement', {
        achievement_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        achievement_name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        date_achieved: { type: DataTypes.DATE, allowNull: false },
    });

    Achievement.associate = models => {
        Achievement.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Achievement;
};
