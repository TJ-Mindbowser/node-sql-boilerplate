module.exports = function (sequelize, DataTypes) {
    const Expense = sequelize.define('Expense', {
        // Model attributes are defined here
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Expense.associate = (models) => {
        Expense.belongsTo(models.Category, { onDelete: 'cascade' })
    };
    return Expense
}