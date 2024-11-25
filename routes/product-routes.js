const express = require('express');
const {getProducts,searchProducts,updateProducts,addProduct, getOutOfStockProduct, getBestSaleProduct} = require('../controllers/productController');

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/cate/:cateId/pro/:proName", searchProducts);
router.get("/products/cate/:cateId/pro", searchProducts);
router.post("/products/:id", updateProducts);
router.post("/products", addProduct);
router.get("/products/outofstock/:limit", getOutOfStockProduct);
router.get("/products/bestsale/:limit", getBestSaleProduct);


module.exports = {routes: router};
