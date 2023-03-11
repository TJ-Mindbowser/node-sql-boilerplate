const {
    addCategory,
    editCategory,
    getCategory,
    deleteCategory,
    getCategoryOptions
} = require("../repository/category")

/**
 * Function to get category
 * @param {*} req 
 * @param {*} res 
 */
exports.getCategory = async (req, res) => {
    try {
        let { limit, offset, search } = req.query
        let userId = req.user.dataValues.id
        let response = await getCategory({ limit, offset, search, userId })
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
 * Function to get category options
 * @param {*} req 
 * @param {*} res 
 */
exports.getCategoryOptions = async (req, res) => {
    try {
        let userId = req.user.dataValues.id
        let response = await getCategoryOptions({ userId })
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
 * Function to add category
 * @param {*} req 
 * @param {*} res 
 */
exports.addCategory = async (req, res) => {
    try {
        let userId = req.user.dataValues.id
        let response = await addCategory({ ...req.body, userId })
        res.json({
            success: true,
            message: 'Category added',
            data: {}
        })
    } catch (error) {
        throw error
    }
}
/**
 * Function to edit category
 * @param {*} req 
 * @param {*} res 
 */
exports.editCategory = async (req, res) => {
    try {
        let { categoryId } = req.params
        let response = await editCategory(req.body, categoryId)
        res.json({
            success: true,
            data: {},
            message: 'Category Updated Successfully'
        })
    } catch (error) {
        throw error
    }
}
/**
 * Function to delete category
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteCategory = async (req, res) => {
    try {
        let { categoryId } = req.params
        let response = await deleteCategory(categoryId)
        res.json({
            success: true,
            data: {},
            message: 'Category Deleted Successfully'
        })
    } catch (error) {
        throw error
    }
}

