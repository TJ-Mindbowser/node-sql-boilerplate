const db = require("../model/db")
const { Op, Sequelize } = require("sequelize");

exports.getDashboardCards = async (userId) => {
    try {
        let { Expense, Category, } = db
        let debit = await Expense.findOne({
            where: {
                userId
            },
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('amount')), 'totalDebit']
            ],
            include: {
                model: Category,
                where: {
                    type: 'debit'
                }
            },
        })
        let credit = await Expense.findOne({
            where: {
                userId
            },
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('amount')), 'totalCredit']
            ],
            include: {
                model: Category,
                where: {
                    type: 'credit'
                }
            },
        })
        return { debit, credit }
    } catch (error) {
        throw error
    }
}
exports.getDashboardGraphs = async ({ categoryId, startDate, endDate, userId }) => {
    try {
        let { Expense, Category, } = db
        let categoryWhere = {}
        if (categoryId) {
            categoryWhere = { categoryId }
        }
        let where = {
            userId,
            [Op.or]: [{
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }]
        }
        let data = await Expense.findAll({
            where: { ...where, ...categoryWhere },
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('amount')), 'totalDebit'],
                'date',
                'amount'
            ],
            group: ['date'],
            order: [['date', 'ASC']],
            include: {
                model: Category,
                // where: {
                //     type: 'debit'
                // }
            },
        })
        return data
    } catch (error) {
        throw error
    }
}
