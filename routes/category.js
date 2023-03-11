let router = require('express').Router();
const {
    addCategory,
    getCategory,
    editCategory,
    deleteCategory,
    getCategoryOptions } = require('../controller/Category');
    
const { verifyToken } = require('../helper');

router.post('/', verifyToken, addCategory)
router.get('/', verifyToken, getCategory)
router.get('/options', verifyToken, getCategoryOptions)
router.put('/:categoryId', verifyToken, editCategory)
router.delete('/:categoryId', verifyToken, deleteCategory)

module.exports = router