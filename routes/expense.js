let router = require('express').Router();
const { isVerified } = require('../middleware/auth');

const {
    addExpense,
    getExpense,
    editExpense,
    deleteExpense } = require('./controller/Expense')
router.post('/', isVerified, addExpense)
router.get('/', isVerified, getExpense)
router.put('/:expenseId', isVerified, editExpense)
router.delete('/:expenseId', isVerified, deleteExpense)

module.exports = router