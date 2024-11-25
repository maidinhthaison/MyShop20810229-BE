const mysql = require('../database/db');

const getRevenueProfit = async (req, res, next) => {
    try {
        const from = req.params.from;
        const to = req.params.to;
        console.log(from);
        console.log(to);
        const productOrders = await mysql.execute(
            `SELECT  ot.order_id ,  pt.product_id, oit.unit_sale_price, oit.quantity, pt.import_price,
                oit.quantity , ot.created_time, ot.order_status, (oit.unit_sale_price - pt.import_price) * oit.quantity AS profit , (oit.unit_sale_price * oit.quantity) AS revenue
                FROM myshopdb.ProductTbl pt 
                JOIN myshopdb.OrderItemTbl oit  ON oit.product_id = pt.product_id 
                JOIN myshopdb.OrderTbl ot  ON ot.order_id = oit.order_item_id 
                WHERE ot.created_time >= '${from}' AND ot.created_time <= '${to}'  AND ot.order_status ='Paid'
                ORDER BY ot.created_time`
        );
        res.status(200).send(productOrders[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = { getRevenueProfit }