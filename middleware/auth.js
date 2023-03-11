const { verifyToken } = require("../helper");

module.exports.isVerified = (req, res, next) => {
    try {
        const token = req.header('Authentication');
        if (token) {
            const isVerified = verifyToken(token)
            if (isVerified) {
                req.user = isVerified
                next()
            }
            else {
                res.json({
                    success: false,
                    message: 'Invalid/Expired Token',
                    data: ''
                })
            }
            // }
            // else {
            //     res.json({
            //         success: false,
            //         message: 'Token Required',
            //         data: ''
            //     })
        }
    } catch (error) {
        console.log("🚀 ~ file: auth.js:5 ~ error", error)
    }
}