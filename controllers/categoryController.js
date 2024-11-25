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

module.exports = { getAllCategories }