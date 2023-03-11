const db = require("../model/db")
const { Op } = require("sequelize");

exports.addExpense = (data) => {
    try {
        const { Expense } = db
        let udpatedData = { ...data, userId: 1 }
        console.log("🚀 ~ file: Expense.js:10 ~ udpatedData", udpatedData)
        return Expense.create(udpatedData)
            .then(() => {
                return true
            })
    } catch (error) {
        throw error
    }
}
exports.editExpense = (data, ExpenseId) => {
    try {
        const { Expense } = db
        return Expense.update(data,
            { where: { id: ExpenseId } })
            .then(() => {
                return true
            })
    } catch (error) {
        throw error
    }
}
exports.deleteExpense = (ExpenseId) => {
    try {
        const { Expense } = db
        return Expense.destroy(
            { where: { id: ExpenseId } })
            .then(() => {
                return true
            })
    } catch (error) {
        throw error
    }
}
exports.getExpense = ({ limit = 10, offset = 0, search = '', userId }) => {
    try {
        limit = +limit
        offset = +offset
        const { Expense, Category } = db
        let include = Category
        let searchQuery = search ?
            {
                [Op.or]: [
                    { description: { [Op.like]: '%' + search + '%' } },
                    { amount: search },
                    Date.parse(search) && { date: search }
                ]
            } : {}
        let where = {
            userId,
            ...searchQuery
        }
        let query = { limit, offset, where, include }
        return Expense.findAndCountAll(query)
    } catch (error) {
        throw error
    }
}
exports.deleteExpense = (ExpenseId) => {
    try {
        const { Expense } = db
        return Expense.destroy(
            { where: { id: ExpenseId } })
            .then(() => {
                return true
            })
    } catch (error) {
        throw error
    }
}