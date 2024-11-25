const express = require('express');
const {getAllCategories} = require('../controllers/categoryController');

const router = express.Router();

router.get("/category", getAllCategories);


module.exports = {routes: router};
