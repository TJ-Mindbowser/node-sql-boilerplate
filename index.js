const express = require('express')
const cors = require('cors')
const category = require('./routes/category')
const auth = require('./routes/auth')
const dashboard = require('./routes/dashboard')
const { port } = require('./const')
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
require('./model/db')
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS']
}));

//Home Route
app.get('/', (req, res) => {
    res.json('Welcome to expense tracker backend')
})
//Auth Routes
app.use('/auth', auth)
//Category Routes
app.use('/category', category)
//Expense Routes
app.use('/expense', category)
//Dashboard Routes
app.use('/dashboard', dashboard)
//Port for the application
app.listen(`${port}`, () => {
    console.log(`Backend started at ${port}`)
})