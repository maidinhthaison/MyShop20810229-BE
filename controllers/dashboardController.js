const mysql = require('../database/db');

const groupProductByCate = async (req, res, next) => {
    try {
       
        const result = await mysql.execute(
                `SELECT pt.cate_id , ct.cate_name , COUNT(pt.product_id) AS NumOfProduct
                FROM myshopdb.ProductTbl pt
                JOIN myshopdb.CategoryTbl ct  ON pt.cate_id  = ct.cate_id 
                GROUP BY pt.cate_id `
        );
        res.status(200).send(result[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = { groupProductByCate }

