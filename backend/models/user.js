module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        name: { type: DataTypes.STRING, allowNull: false },
        surname: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('guest', 'user', 'moderator', 'admin'), allowNull: false },
        dietary_goals: { type: DataTypes.STRING, allowNull: true },
        registration_date: { type: DataTypes.DATE, allowNull: false },
        amount_achievements: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    });
    return User;
};
