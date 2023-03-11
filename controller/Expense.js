const {
    addExpense,
    editExpense,
    getExpense,
    deleteExpense } = require("../repository/expense")
/**
 * Function to get expense
 * @param {*} req 
 * @param {*} res 
 */
exports.getExpense = async (req, res) => {
    try {
        let { limit, offset, search } = req.query
        let userId = req.user.dataValues.id
        let response = await getExpense({ limit, offset, search, userId })
        res.json({
            success: true,
            data: response,
            message: 'data fetched successfully'
        })
    } catch (error) {
        throw error
    }
}
/**
 * Function to add expense
 * @param {*} req 
 * @param {*} res 
 */
exports.addExpense = async (req, res) => {
    try {
        let response = await addExpense(req.body)
        res.json({
            success: true,
            message: 'Expense added',
            data: {}
        })
    } catch (error) {
        throw error
    }
}
/**
 * Function to edit expense
 * @param {*} req 
 * @param {*} res 
 */
exports.editExpense = async (req, res) => {
    try {
        let { expenseId } = req.params
        let response = await editExpense(req.body, expenseId)
        res.json({
            success: true,
            data: {},
            message: 'Expense Updated Successfully'
        })
    } catch (error) {
        throw error
    }
}
/**
 * Function to delete expense
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteExpense = async (req, res) => {
    try {
        let { expenseId } = req.params
        let response = await deleteExpense(expenseId)
        res.json({
            success: true,
            data: {},
            message: 'Expense Deleted Successfully'
        })
    } catch (error) {
        throw error
    }
}

