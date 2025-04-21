module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        sender_id: { type: DataTypes.INTEGER, allowNull: false },
        receiver_id: { type: DataTypes.INTEGER, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        date_sent: { type: DataTypes.DATE, allowNull: false },
    });

    Message.associate = models => {
        Message.belongsTo(models.User, { as: 'Sender', foreignKey: 'sender_id' });
        Message.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiver_id' });
    };

    return Message;
};