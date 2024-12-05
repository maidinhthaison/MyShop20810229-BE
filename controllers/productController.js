const mysql = require('../database/db');

const getProducts = async (req, res, next) => {
    try {
        const cateId = req.params.cateId
        const proName = req.params.proName
        const limit = req.params.limit
        const offset = req.params.offset
        console.log(`${cateId} - ${proName} - ${limit} - ${offset}`);

        if(!cateId && !proName){
            console.log('cateId', cateId);
            
            const products = await mysql.execute(
                `SELECT * FROM myshopdb.ProductTbl pt LIMIT ${limit} OFFSET ${offset}`
            );
            res.status(200).send(products[0]);
        }
        if(cateId && !proName){
            console.log(isNaN(cateId));
            if(isNaN(cateId)){
                const products = await mysql.execute(
                        `SELECT * FROM myshopdb.ProductTbl pt WHERE pt.product_name LIKE '%${cateId}%' LIMIT ${limit} OFFSET ${offset}`
                );
                res.status(200).send(products[0]);
            }else{
                const products = await mysql.execute(
                        `SELECT * FROM myshopdb.ProductTbl pt WHERE pt.cate_id = ${cateId} AND pt.product_name LIKE '%%'  LIMIT ${limit} OFFSET ${offset}`);
                res.status(200).send(products[0]);
            }
        }
        if(cateId && proName){
        
            const products = await mysql.execute(
                `SELECT * FROM myshopdb.ProductTbl pt WHERE pt.cate_id = ${cateId} AND pt.product_name LIKE '%${proName}%' LIMIT ${limit} OFFSET ${offset}`
            );
            res.status(200).send(products[0]);
        }
            
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const searchProducts = async (req, res, next) => {
    try {
        const cateId = req.params.cateId
        const proName = req.params.proName
        const limit = req.params.limit
        const offset = req.params.offset
        if(proName == undefined){
            
            const products = await mysql.execute(
                `SELECT * FROM myshopdb.ProductTbl pt WHERE pt.cate_id = ${cateId} LIMIT ${limit} OFFSET ${offset}`
            );
            res.status(200).send(products[0]);
        }else{
            
            const products = await mysql.execute(
                `SELECT * FROM myshopdb.ProductTbl pt WHERE pt.cate_id = ${cateId} AND pt.product_name LIKE '%${proName}%' LIMIT ${limit} OFFSET ${offset}`
            );
            res.status(200).send(products[0]);
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProducts = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        console.log(productId);
        console.log(data.sale_price);
        console.log(data.quantity);
        console.log(data.description);
        console.log(data.product_name);
        
        const updateProducts = await mysql.execute('UPDATE myshopdb.ProductTbl SET sale_price = ?, quantity = ?,description = ?,product_name = ? WHERE product_id = ?',
            [data.sale_price, data.quantity, data.description, data.product_name, productId]
        );
        res.status(200).send(updateProducts[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduct = async(req, res, next) => {
    try{
        const data = req.body;
        console.log(data.cate_id);
        console.log(data.import_price);
        console.log(data.quantity);
        console.log(data.description);
        console.log(data.product_name);
        console.log(data.product_image);
        console.log(data.sale_price);
        const insertProducts = await mysql.execute('INSERT INTO myshopdb.ProductTbl (cate_id, import_price,quantity,description, product_name, product_image, sale_price) VALUES ( ?, ?,?,?,?,?,?)',
            [data.cate_id, data.import_price, data.quantity, data.description, data.product_name, data.product_image, data.sale_price] 
        );
        res.status(200).send(insertProducts[0]);
    }catch{
        console.log(res.status);
        res.status(400).send(error.message);
    }
}

const getOutOfStockProduct = async (req, res, next) => {
    try {
        const limit = req.params.limit
        console.log(limit);
        
        const products = await mysql.execute(`SELECT * FROM myshopdb.ProductTbl pt WHERE pt.quantity < ${limit} ORDER BY pt.quantity ASC LIMIT  ${limit} `)
        res.status(200).send(products[0]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBestSaleProduct = async (req, res, next) => {
    try {
        const limit = req.params.limit
        console.log(limit);
        
        const products = await mysql.execute(`SELECT oit.product_id, pt.product_name, pt.import_price, pt.description, pt.product_image, pt.sale_price ,
                                             SUM(oit.quantity) as total_sales  FROM myshopdb.OrderItemTbl oit
                                            JOIN myshopdb.ProductTbl pt ON oit.product_id = pt.product_id 
                                            GROUP BY product_id HAVING total_sales > 0 order by total_sales DESC  LIMIT ${limit}`)
                        
        res.status(200).send(products[0]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {getProducts, searchProducts, updateProducts, addProduct , getOutOfStockProduct, getBestSaleProduct}