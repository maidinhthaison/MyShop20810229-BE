const express = require('express');
const {getAllCategories, insertNewCategories} = require('../controllers/categoryController');

const router = express.Router();

router.get("/category", getAllCategories);
router.post("/category", insertNewCategories);


module.exports = {routes: router};
