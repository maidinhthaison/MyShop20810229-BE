const express = require('express');
const { groupProductByCate } = require('../controllers/dashboardController');

const router = express.Router();

router.get("/dashboard/groupProductByCate", groupProductByCate);

module.exports = {routes: router};
