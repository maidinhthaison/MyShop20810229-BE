const mysql = require('../database/db');

const getAllCategories = async (req, res, next) => {
    try {
        const category = await mysql.execute(
            'SELECT * FROM myshopdb.CategoryTbl ct'
        );
        res.status(200).send(category[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const insertNewCategories = async (req, res, next) => {
    try{
        const data = req.body;
        console.log(data.cate_name);
        console.log(data.cate_des);
        const insertCate = await mysql.execute('INSERT INTO myshopdb.CategoryTbl (cate_name, cate_des) VALUES (?, ?)',
            [data.cate_name, data.cate_des] 
        );
        res.status(200).send(insertCate[0]);
    }catch{
        console.log(res.status);
        res.status(400).send(error.message);
    }
}


module.exports = { getAllCategories, insertNewCategories }