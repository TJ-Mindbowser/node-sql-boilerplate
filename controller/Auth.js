const { sendMail } = require("../helper")
const { signup, login, updatePassword, checkEmail, changePassword } = require("../repository/auth")

/**
 * Function to handle login
 * @param {*} req 
 * @param {*} res 
 */
module.exports.login = async (req, res) => {
    try {
        let { response, data } = await login(req.body)
        let message = response ? 'Logged in successfully' : 'Invalid credentials provided'
        res.json({ success: response, message, data })
    } catch (error) {
        console.log("🚀 ~ file: Auth.js:5 ~ error", error)
    }
}
/**
 * Function to handle signup request
 * @param {*} req 
 * @param {*} res 
 */
module.exports.signup = async (req, res) => {
    try {
        let response = await signup(req.body)
        res.json(response)
    } catch (error) {
        console.log("🚀 ~ file: Auth.js:5 ~ error", error)
    }
}
/**
 * Function to handle update password request
 * @param {*} req 
 * @param {*} res 
 */
module.exports.updatePassword = async (req, res) => {
    try {
        let { user } = req
        let userPassword = user.dataValues.password
        let userEmail = user.dataValues.email
        let { password, newPassword } = req.body
        let response = await updatePassword({
            password,
            newPassword,
            userPassword,
            userEmail
        })
        res.json({ success: response, message: '', data: {} })
    } catch (error) {
        console.log("🚀 ~ file: Auth.js:43 ~ error", error)
    }
}
/**
 * Function to handle forget password
 */
module.exports.forgetPassword = async (req, res) => {
    try {
        let { email } = req.body
        let isValidUser = await checkEmail(email)
        if (isValidUser) {
            let updatedPassword = await changePassword(email)
            let emailData = {
                to: email,
                message: `Password has been updated - ${updatedPassword}`,
                subject: 'Password reset done!!'
            }
            let response = await sendMail({...emailData})
            res.json({ success: true, message: '', data: response })
        }
        else {
            res.json({ success: false, message: 'Invalid email', data: {} })
        }
    } catch (error) {
        console.log("🚀 ~ file: Auth.js:43 ~ error", error)
    }
}