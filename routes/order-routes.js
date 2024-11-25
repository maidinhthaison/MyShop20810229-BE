const express = require('express');
const {searchOrders, searchOrdersDetailById,
     updateOrderStatus, getAllOrdersInDay, 
     getIncomInDay, getLatestOrders, getIncomeInMonth} = require('../controllers/orderController');

const router = express.Router();

router.get("/orders/status/:status/from/:dateFrom/to/:dateTo", searchOrders);
router.get("/orders/status/:status/from", searchOrders);
router.get("/orders/status/:status/to", searchOrders);
router.get("/orders/status/:status/from//to", searchOrders);

router.get("/orders/detail/:id", searchOrdersDetailById);

router.post("/orders/:id", updateOrderStatus);

router.get("/orders/in-day", getAllOrdersInDay);
router.get("/orders/income/in-day", getIncomInDay);
router.get("/orders/latest", getLatestOrders);
router.get("/orders/income/in-month", getIncomeInMonth);


module.exports = {routes: router};
