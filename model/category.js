module.exports = function (sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        // Model attributes are defined here
        type: {
            type: DataTypes.ENUM(['credit', 'debit']),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(['active', 'inactive']),
            defaultValue: 'active',
            allowNull: false
        }
    }, {
        underscored: true
    });
    // Category.associate = (models) => {
    //     Category.belongsTo(models.User, { foreignKey: 'userId', onDelete: cascade })
    //     Category.hasMany(models.Expense, { foreignKey: 'categoryId', onDelete: cascade })
    // }
    return Category
}