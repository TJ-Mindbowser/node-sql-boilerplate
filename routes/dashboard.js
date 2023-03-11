let router = require('express').Router();

const { isVerified } = require('../middleware/auth');
const { getDashboardCards, getDashboardGraph } = require('../controller/Dashboard')

router.get('/cards', isVerified, getDashboardCards)
router.get('/graphs', isVerified, getDashboardGraph)

module.exports = router