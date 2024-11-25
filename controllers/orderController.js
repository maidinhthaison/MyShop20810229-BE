const mysql = require('../database/db');

const searchOrders = async (req, res, next) => {
    try {
        const dateFrom = req.params.dateFrom
        const dateTo = req.params.dateTo
        const status = req.params.status
        
        if(dateFrom == undefined || dateTo == undefined){
            
            const orders = await mysql.execute(
                `SELECT * FROM myshopdb.OrderTbl ot WHERE ot.order_status = '${status}' ORDER BY ot.created_time DESC`
            );
            res.status(200).send(orders[0]);
        }else{
            
            const orders = await mysql.execute(
            
                `SELECT * FROM myshopdb.OrderTbl ot WHERE ot.order_status = '${status}' AND ot.created_time BETWEEN '${dateFrom}' AND '${dateTo}'
                ORDER BY ot.created_time DESC`
            );
            res.status(200).send(orders[0]);
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const searchOrdersDetailById = async (req, res, next) => {
    try {
        const oid = req.params.id;
        console.log(oid);
        
        const result = await mysql.execute(
                `SELECT oit.order_item_id, oit.unit_sale_price, oit.quantity, oit.total_price,
                pt.product_id, pt.import_price, pt.cate_id , pt.product_name , pt.description , pt.product_image 
                FROM myshopdb.OrderItemTbl oit 
                JOIN myshopdb.ProductTbl pt ON pt.product_id  = oit.product_id 
                WHERE oit.order_item_id = '${oid}'`
        );
        res.status(200).send(result[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const data = req.body;
        console.log(data.order_status);
        
        const updateOrder = await mysql.execute('UPDATE myshopdb.OrderTbl SET order_status = ? WHERE order_id = ? ',
            [data.order_status, orderId]
        );
       
        res.status(200).send(updateOrder[0]);
    } catch (error) {
        console.log(error.message);
        
        res.status(400).send(error.message);
    }
}

const getAllOrdersInDay = async (req, res, next) => {
    try {
        
        const orders = 
        await mysql.execute(`SELECT oit.order_item_id ,ot.created_time,ot.order_status,ot.order_id, 
                            COUNT(ot.order_id) AS num_of_type_products_in_order FROM myshopdb.OrderTbl ot 
                            JOIN myshopdb.OrderItemTbl oit  ON oit.order_item_id = ot.order_id 
                            WHERE created_time >= NOW() - INTERVAL 1 DAY
                            GROUP BY ot.order_id ORDER BY num_of_type_products_in_order DESC  `)
                        
        res.status(200).send(orders[0]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getIncomInDay = async (req, res, next) => {
    try {
        
        const orders = 
        await mysql.execute(`SELECT ot.order_id, ot.created_time,ot.order_status, SUM(total_price) AS total_price
                            FROM myshopdb.OrderTbl ot JOIN myshopdb.OrderItemTbl oit  ON oit.order_item_id = ot.order_id 
                            WHERE created_time >= NOW() - INTERVAL 1 DAY AND ot.order_status = 'Paid'
                            GROUP BY ot.order_id ORDER BY total_price DESC `)
                        
        res.status(200).send(orders[0]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLatestOrders = async (req, res, next) => {
    try {
        
        const orders = 
        await mysql.execute(`SELECT oit.order_item_id ,ot.created_time,ot.order_status,
                            COUNT(ot.order_id) AS num_of_type_products_in_order, SUM(total_price) AS final_price
                            FROM myshopdb.OrderTbl ot 
                            JOIN myshopdb.OrderItemTbl oit  ON oit.order_item_id = ot.order_id 
                            GROUP BY ot.order_id ORDER BY created_time DESC LIMIT 3`)
                        
        res.status(200).send(orders[0]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getIncomeInMonth = async (req, res, next) => {
    try {
        
        const orders = 
        await mysql.execute(`SELECT ot.order_id, ot.created_time, ot.order_status, SUM(total_price) AS total_price
                            FROM myshopdb.OrderTbl ot 
                            JOIN myshopdb.OrderItemTbl oit  ON oit.order_item_id = ot.order_id 
                            WHERE created_time BETWEEN (DATE_SUB(LAST_DAY(NOW()), INTERVAL DAY(LAST_DAY(NOW())) - 1 DAY))
                            AND LAST_DAY(NOW())  AND ot.order_status = 'Paid'
                            GROUP BY  ot.created_time , ot.order_id ORDER BY created_time`)
                        
        res.status(200).send(orders[0]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = { searchOrders, searchOrdersDetailById, updateOrderStatus,
     getAllOrdersInDay , getIncomInDay, getLatestOrders, getIncomeInMonth}
