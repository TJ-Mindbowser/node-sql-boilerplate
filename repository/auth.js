const db = require("../model/db")
const bcrypt = require("bcrypt"); ``
var crypto = require("crypto");
const { generateToken, verifyToken } = require("../helper");
/**
 * Handle Signup Request
 * @param {*} data 
 * @returns 
 */
exports.signup = async (data) => {
    try {
        let { User } = db
        let { userName, email } = data
        let password = await bcrypt.hash(data.password, bcrypt.genSaltSync(8));
        let userNameExists = await User.findOne({ where: { userName } })
        let emailExists = await User.findOne({ where: { email } })
        let validation = {
            userNameValidationFail: userNameExists instanceof User,
            emailValidationFail: emailExists instanceof User
        }
        if (validation.userNameValidationFail || validation.emailValidationFail) {
            return { success: false, message: 'Invalid Input provided', data: validation }
        }
        let response = await User.create({ ...data, password })
        return { success: true, message: 'Signed up successfully', data: {} }
    } catch (error) {
        throw error
    }
}
/**
 * Handle Login Request
 * @param {*} data 
 * @returns 
 */
exports.login = async (data) => {
    try {
        let { email, password } = data
        let { User } = db
        let userExists = await User.findOne({
            where: {
                email
            }
        })
        if (userExists?.password) {
            let response = await bcrypt.compare(password, userExists.password)
            const token = generateToken(userExists)
            return { response, data: { userExists, token } }
        }
        else {
            return { response: false, data: {} }
        }
    } catch (error) {
        throw error
    }
}
exports.updatePassword = async ({ password, userPassword, newPassword, userEmail }) => {
    try {
        let { User } = db
        let response = await bcrypt.compare(password, userPassword)
        if (response) {
            let updatedPassword = await bcrypt.hash(newPassword, bcrypt.genSaltSync(8));
            let update = await User.update({ password: updatedPassword }, { where: { email: userEmail } })
            return true
        }
        return false
    } catch (error) {
        throw error
    }
}
exports.checkEmail = async (email) => {
    try {
        let { User } = db
        let userExists = await User.findOne({ where: { email } })
        return userExists instanceof User
    } catch (error) {
        console.log("🚀 ~ file: auth.js:73 ~ exports.checkEmail=async ~ error", error)
    }
}
exports.changePassword = async (email) => {
    try {
        let password = crypto.randomBytes(20).toString('hex');
        let hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));
        let { User } = db
        let updatedPassword = await User.update({ password: hashedPassword }, { where: { email } })
        return password
    } catch (error) {
        console.log("🚀 ~ file: auth.js:73 ~ exports.checkEmail=async ~ error", error)
    }
}