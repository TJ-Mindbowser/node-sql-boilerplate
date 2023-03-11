module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(['active', 'inactive', 'blocked']),
            defaultValue: 'active',
            allowNull: false
        },
        isVerified: {
            type: DataTypes.ENUM(['yes', 'no']),
            defaultValue: 'yes',
            allowNull: false
        }
    }, {
        underscored: true,
    });
    // User.associate = (models) => {
    //    User.hasMany(models.Category, { onDelete: 'cascade' })
    //     User.hasMany(models.Expense, { onDelete: 'cascade' })
    // }
    return User
}