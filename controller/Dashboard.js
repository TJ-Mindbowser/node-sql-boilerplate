const moment = require('moment');
const { getDashboardCards, getDashboardGraphs } = require("../repository/dashboard")
/**
 * Function to get dashboard cards
 * @param {*} req 
 * @param {*} res 
 */
exports.getDashboardCards = async (req, res) => {
    try {
        let userId = req.user.dataValues.id
        let response = await getDashboardCards(userId)
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
 * Function to get dashboard cards
 * @param {*} req 
 * @param {*} res 
 */
exports.getDashboardGraph = async (req, res) => {
    try {
        let userId = req.user.dataValues.id
        let { categoryId, startDate, endDate } = req.query
        startDate = startDate || moment().format('YYYY-MM-DD')
        endDate = endDate || moment().format('YYYY-MM-DD')
        let response = await getDashboardGraphs({ categoryId, startDate, endDate, userId })
        res.json({
            success: true,
            data: response,
            message: 'data fetched successfully'
        })
    } catch (error) {
        throw error
    }
}