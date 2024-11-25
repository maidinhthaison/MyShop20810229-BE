const express = require('express');
const {getRevenueProfit} = require('../controllers/reportController');

const router = express.Router();

router.get("/report/:from/:to", getRevenueProfit);


module.exports = {routes: router};
