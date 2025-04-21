module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
        report_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        reported_post_id: { type: DataTypes.INTEGER, allowNull: false },
        reason: { type: DataTypes.TEXT, allowNull: false },
        date_reported: { type: DataTypes.DATE, allowNull: false },
    });

    Report.associate = models => {
        Report.belongsTo(models.User, { foreignKey: 'user_id' });
        Report.belongsTo(models.Post, { foreignKey: 'reported_post_id' });
    };

    return Report;
};