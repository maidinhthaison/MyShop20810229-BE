const express = require('express');
const {getProducts, searchProducts, updateProducts,
     addProduct , getOutOfStockProduct, getBestSaleProduct} = require('../controllers/productController');

const router = express.Router();

router.get("/products/:cateId?/:proName?/:limit/:offset", getProducts);
router.get("/products/cate/:cateId/pro/:proName/:limit/:offset", searchProducts);
router.get("/products/cate/:cateId/pro/:limit/:offset", searchProducts);
router.post("/products/:id", updateProducts);
router.post("/products", addProduct);
router.get("/products/outofstock/:limit", getOutOfStockProduct);
router.get("/products/bestsale/:limit", getBestSaleProduct);


module.exports = {routes: router};
