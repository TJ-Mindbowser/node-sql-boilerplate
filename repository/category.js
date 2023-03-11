const db = require("../model/db")
const bcrypt = require("bcrypt");
const { Op, Sequelize } = require("sequelize");

exports.addCategory = (data) => {
    try {
        const { Category } = db
        return Category.create(data)
            .then(() => {
                return true
            })
    } catch (error) {
        throw error
    }
}
exports.editCategory = (data, categoryId) => {
    try {
        const { Category } = db
        return Category.update(data,
            { where: { id: categoryId } })
            .then(() => {
                return true
            })
    } catch (error) {
        throw error
    }
}
exports.deleteCategory = (categoryId) => {
    try {
        const { Category } = db
        return Category.destroy(
            { where: { id: categoryId } })
            .then(() => {
                return true
            })
    } catch (error) {
        throw error
    }
}
exports.getCategory = ({ limit = 10, offset = 0, search = '', userId = 1 }) => {
    try {
        limit = +limit
        offset = +offset
        const { Category } = db
        let searchQuery = search ? { category: { [Op.like]: '%' + search + '%' } } : {}
        let where = {
            userId,
            ...searchQuery
        }
        let query = { limit, offset, where }
        return Category.findAndCountAll(query)
    } catch (error) {
        throw error
    }
}
exports.getCategoryOptions = ({ userId = 1 }) => {
    try {
        const { Category } = db
        let where = {
            userId
        }
        let query = { where }
        return Category.findAll(query)
    } catch (error) {
        throw error
    }
}
exports.deleteCategory = (categoryId) => {
    try {
        const { Category } = db
        return Category.destroy(
            { where: { id: categoryId } })
            .then(() => {
                return true
            })
    } catch (error) {
        throw error
    }
}