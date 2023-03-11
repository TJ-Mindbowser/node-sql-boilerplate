require('dotenv').config();
module.exports = {
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    secret: process.env.SECRET,
    host: process.env.HOST,
    port: process.env.PORT
}